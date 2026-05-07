import Heading from "../../_components/heading"
import LiverForm from "./_components/liver-form"
const page = () => {
  return (
    <div>
      <div className=" space-y-2">
        <Heading textHeading='Liver Risk Prediction' />
        <p className="text-muted-foreground  max-w-2/3 mx-auto text-center">
          Our advanced AI engine analyzes clinical parameters to assess the probability of diabetes.
          Please fill in the patient details below for a real-time assessment.
        </p>
      </div>

      <LiverForm />
    </div>
  )
}

export default page
