import { CTA } from "./_components/cta";
import DashboardSection from "./_components/dashboard-section";
import { DiseaseModelsShowcase } from "./_components/disease-model";
import { FacilitySection } from "./_components/facility-section";
import { Hero } from "./_components/hero";
import { Specialists } from "./_components/specialist";
import Stats from "./_components/stats";
import { Testimonials } from "./_components/testimonials";


function page(){
  return (
    <main >
      <Hero />
      <DashboardSection />
      <Stats />
      <FacilitySection />
      <DiseaseModelsShowcase />
      <Testimonials />
      <Specialists />
      <CTA />
    </main>

  )
}


export default page;