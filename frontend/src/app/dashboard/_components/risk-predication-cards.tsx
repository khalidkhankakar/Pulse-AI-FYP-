const predictions = [
  {
    type: "Diabetes",
    risk: 68,
    status: "High",
    color: "rose",
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
    color: "emerald",
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
    color: "amber",
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
    color: "emerald",
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
    <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">AI Disease Risk Predictions</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {predictions.map((item, idx) => {
            const colorMap = {
              rose: "text-rose-500 bg-rose-500/10",
              emerald: "text-emerald-500 bg-emerald-500/10",
              amber: "text-amber-500 bg-amber-500/10",
            };

            const progressColor = {
              rose: "from-rose-400 to-rose-600",
              emerald: "from-emerald-400 to-emerald-600",
              amber: "from-amber-400 to-amber-600",
            };

            return (
              <div
                key={idx}
                className="bg-card border border-border p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-lg font-bold">{item.type}</h4>

                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest mt-2 ${colorMap[item.color]}`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current" />
                      {item.status} Risk
                    </div>
                  </div>

                
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      style={{ width: `${item.risk}%` }}
                      className={`h-full bg-gradient-to-r ${progressColor[item.color]!} transition-all duration-700`}
                    />
                  </div>
                </div>

                {/* Model Metrics */}
                <div className="space-y-2 text-xs text-muted-foreground mb-6">
                  <div className="flex justify-between">
                    <span>Model Accuracy</span>
                    <span className="font-semibold text-foreground">
                      {item.modelAccuracy}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Precision</span>
                    <span>{item.precision}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recall</span>
                    <span>{item.recall}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Confidence</span>
                    <span>{item.confidence}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Model Version</span>
                    <span>{item.modelVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dataset</span>
                    <span>{item.datasetSize}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between text-[10px] text-muted-foreground ">
                  <span>Last Trained: {item.lastTrained}</span>
                  <span>{item.timestamp}</span>
                </div>
                
              </div>
            );
          })}
        </div>
      </div>
  )
}

