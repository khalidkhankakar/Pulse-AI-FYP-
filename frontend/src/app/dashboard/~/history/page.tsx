import Heading from "../../_components/heading"
import HistoryTable from "./_components/history-table"
import { getPredictionHistory } from "../../_actions/history"

const HistoryPage = async () => {
  const history = await getPredictionHistory()

  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4 max-w-4xl mx-auto text-center">
        <Heading textHeading='Patient History' />
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Review and manage previous diagnostic records and AI analysis reports.
        </p>
      </div>

      {history.length === 0 ? (
        <div className="bg-card border border-border rounded-3xl p-12 text-center text-muted-foreground">
          No diagnostic records found.
        </div>
      ) : (
        <HistoryTable history={history} />
      )}
    </div>
  )
}

export default HistoryPage
