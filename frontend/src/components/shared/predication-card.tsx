import { BrainCircuit } from 'lucide-react'

const PredicationCard = () => {
    return (
        <div
            className="bg-card border border-border p-8 rounded-[2.5rem] shadow-sm space-y-6"
        >
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                <BrainCircuit className="w-6 h-6" />
            </div>
            <div className="space-y-2">
                <h4 className="text-lg font-black tracking-tight">AI Model Insights</h4>
                <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    Our model uses a Gradient Boosted Decision Tree trained on over 100,000 clinical records.
                    It evaluates complex interactions between glucose, insulin, and genetic factors.
                </p>
            </div>
            <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">94.2% Accuracy Rate</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Real-time Processing</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="text-[10px] font-black uppercase tracking-widest">HIPAA Compliant</span>
                </div>
            </div>
        </div>
    )
}

export default PredicationCard
