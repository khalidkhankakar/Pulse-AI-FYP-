'use client'
import { cn } from "@/lib/utils";

const predictions = [
  {
    type: "Diabetes",
    risk: 68,
    status: "High",
    color: "destructive",
    confidence: 94.2,
    precision: 91.3,
    recall: 88.6,
    modelAccuracy: 92.8,
    modelVersion: "v1.2",
    datasetSize: "768 Patients",
    lastTrained: "12 Jan 2026",
    timestamp: "2 hours ago",
  },
  {
    type: "Heart Disease",
    risk: 24,
    status: "Low",
    color: "primary",
    confidence: 91.8,
    precision: 89.5,
    recall: 90.2,
    modelAccuracy: 93.4,
    modelVersion: "v2.0",
    datasetSize: "1025 Patients",
    lastTrained: "05 Jan 2026",
    timestamp: "2 hours ago",
  },
  {
    type: "Stroke",
    risk: 42,
    status: "Medium",
    color: "chart-4",
    confidence: 89.5,
    precision: 86.1,
    recall: 84.7,
    modelAccuracy: 90.2,
    modelVersion: "v1.5",
    datasetSize: "5110 Patients",
    lastTrained: "02 Jan 2026",
    timestamp: "5 hours ago",
  },
  {
    type: "Liver Disease",
    risk: 15,
    status: "Low",
    color: "chart-2",
    confidence: 92.1,
    precision: 90.4,
    recall: 87.9,
    modelAccuracy: 91.6,
    modelVersion: "v1.1",
    datasetSize: "583 Patients",
    lastTrained: "10 Jan 2026",
    timestamp: "1 day ago",
  },
];

export const RiskPredicationCards = () => {
  return (
    <div className="flex flex-col gap-6 mt-12">
        <h2 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-1">
          Model Intelligence Grid
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {predictions.map((item, idx) => {
            const colorClass = 
              item.color === 'destructive' ? 'text-destructive bg-destructive/5 border-destructive/10' :
              item.color === 'primary' ? 'text-primary bg-primary/5 border-primary/10' :
              item.color === 'chart-2' ? 'text-chart-2 bg-chart-2/5 border-chart-2/10' :
              'text-chart-4 bg-chart-4/5 border-chart-4/10';

            const progressClass = 
              item.color === 'destructive' ? 'bg-destructive' :
              item.color === 'primary' ? 'bg-primary' :
              item.color === 'chart-2' ? 'bg-chart-2' :
              'bg-chart-4';

            return (
              <div
                key={idx}
                className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm hover:ring-1 hover:ring-primary/20 transition-all hover:shadow-lg group"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold tracking-tight text-foreground uppercase">{item.type}</h4>
                    <div className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                      colorClass
                    )}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {item.status} Risk Level
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-3 py-1 rounded-lg border border-border/50">
                    {item.modelVersion}
                  </div>
                </div>

                {/* Progress Bar Section */}
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Risk Assessment</span>
                    <span className="text-xl font-bold text-foreground tracking-tight">{item.risk}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                    <div
                      style={{ width: `${item.risk}%` }}
                      className={cn("h-full transition-all duration-1000 ease-out shadow-sm", progressClass)}
                    />
                  </div>
                </div>

                {/* Model Metrics Grid */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-5 mb-8 border-y border-border/50 py-8">
                  <Metric label="Accuracy" value={`${item.modelAccuracy}%`} />
                  <Metric label="Confidence" value={`${item.confidence}%`} />
                  <Metric label="Precision" value={`${item.precision}%`} />
                  <Metric label="Recall" value={`${item.recall}%`} />
                </div>

                {/* Footer Info */}
                <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest pt-2 opacity-80">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    Trained: {item.lastTrained}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    {item.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  )
}

const Metric = ({ label, value }: { label: string, value: string }) => (
  <div className="flex justify-between items-center group/metric transition-colors">
    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover/metric:text-primary">{label}</span>
    <span className="text-xs font-bold text-foreground tracking-tight">{value}</span>
  </div>
);

