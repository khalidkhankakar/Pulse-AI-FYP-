import Heading from "../../_components/heading"
import StrokeForm from "./_components/stroke-form"
const page = () => {
  return (
    <div className="flex flex-col gap-10">
      <div className="space-y-4 max-w-4xl mx-auto text-center">
        <Heading textHeading='Stroke Risk Prediction' />
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          Our advanced AI engine analyzes clinical parameters to assess the probability of stroke.
          Please fill in the patient details below for a real-time assessment.
        </p>
      </div>

      <StrokeForm />
    </div>
  )
}

export default page
