'use client'
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertCircle } from "lucide-react";

const modelStats = [
  {
    type: "Diabetes",
    color: "chart-1",
    mlModel: "Random Forest",
    modelAccuracy: 94.2,
    precision: 92.8,
    recall: 93.5,
    f1Score: 93.1,
    rocAuc: 96.2,
    modelVersion: "v1.2",
    datasetSize: "768 Patients",
    lastTrained: "12 Jan 2026",
    predictions: "2,450",
    status: "Healthy",
  },
  {
    type: "Heart Disease",
    color: "chart-2",
    mlModel: "XGBoost",
    modelAccuracy: 89.5,
    precision: 87.9,
    recall: 88.2,
    f1Score: 88.0,
    rocAuc: 92.8,
    modelVersion: "v2.0",
    datasetSize: "1025 Patients",
    lastTrained: "05 Jan 2026",
    predictions: "1,890",
    status: "Healthy",
  },
  {
    type: "Stroke",
    color: "chart-3",
    mlModel: "Gradient Boosting",
    modelAccuracy: 91.3,
    precision: 90.1,
    recall: 89.8,
    f1Score: 89.9,
    rocAuc: 94.5,
    modelVersion: "v1.5",
    datasetSize: "5110 Patients",
    lastTrained: "02 Jan 2026",
    predictions: "3,120",
    status: "Healthy",
  },
  {
    type: "Liver Disease",
    color: "chart-4",
    mlModel: "Neural Network (MLP)",
    modelAccuracy: 88.7,
    precision: 86.4,
    recall: 87.2,
    f1Score: 86.8,
    rocAuc: 91.3,
    modelVersion: "v1.1",
    datasetSize: "583 Patients",
    lastTrained: "10 Jan 2026",
    predictions: "1,560",
    status: "Healthy",
  },
];

export const RiskPredicationCards = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 mt-8 md:mt-12">
      <h2 className="text-[9px] sm:text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
        Model Statistics Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
        {modelStats.map((model, idx) => {
          const colorVar = `var(--color-${model.color})`;
          
          return (
            <div
              key={idx}
              className="bg-card border border-border p-4 sm:p-5 md:p-6 lg:p-8 rounded-3xl shadow-sm hover:ring-1 hover:ring-primary/20 transition-all hover:shadow-lg group"
            >
              {/* Header */}
              <div className="flex justify-between items-start gap-3 md:gap-4 mb-6 md:mb-8">
                <div className="space-y-2 flex-1">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-foreground uppercase">
                    {model.type}
                  </h4>
                  <div className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest border border-green-500/20 bg-green-500/5 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {model.status}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest bg-muted/50 px-2 sm:px-3 py-1 rounded-lg border border-border/50 whitespace-nowrap">
                    {model.modelVersion}
                  </div>
                  <div className="text-[8px] sm:text-[9px] md:text-[10px] font-bold uppercase tracking-widest bg-primary/10 px-2 sm:px-3 py-1 rounded-lg border border-primary/20 text-primary whitespace-nowrap">
                    {model.mlModel}
                  </div>
                </div>
              </div>

              {/* Main Accuracy Display */}
              <div className="mb-6 md:mb-8 p-3 sm:p-4 md:p-5 bg-muted/30 rounded-2xl border border-border/50">
                <div className="flex justify-between items-end gap-3 mb-3 md:mb-4">
                  <span className="text-[8px] sm:text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Overall Accuracy</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight">{model.modelAccuracy}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden border border-border/50">
                  <div
                    style={{ width: `${model.modelAccuracy}%` }}
                    className="h-full transition-all duration-1000 ease-out shadow-sm"
                    style={{ backgroundColor: colorVar }}
                  />
                </div>
              </div>

              {/* Performance Metrics Grid */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-4 md:gap-y-5 mb-6 md:mb-8 border-y border-border/50 py-6 md:py-8">
                <Metric label="Precision" value={`${model.precision}%`} />
                <Metric label="Recall" value={`${model.recall}%`} />
                <Metric label="F1-Score" value={`${model.f1Score}%`} />
                <Metric label="ROC-AUC" value={`${model.rocAuc}%`} />
              </div>

              {/* Dataset & Training Info */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 mb-6 md:mb-8 p-3 sm:p-4 md:p-5 bg-muted/20 rounded-xl border border-border/50">
                <InfoBox label="Dataset Size" value={model.datasetSize} />
                <InfoBox label="Predictions" value={model.predictions} />
                <InfoBox label="Last Trained" value={model.lastTrained} />
                <InfoBox label="Model Version" value={model.modelVersion} />
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between text-[8px] sm:text-[9px] md:text-[10px] font-bold text-muted-foreground uppercase tracking-widest pt-2 gap-2 opacity-80">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  Active
                </div>
                <div className="text-[8px] sm:text-[9px] md:text-[10px] text-muted-foreground text-right">
                  Updated {model.lastTrained}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center group/metric transition-colors">
    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest group-hover/metric:text-primary">
      {label}
    </span>
    <span className="text-xs font-bold text-foreground tracking-tight">{value}</span>
  </div>
);

const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col gap-1">
    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{label}</span>
    <span className="text-xs font-bold text-foreground">{value}</span>
  </div>
);

