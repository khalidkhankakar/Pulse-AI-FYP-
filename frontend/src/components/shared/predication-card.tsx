import { BrainCircuit, AlertTriangle, CheckCircle2, Info, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface PredicationCardProps {
    predication?: number | boolean
    predication_label?: string
    probability?: number
}

const PredicationCard = ({ predication, predication_label, probability }: PredicationCardProps) => {
    // Idle state when no prediction is available
    if (predication === undefined || predication_label === undefined) {
        return (
            <Card className="relative overflow-hidden border-border/50 shadow-xl shadow-primary/5 bg-card/50 backdrop-blur-sm">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                    <BrainCircuit className="w-24 h-24" />
                </div>
                
                <CardHeader className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">AI Model Insights</CardTitle>
                    <CardDescription className="text-sm font-medium leading-relaxed mt-2">
                        Our model uses a Gradient Boosted Decision Tree trained on over 100,000 clinical records.
                        It evaluates complex interactions between clinical indicators and genetic factors.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-4">
                    <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">94.2% Accuracy Rate</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600">
                                <Zap className="w-4 h-4" />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">Real-time Processing</span>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-2xl p-4 mt-4 border border-primary/10">
                        <p className="text-xs text-center font-medium text-primary">
                            Complete the form to generate your AI-powered assessment.
                        </p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    const isPositive = predication === 1 || 
                       predication === true || 
                       predication_label.toLowerCase().includes('positive') || 
                       predication_label.toLowerCase().includes('risk') ||
                       predication_label.toLowerCase().includes('high');
    
    const displayProbability = probability !== undefined 
        ? (probability <= 1 ? probability * 100 : probability) 
        : null;

    return (
        <Card className={cn(
            "relative overflow-hidden border-2 transition-all duration-500 shadow-2xl",
            isPositive ? "border-destructive/20 bg-destructive/5 shadow-destructive/5" : "border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-500/5 shadow-emerald-500/5"
        )}>
            {/* Background Decorative Icon */}
            <BrainCircuit className={cn(
                "absolute -right-8 -top-8 w-32 h-32 opacity-5 rotate-12 transition-transform duration-700",
                isPositive ? "text-destructive" : "text-emerald-500"
            )} />

            <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between">
                    <div className={cn(
                        "p-2.5 rounded-xl shadow-sm",
                        isPositive ? "bg-destructive text-destructive-foreground" : "bg-emerald-500 text-white"
                    )}>
                        {isPositive ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                    </div>
                    <Badge 
                        variant="outline" 
                        className={cn(
                            "font-bold uppercase tracking-widest text-[10px] py-1 px-3",
                            isPositive ? "border-destructive/30 text-destructive bg-destructive/10" : "border-emerald-500/30 text-emerald-600 bg-emerald-500/10"
                        )}
                    >
                        AI Analysis Complete
                    </Badge>
                </div>
                
                <div className="mt-6 space-y-1">
                    <CardTitle className="text-3xl font-black tracking-tight flex items-center gap-2">
                        {isPositive ? "Risk Detected" : "Low Risk"}
                    </CardTitle>
                    <CardDescription className="text-lg font-semibold text-foreground/80">
                        {predication_label}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="relative space-y-6 pt-4">
                {displayProbability !== null && (
                    <div className="space-y-3">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Confidence Score</span>
                                <div className="text-2xl font-black tracking-tighter">
                                    {displayProbability.toFixed(1)}%
                                </div>
                            </div>
                            <div className={cn(
                                "text-xs font-bold px-2 py-1 rounded-md",
                                isPositive ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-600"
                            )}>
                                {displayProbability > 90 ? "High Reliability" : "Standard Reliability"}
                            </div>
                        </div>
                        <Progress 
                            value={displayProbability} 
                            className="h-3 bg-muted"
                            indicatorClassName={isPositive ? "bg-destructive" : "bg-emerald-500"}
                        />
                    </div>
                )}

                <div className="pt-4 border-t border-border/50">
                    <div className="flex items-start gap-3 p-4 rounded-2xl bg-background/50 border border-border/50 shadow-sm backdrop-blur-sm">
                        <Info className="w-5 h-5 text-muted-foreground shrink-0" />
                        <div className="space-y-1">
                            <p className="text-xs font-bold uppercase tracking-tight text-foreground/80">Medical Disclaimer</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed">
                                This AI-generated insight is for clinical decision support and does not constitute a final diagnosis. 
                                Please consult with a healthcare professional for a comprehensive evaluation.
                            </p>
                        </div>
                    </div>
                </div>

                <button className="w-full mt-2 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors py-2 group">
                    View Detailed Report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </CardContent>
        </Card>
    )
}

export default PredicationCard
