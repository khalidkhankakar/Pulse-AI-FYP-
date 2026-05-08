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
            <Card className="relative overflow-hidden border-border/50 shadow-lg bg-card/50 backdrop-blur-sm rounded-3xl">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                    <BrainCircuit className="w-24 h-24" />
                </div>
                
                <CardHeader className="relative">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                        <BrainCircuit className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold tracking-tight uppercase">AI Model Insights</CardTitle>
                    <CardDescription className="text-sm font-medium leading-relaxed mt-2 text-muted-foreground">
                        Our model uses a Gradient Boosted Decision Tree trained on clinical records.
                        It evaluates complex interactions between clinical indicators.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative space-y-6">
                    <div className="space-y-4 pt-6 border-t border-border/50">
                        <div className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 border border-emerald-500/10 transition-colors group-hover:bg-emerald-500/20">
                                <ShieldCheck className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">94.2% Accuracy Rate</span>
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 border border-blue-500/10 transition-colors group-hover:bg-blue-500/20">
                                <Zap className="w-5 h-5" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Real-time Processing</span>
                        </div>
                    </div>

                    <div className="bg-primary/5 rounded-2xl p-4 mt-2 border border-primary/10">
                        <p className="text-[10px] text-center font-bold uppercase tracking-widest text-primary">
                            Complete the form for analysis
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
            "relative overflow-hidden border-2 transition-all duration-500 shadow-xl rounded-3xl",
            isPositive ? "border-destructive/20 bg-destructive/5" : "border-emerald-500/20 bg-emerald-500/5"
        )}>
            {/* Background Decorative Icon */}
            <BrainCircuit className={cn(
                "absolute -right-8 -top-8 w-32 h-32 opacity-5 rotate-12 transition-transform duration-700",
                isPositive ? "text-destructive" : "text-emerald-500"
            )} />

            <CardHeader className="relative pb-2">
                <div className="flex items-center justify-between">
                    <div className={cn(
                        "p-3 rounded-2xl shadow-sm",
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
                
                <div className="mt-8 space-y-2">
                    <CardTitle className="text-3xl font-bold tracking-tight uppercase">
                        {isPositive ? "Risk Detected" : "Low Risk"}
                    </CardTitle>
                    <CardDescription className={cn(
                        "text-lg font-bold uppercase tracking-tight",
                        isPositive ? "text-destructive/80" : "text-emerald-600/80"
                    )}>
                        {predication_label}
                    </CardDescription>
                </div>
            </CardHeader>

            <CardContent className="relative space-y-8 pt-6">
                {displayProbability !== null && (
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div className="space-y-1">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Confidence Score</span>
                                <div className="text-3xl font-bold tracking-tight">
                                    {displayProbability.toFixed(1)}%
                                </div>
                            </div>
                            <div className={cn(
                                "text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest border",
                                isPositive ? "bg-destructive/10 text-destructive border-destructive/20" : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                            )}>
                                {displayProbability > 90 ? "High Reliability" : "Standard Reliability"}
                            </div>
                        </div>
                        <Progress 
                            value={displayProbability} 
                            className="h-2.5 bg-muted rounded-full"
                            indicatorClassName={isPositive ? "bg-destructive" : "bg-emerald-500"}
                        />
                    </div>
                )}

                <div className="pt-6 border-t border-border/50">
                    <div className="flex items-start gap-3 p-5 rounded-2xl bg-background/50 border border-border/50 shadow-sm backdrop-blur-sm">
                        <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                        <div className="space-y-1.5">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/80">Medical Disclaimer</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                This AI-generated insight is for clinical decision support and does not constitute a final diagnosis. 
                                Please consult with a professional.
                            </p>
                        </div>
                    </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-all duration-200 py-2 group">
                    View Detailed Report <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </button>
            </CardContent>
        </Card>
    )
}

export default PredicationCard
