import { OverviewCards } from './_components/overview-cards';
import { RiskPredicationCards } from './_components/risk-predication-cards';




const page = () => {
  return (
    <div className=' flex flex-col gap-4'>
      <OverviewCards />
      <RiskPredicationCards />
    </div>
  )
}

export default page
