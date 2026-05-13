import { OverviewCards } from './_components/overview-cards';
import { RiskPredicationCards } from './_components/risk-predication-cards';
import { MLModelPerformance } from './_components/ml-model-performance';

const page = () => {
  return (
    <div className='flex flex-col gap-12'>
      <OverviewCards />
      <MLModelPerformance />
      <RiskPredicationCards />
    </div>
  )
}

export default page
