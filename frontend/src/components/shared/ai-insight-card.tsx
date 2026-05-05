'use client'

import React from 'react'
import { useChat } from '@ai-sdk/react'
import { Sparkles, Loader2, AlertCircle, RefreshCw, Copy, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import { PredictionResponse } from '@/lib/api-client'

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
        <Card className="relative overflow-hidden border-primary/20 bg-primary/5 shadow-xl shadow-primary/5 transition-all duration-500">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Sparkles className="w-16 h-16" />
            </div>

            <CardHeader className="relative pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <CardTitle className="text-lg font-bold">AI Clinical Insight</CardTitle>
                    </div>
                    <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-none">
                        Beta
                    </Badge>
                </div>
                <CardDescription className="text-xs">
                    Generate an LLM-powered analysis based on your health indicators and ML prediction.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                { !isLoading && !error && (
                    <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center">
                            <Sparkles className="w-6 h-6 text-primary/40" />
                        </div>
                        <p className="text-sm text-muted-foreground max-w-[240px]">
                            Click below to generate a detailed AI analysis of your results.
                        </p>
                        <Button
                            onClick={handleGenerate}
                            className="rounded-full px-6 group"
                            size="sm"
                        >
                            Generate Analysis
                            <Sparkles className="ml-2 w-4 h-4 group-hover:animate-pulse" />
                        </Button>
                    </div>
                )}

                {isLoading && (
                    <div className="space-y-3 py-2">
                        <div className="flex items-center gap-2 text-primary animate-pulse mb-4">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-xs font-bold uppercase tracking-wider">AI is analyzing...</span>
                        </div>
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-[90%]" />
                        <Skeleton className="h-4 w-[95%]" />
                        <Skeleton className="h-4 w-[85%]" />
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive space-y-3">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Error Generating Insight</span>
                        </div>
                        <p className="text-xs opacity-80 leading-relaxed">Failed to connect to AI service. Please try again.</p>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleGenerate}
                            className="h-8 text-xs hover:bg-destructive/20"
                        >
                            <RefreshCw className="mr-2 w-3 h-3" /> Try Again
                        </Button>
                    </div>
                )}
                {messages.map(message => (
                    <div key={message.id}>
                        {message.role === 'user' ? 'User: ' : 'AI: '}
                        {message.parts.map((part, index) =>
                            part.type === 'text' ? <span key={index}>{part.text}</span> : null,
                        )}
                    </div>
                ))}

        
            </CardContent>

        </Card>
    )
}

export default AIInsightCard
