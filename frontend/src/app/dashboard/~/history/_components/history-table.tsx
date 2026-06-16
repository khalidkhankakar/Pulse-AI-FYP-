'use client'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface PredictionHistoryRecord {
  id: string
  diseaseType: string
  inputs: unknown
  prediction: string
  predictionLabel: string
  probability: number | null
  createdAt: Date
}

const HistoryTable = ({ history }: { history: PredictionHistoryRecord[] }) => {
  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/30 hover:bg-muted/30 border-b border-border">
              <TableHead className="py-5 font-bold text-foreground">Date</TableHead>
              <TableHead className="py-5 font-bold text-foreground">Disease Module</TableHead>
              <TableHead className="py-5 font-bold text-foreground">Risk Assessment</TableHead>
              <TableHead className="py-5 font-bold text-foreground">Confidence</TableHead>
              <TableHead className="py-5 font-bold text-foreground text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record) => (
              <TableRow key={record.id} className="border-b border-border/50 transition-colors hover:bg-muted/10">
                <TableCell className="py-4 whitespace-nowrap text-sm">
                  {format(record.createdAt, "PPP p")}
                </TableCell>
                <TableCell className="py-4">
                    <span className="font-semibold text-primary">{record.diseaseType}</span>
                </TableCell>
                <TableCell className="py-4">
                  <Badge 
                    variant={record.prediction === "1" ? "destructive" : "secondary"}
                    className="font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]"
                  >
                    {record.predictionLabel}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  {record.probability 
                    ? <span className="font-mono text-sm">{(record.probability * 100).toFixed(1)}%</span>
                    : <span className="text-muted-foreground italic">N/A</span>}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="rounded-xl hover:bg-primary hover:text-white transition-all border-border/50">
                        View Data
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl border-border rounded-3xl">
                      <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-primary">{record.diseaseType} Analysis</DialogTitle>
                        <DialogDescription className="text-muted-foreground italic">
                          Diagnostic data captured on {format(record.createdAt, "PPP p")}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="mt-4 grid grid-cols-2 gap-4">
                        {Object.entries(record.inputs as Record<string, string | number | boolean>).map(([key, value]) => (
                          <div key={key} className="flex flex-col p-3 bg-muted/20 rounded-2xl border border-border/30">
                            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">{key.replace(/_/g, ' ')}</span>
                            <span className="text-sm font-semibold text-foreground truncate">{String(value)}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-4 rounded-2xl bg-primary/5 border border-primary/20 flex justify-between items-center">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Risk Result</span>
                            <span className="text-lg font-bold text-primary">{record.predictionLabel}</span>
                        </div>
                        {record.probability && (
                             <div className="flex flex-col text-right">
                             <span className="text-[10px] uppercase tracking-widest text-primary/60 font-bold">Confidence</span>
                             <span className="text-lg font-bold text-primary">{(record.probability * 100).toFixed(1)}%</span>
                         </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}


export default HistoryTable
