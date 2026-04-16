import Heading from "../../_components/heading"
import HeartFormResult from "./_components/heart-form-result"

const page = () => {
  return (
    <div>
      <div className=" space-y-2">
        <Heading textHeading='Heart Risk Prediction' />
        
        <p className="text-muted-foreground font-medium text-center">
          Our advanced AI engine analyzes clinical parameters to assess the probability of diabetes.
          Please fill in the patient details below for a real-time assessment.
        </p>
      </div>

      <HeartFormResult />
    </div>
  )
}

export default page
