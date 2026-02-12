import { CTA } from "./_components/cta";
import { FacilitySection } from "./_components/facility-section";
import { Hero } from "./_components/hero";
import { Specialists } from "./_components/specialist";
import { Testimonials } from "./_components/testimonials";
import { TopDoctors } from "./_components/top-doctors";

function page(){
  return (
    <main >
      <Hero />
      <FacilitySection />
      <TopDoctors />
      <Testimonials />
      <Specialists />
      <CTA />
    </main>

  )
}


export default page;