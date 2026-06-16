/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import {
    Sparkles, Loader2, AlertCircle, RefreshCw, Send,
    User, Bot, Trash2, ChevronDown, Zap, Brain, Cpu
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'
import { PredictionResponse } from '@/lib/api-client'
import Markdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

// ── Model registry (mirrors route.ts) ────────────────────────────────────────

type ModelId =
    | 'qwen3-max'
    | 'qwen3.7-plus'
    | 'qwen3.5-122b-a10b'
    | 'gemini-2.0-flash'
    | 'gemini-3.5-flash'
    | 'gemini-3-flash-preview'
    | 'llama-3.1-8b-instant'
    | 'openai/gpt-oss-120b'
    | 'groq/compound'
      

interface ModelMeta {
    id: ModelId
    label: string
    provider: 'Qwen' | 'Gemini' | 'Groq'
    badge: string
    icon: React.ReactNode
}

const MODEL_GROUPS: { provider: string; icon: React.ReactNode; models: ModelMeta[] }[] = [
    {
        provider: 'Qwen',
        icon: <Zap className="w-3.5 h-3.5" />,
        models: [
            { id: 'qwen3-max',  label: 'qwen3-max',  provider: 'Qwen', badge: 'Balanced', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'qwen3.7-plus',   label: 'Qwen 3.7 Plus',   provider: 'Qwen', badge: 'Powerful', icon: <Zap className="w-3.5 h-3.5" /> },
            { id: 'qwen3.5-122b-a10b',   label: 'Qwen 3.5',   provider: 'Qwen', badge: 'Powerful', icon: <Zap className="w-3.5 h-3.5" /> },
        ],
    },
    {
        provider: 'Google',
        icon: <Brain className="w-3.5 h-3.5" />,
        models: [
            { id: 'gemini-3.5-flash', label: 'Gemini 3.5 Flash', provider: 'Gemini', badge: 'Fast', icon: <Brain className="w-3.5 h-3.5" /> },
            { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', provider: 'Gemini', badge: 'Fast', icon: <Brain className="w-3.5 h-3.5" /> },
             { id: 'gemini-3-flash-preview',   label: 'Gemini 3.0 Flash',   provider: 'Gemini', badge: 'Pro',  icon: <Brain className="w-3.5 h-3.5" /> },
        ],
    },
    {
        provider: 'Groq',
        icon: <Cpu className="w-3.5 h-3.5" />,
        models: [
            { id: 'llama-3.1-8b-instant', label: 'LLama 3.1 8B Instant', provider: 'Groq', badge: 'Smart', icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'openai/gpt-oss-120b',  label: 'OpenAI GPT 120B',  provider: 'Groq', badge: 'Fast',  icon: <Cpu className="w-3.5 h-3.5" /> },
            { id: 'groq/compound',  label: 'Groq Compound',  provider: 'Groq', badge: 'Fast',  icon: <Cpu className="w-3.5 h-3.5" /> },
        ],
    },
]

const ALL_MODELS = MODEL_GROUPS.flatMap((g) => g.models)

// ── Helper: extract text from AI SDK v5 UIMessage parts ──────────────────────

function getMessageText(message: { parts?: { type: string; text?: string }[]; content?: string }): string {
    if (message.parts && message.parts.length > 0) {
        return message.parts
            .filter((p) => p.type === 'text')
            .map((p) => p.text ?? '')
            .join('')
    }
    return (message as any).content ?? ''
}

// ── Main component ────────────────────────────────────────────────────────────

interface AIInsightCardProps {
    disease_type: string
    prediction: PredictionResponse | undefined
    input_data: any
}

const AIInsightCard = ({ disease_type, prediction, input_data }: AIInsightCardProps) => {
    const [inputValue, setInputValue] = useState('')
    const [selectedModelId, setSelectedModelId] = useState<ModelId>('qwen3-max')

    // Ref so sendMessage closures always read the latest selected model
    const selectedModelRef = useRef<ModelId>(selectedModelId)
    useEffect(() => { selectedModelRef.current = selectedModelId }, [selectedModelId])

    const selectedModel = ALL_MODELS.find((m) => m.id === selectedModelId)!

    const {
        messages,
        sendMessage,
        status,
        error,
        clearError,
        setMessages,
    } = useChat()

    const lastMessageRef = useRef<HTMLDivElement>(null)
    const isLoading = status === 'streaming' || status === 'submitted'

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages, isLoading])

    // ── Send helpers ──────────────────────────────────────────────────────────

    // modelId is passed as extra body — route.ts reads it from req.json()
    const sendWithModel = (text: string) =>
        sendMessage(
            { text },
            { body: { modelId: selectedModelRef.current } },
        )

    const handleGenerate = async () => {
        if (!prediction || !input_data) return
        setMessages([])
        clearError()

        const prompt = `
Disease Type: ${disease_type}
ML Prediction: ${prediction.prediction_label} (Probability: ${prediction.probability ? (prediction.probability * 100).toFixed(1) : 'N/A'}%)
Patient Data: ${JSON.stringify(input_data, null, 2)}

Based on the above ML prediction and clinical data, provide a comprehensive medical insight.
        `.trim()

        try {
            await sendWithModel(prompt)
        } catch {
            toast.error('Failed to generate AI insights')
        }
    }

    const handleFollowUp = async () => {
        const trimmed = inputValue.trim()
        if (!trimmed || isLoading) return
        setInputValue('')
        try {
            await sendWithModel(trimmed)
        } catch {
            toast.error('Failed to send message')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleFollowUp()
        }
    }

    const handleModelChange = (modelId: ModelId) => {
        if (modelId === selectedModelId) return
        setSelectedModelId(modelId)
        selectedModelRef.current = modelId

        if (messages.length > 0) {
            const name = ALL_MODELS.find((m) => m.id === modelId)?.label
            toast.info(`Switched to ${name}. Starting a fresh analysis.`)
            setMessages([])
            clearError()
        }
    }

    if (!prediction) return null

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <Card className="relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl transition-all duration-500 rounded-3xl mt-12 flex flex-col min-h-125 max-h-200  ">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Sparkles className="w-24 h-24 text-primary" />
            </div>

            {/* Header */}
            <CardHeader className="relative pb-4 border-b border-primary/10 shrink-0">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold tracking-tight uppercase leading-none">AI Clinical Assistant</CardTitle>
                            <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                                Powered by Pulse AI · {selectedModel.provider}
                            </CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <ModelSwitcher
                            selectedModel={selectedModel}
                            groups={MODEL_GROUPS}
                            disabled={isLoading}
                            onSelect={handleModelChange}
                        />

                        {messages.length > 0 && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => { setMessages([]); clearError() }}
                                className="rounded-full hover:bg-destructive/10 hover:text-destructive"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}

                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold uppercase tracking-widest text-[10px] py-1 px-3">
                            Insight Engine
                        </Badge>
                    </div>
                </div>
            </CardHeader>

            {/* Body */}
            <CardContent className="grow overflow-auto no-scrollbar p-0 relative flex flex-col">
                {/* Empty state */}
                {messages.length === 0 && !isLoading && !error && (
                    <div className="grow flex flex-col items-center justify-center text-center p-8 space-y-6">
                        <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center relative">
                            <Sparkles className="w-10 h-10 text-primary/40 animate-pulse" />
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full animate-ping opacity-20" />
                        </div>
                        <div className="space-y-2 max-w-sm">
                            <p className="text-lg font-bold text-foreground uppercase tracking-tight">Generate Clinical Analysis</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Get a detailed AI-powered breakdown of the ML prediction and clinical indicators for this patient.
                            </p>
                            <p className="text-xs text-muted-foreground/60">
                                Using <span className="font-semibold text-primary">{selectedModel.label}</span>
                            </p>
                        </div>
                        <Button
                            onClick={handleGenerate}
                            className="rounded-2xl px-10 py-7 group font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 hover:scale-105 transition-all bg-primary hover:bg-primary/90"
                            size="lg"
                        >
                            Start AI Analysis
                            <Sparkles className="ml-3 w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </Button>
                    </div>
                )}

                {/* Messages */}
                <ScrollArea className="grow p-6">
                    <div className="space-y-6 pb-4">
                        {messages.map((message, index) => {
                            const text = getMessageText(message as any)
                            const isInitialPrompt =
                                index === 0 &&
                                message.role === 'user' &&
                                text.includes('Disease Type:')

                            return (
                                <div
                                    key={message.id}
                                    className={cn(
                                        'flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
                                        message.role === 'user' ? ' flex-col items-end ' : 'flex-col'
                                    )}
                                    ref={index === messages.length - 1 ? lastMessageRef : null}
                                >
                                    <div className={cn(
                                        'w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-1 shadow-sm',
                                        message.role === 'user'
                                            ? 'bg-secondary text-secondary-foreground'
                                            : 'bg-primary text-primary-foreground'
                                    )}>
                                        {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>
                                    <div className={cn(
                                        'max-w-[95%] rounded-2xl p-4 shadow-sm border',
                                        message.role === 'user'
                                            ? 'bg-muted/50 border-border rounded-tr-none'
                                            : 'bg-background border-primary/10 rounded-tl-none'
                                    )}>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                                            {message.role === 'user'
                                                ? 'Patient Inquiry'
                                                : `Clinical Insight · ${selectedModel.label}`}
                                        </div>
                                        <div className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed font-medium">
                                            {isInitialPrompt ? (
                                                <p className="italic text-muted-foreground">
                                                    Analysis requested for {disease_type} based on clinical data.
                                                </p>
                                            ) : (
                                                <Markdown>{text}</Markdown>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        {/* Streaming skeleton */}
                        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                            <div className="flex gap-4 animate-pulse">
                                <div className="w-8 h-8 rounded-lg bg-primary/20 shrink-0 flex items-center justify-center mt-1">
                                    <Bot className="w-4 h-4 text-primary/40" />
                                </div>
                                <div className="max-w-[85%] rounded-2xl p-4 bg-background border border-primary/10 rounded-tl-none flex flex-col gap-2">
                                    <Skeleton className="h-4 w-48 bg-primary/5" />
                                    <Skeleton className="h-4 w-64 bg-primary/5" />
                                    <Skeleton className="h-4 w-56 bg-primary/5" />
                                </div>
                            </div>
                        )}

                        {/* Error */}
                        {error && (
                            <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-widest">Service Interruption</p>
                                    <p className="text-xs">Failed to reach the medical AI engine. Please check your connection.</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleGenerate}
                                        className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest border-destructive/20 hover:bg-destructive/10"
                                    >
                                        <RefreshCw className="mr-2 w-3 h-3" /> Retry Analysis
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Input bar */}
            </CardContent>
            <CardFooter className="flex items-center justify-between w-full">
                 {messages.length > 0 && (
                    <div className="p-4 border-t w-full  border-primary/10 bg-background/50 backdrop-blur-sm">
                        <div className="flex gap-2">
                            <Input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask a follow-up question..."
                                className="rounded-xl border-primary/10 focus-visible:ring-primary h-12 bg-background/80"
                                disabled={isLoading}
                            />
                            <Button
                                onClick={handleFollowUp}
                                disabled={isLoading || !inputValue.trim()}
                                className="rounded-xl w-12 h-12 p-0 shrink-0 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                            >
                                {isLoading
                                    ? <Loader2 className="w-5 h-5 animate-spin" />
                                    : <Send className="w-5 h-5" />}
                            </Button>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium">
                            AI-generated insights should be verified by a medical professional.
                        </p>
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}

// ── ModelSwitcher ─────────────────────────────────────────────────────────────

const PROVIDER_COLORS: Record<string, string> = {
    Qwen:   'text-orange-500',
    Gemini: 'text-blue-500',
    Groq: 'text-violet-500',
}

interface ModelSwitcherProps {
    selectedModel: ModelMeta
    groups: typeof MODEL_GROUPS
    disabled: boolean
    onSelect: (id: ModelId) => void
}

function ModelSwitcher({ selectedModel, groups, disabled, onSelect }: ModelSwitcherProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    disabled={disabled}
                    className="h-8 gap-1.5 rounded-xl border-primary/15 bg-background/60 hover:bg-primary/5 text-xs font-semibold pl-2.5 pr-2"
                >
                    <span className={cn('flex items-center gap-1', PROVIDER_COLORS[selectedModel.provider])}>
                        {selectedModel.icon}
                    </span>
                    <span className="hidden sm:inline max-w-22.5 truncate">{selectedModel.label}</span>
                    <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-52 rounded-2xl p-1.5 shadow-xl border-primary/10">
                <DropdownMenuLabel className="text-[10px] uppercase tracking-widest text-muted-foreground/60 px-2 py-1">
                    Select Model
                </DropdownMenuLabel>

                {groups.map((group, gi) => (
                    <React.Fragment key={group.provider}>
                        {gi > 0 && <DropdownMenuSeparator className="my-1 bg-primary/5" />}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className={cn(
                                'flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2 py-1',
                                PROVIDER_COLORS[group.models[0].provider]
                            )}>
                                {group.icon}
                                {group.provider}
                            </DropdownMenuLabel>

                            {group.models.map((model) => (
                                <DropdownMenuItem
                                    key={model.id}
                                    onClick={() => onSelect(model.id)}
                                    className={cn(
                                        'flex items-center justify-between rounded-xl px-2 py-2 text-xs font-medium cursor-pointer',
                                        model.id === selectedModel.id && 'bg-primary/10 text-primary'
                                    )}
                                >
                                    <span>{model.label}</span>
                                    <Badge
                                        variant="secondary"
                                        className="text-[9px] py-0 px-1.5 font-bold uppercase tracking-wide bg-muted/60 border-none"
                                    >
                                        {model.badge}
                                    </Badge>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuGroup>
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default AIInsightCard