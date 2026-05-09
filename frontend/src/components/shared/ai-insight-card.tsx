'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { Sparkles, Loader2, AlertCircle, RefreshCw, Send, User, Bot, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { PredictionResponse } from '@/lib/api-client'
import Markdown from 'react-markdown'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface AIInsightCardProps {
    disease_type: string
    prediction: PredictionResponse | undefined
    input_data: any
}

// Helper to extract plain text from AI SDK v5 UIMessage parts
function getMessageText(message: { parts?: { type: string; text?: string }[]; content?: string }): string {
    if (message.parts && message.parts.length > 0) {
        return message.parts
            .filter((p) => p.type === 'text')
            .map((p) => p.text ?? '')
            .join('')
    }
    // Fallback for legacy shape
    return (message as any).content ?? ''
}

const AIInsightCard = ({ disease_type, prediction, input_data }: AIInsightCardProps) => {
    // AI SDK v5: input is no longer managed by useChat — manage it locally
    const [inputValue, setInputValue] = useState('')

    const {
        messages,
        sendMessage,   // replaces append + handleSubmit
        status,        // 'submitted' | 'streaming' | 'ready' | 'error'
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

    // Kick off the initial AI analysis
    const handleGenerate = async () => {
        if (!prediction || !input_data) return

        setMessages([]) // Clear previous conversation
        clearError()

        const prompt = `
            Disease Type: ${disease_type}
            ML Prediction: ${prediction.prediction_label} (Probability: ${prediction.probability ? (prediction.probability * 100).toFixed(1) : 'N/A'}%)
            Patient Data: ${JSON.stringify(input_data, null, 2)}
            
            Based on the above ML prediction and clinical data, provide a comprehensive medical insight.
        `

        try {
            // AI SDK v5: sendMessage({ text }) instead of append({ role, content })
            await sendMessage({ text: prompt })
        } catch (err) {
            console.error('Error generating AI insight:', err)
            toast.error('Failed to generate AI insights')
        }
    }

    // Handle follow-up questions
    const handleFollowUp = async () => {
        const trimmed = inputValue.trim()
        if (!trimmed || isLoading) return

        setInputValue('')
        try {
            await sendMessage({ text: trimmed })
        } catch (err) {
            console.error('Error sending follow-up:', err)
            toast.error('Failed to send message')
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleFollowUp()
        }
    }

    if (!prediction) {
        return null
    }

    return (
        <Card className="relative overflow-hidden border-primary/20 bg-background/50 backdrop-blur-md shadow-2xl transition-all duration-500 rounded-3xl mt-12 flex flex-col min-h-125 max-h-175">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Sparkles className="w-24 h-24 text-primary" />
            </div>

            <CardHeader className="relative pb-4 border-b border-primary/10 shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div>
                            <CardTitle className="text-xl font-bold tracking-tight uppercase leading-none">AI Clinical Assistant</CardTitle>
                            <CardDescription className="text-xs font-medium text-muted-foreground mt-1">
                                Powered by Pulse AI & Qwen
                            </CardDescription>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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

            <CardContent className="grow overflow-hidden p-0 relative flex flex-col">
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

                <ScrollArea className="grow p-6">
                    <div className="space-y-6 pb-4">
                        {messages.map((message, index) => {
                            const text = getMessageText(message as any)
                            // Hide the raw initial prompt — show a friendly placeholder instead
                            const isInitialPrompt =
                                index === 0 &&
                                message.role === 'user' &&
                                text.includes('Disease Type:')

                            return (
                                <div
                                    key={message.id}
                                    className={cn(
                                        'flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
                                        message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
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
                                        'max-w-[85%] rounded-2xl p-4 shadow-sm border',
                                        message.role === 'user'
                                            ? 'bg-muted/50 border-border rounded-tr-none'
                                            : 'bg-background border-primary/10 rounded-tl-none'
                                    )}>
                                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2">
                                            {message.role === 'user' ? 'Patient Inquiry' : 'Clinical Insight'}
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

                        {/* Skeleton shown while waiting for the first assistant token */}
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

                        {error && (
                            <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 mt-0.5" />
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

                {messages.length > 0 && (
                    <div className="p-4 border-t border-primary/10 bg-background/50 backdrop-blur-sm">
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
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                ) : (
                                    <Send className="w-5 h-5" />
                                )}
                            </Button>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground mt-3 font-medium">
                            AI-generated insights should be verified by a medical professional.
                        </p>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AIInsightCard