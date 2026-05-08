'use client'

import React from 'react'
import { useChat } from '@ai-sdk/react'
import { Sparkles, Loader2, AlertCircle, RefreshCw,  } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'
import { PredictionResponse } from '@/lib/api-client'
import Markdown from 'react-markdown'
import { cn } from '@/lib/utils'
// import MyMarkdown from './markdown'

interface AIInsightCardProps {
    disease_type: string
    prediction: PredictionResponse | undefined
    input_data: any
}

const AIInsightCard = ({ disease_type, prediction, input_data }: AIInsightCardProps) => {
    const [copied, setCopied] = React.useState(false)

    const { messages, status, sendMessage, error, setMessages } = useChat()



    const isLoading = status === 'streaming'

    const handleGenerate = async () => {
        if (!prediction || !input_data) return

        setMessages([]) // Clear previous conversation

        const prompt = `
            Disease Type: ${disease_type}
            ML Prediction: ${prediction.prediction_label} (Probability: ${prediction.probability ? (prediction.probability * 100).toFixed(1) : 'N/A'}%)
            Patient Data: ${JSON.stringify(input_data, null, 2)}
            
            Based on the above ML prediction and clinical data, provide a comprehensive medical insight.
        `

        try {
            await sendMessage({

                text: prompt,
            })
        } catch (err) {
            console.error('Error generating AI insight:', err)
            toast.error('Failed to generate AI insights')
        }
    }

    const handleCopy = () => {
        // if (insight) {
            navigator.clipboard.writeText('insight')
            setCopied(true)
            toast.success('Insight copied to clipboard')
            setTimeout(() => setCopied(false), 2000)
        // }
    }

    if (!prediction) {
        return null
    }

    return (
        <Card className="relative overflow-hidden border-primary/20 bg-primary/5 shadow-lg transition-all duration-500 rounded-3xl mt-12">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Sparkles className="w-16 h-16" />
            </div>

            <CardHeader className="relative pb-6 border-b border-primary/10">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/20">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <CardTitle className="text-xl font-bold tracking-tight uppercase leading-none">AI Clinical Insight</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none font-bold uppercase tracking-widest text-[10px] py-1 px-3">
                        Enterprise AI
                    </Badge>
                </div>
                <CardDescription className="text-sm font-medium text-muted-foreground mt-3 leading-relaxed">
                    Generate an LLM-powered analysis based on clinical health indicators and ML prediction results.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6 pt-8">
                { !isLoading && !error && messages.length === 0 && (
                    <div className="py-12 flex flex-col items-center justify-center text-center space-y-6 bg-background/40 rounded-2xl border border-primary/5 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <Sparkles className="w-8 h-8 text-primary/40 animate-pulse" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm font-bold text-foreground uppercase tracking-tight">Ready for Analysis</p>
                            <p className="text-xs text-muted-foreground max-w-[280px] mx-auto leading-relaxed">
                                Click below to generate a detailed AI analysis of the current results and health patterns.
                            </p>
                        </div>
                        <Button
                            onClick={handleGenerate}
                            className="rounded-xl px-8 py-6 group font-bold uppercase tracking-widest text-[11px] shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                            size="lg"
                        >
                            Generate Clinical Insight
                            <Sparkles className="ml-2 w-4 h-4 group-hover:animate-pulse" />
                        </Button>
                    </div>
                )}

                {isLoading && (
                    <div className="space-y-6 py-4 px-2">
                        <div className="flex items-center gap-3 text-primary mb-6">
                            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                                <Loader2 className="w-4 h-4 animate-spin" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest">AI Engine Processing Patterns...</span>
                        </div>
                        <div className="space-y-3">
                            <Skeleton className="h-4 w-full rounded-full bg-primary/5" />
                            <Skeleton className="h-4 w-[92%] rounded-full bg-primary/5" />
                            <Skeleton className="h-4 w-[96%] rounded-full bg-primary/5" />
                            <Skeleton className="h-4 w-[88%] rounded-full bg-primary/5" />
                        </div>
                    </div>
                )}

                {error && (
                    <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 text-destructive space-y-4 shadow-sm">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-5 h-5" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Analysis Generation Failed</span>
                        </div>
                        <p className="text-xs font-medium leading-relaxed">Failed to connect to the medical AI service. This could be due to network congestion or API limits.</p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleGenerate}
                            className="rounded-lg text-[10px] font-bold uppercase tracking-widest border-destructive/20 hover:bg-destructive/10"
                        >
                            <RefreshCw className="mr-2 w-3.5 h-3.5" /> Re-attempt Generation
                        </Button>
                    </div>
                )}

                {messages.length > 0 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        {messages.map(message => (
                            <div key={message.id} className={cn(
                                "p-6 rounded-2xl border transition-all",
                                message.role === 'user' 
                                    ? "bg-muted/50 border-border ml-12" 
                                    : "bg-background border-primary/10 shadow-sm shadow-primary/5"
                            )}>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className={cn(
                                        "w-6 h-6 rounded-md flex items-center justify-center",
                                        message.role === 'user' ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                                    )}>
                                        <Sparkles className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                        {message.role === 'user' ? 'Clinical Data Input' : 'AI Professional Insight'}
                                    </span>
                                </div>
                                <div className="prose prose-sm dark:prose-invert max-w-none text-foreground leading-relaxed font-medium">
                                    {message.parts.map((part, index) =>
                                        part.type === 'text' ? <Markdown key={index}>{part.text}</Markdown> : null,
                                    )}
                                </div>
                            </div>
                        ))}
                        
                        <div className="flex justify-center pt-4">
                            <Button
                                variant="outline"
                                onClick={handleGenerate}
                                className="rounded-xl px-6 font-bold uppercase tracking-widest text-[10px] border-primary/10 hover:bg-primary/5 text-primary"
                            >
                                <RefreshCw className="mr-2 w-3.5 h-3.5" /> Regenerate Analysis
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default AIInsightCard
