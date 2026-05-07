import Heading from "../../_components/heading"
import StrokeForm from "./_components/stroke-form"
const page = () => {
  return (
    <div>
      <div className=" space-y-2">
        <Heading textHeading='Stroke Risk Prediction' />
        <p className="text-muted-foreground  max-w-2/3 mx-auto text-center">
          Our advanced AI engine analyzes clinical parameters to assess the probability of diabetes.
          Please fill in the patient details below for a real-time assessment.
        </p>
      </div>

      <StrokeForm />
    </div>
  )
}

export default page
