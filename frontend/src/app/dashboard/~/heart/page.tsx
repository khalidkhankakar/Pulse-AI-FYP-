import HeartFormResult from "./_components/heart-form-result"

const page = () => {
  return (
    <div>
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-foreground">Heart Risk Prediction</h1>
        <p className="text-muted-foreground font-medium max-w-2xl mx-auto">
          Our advanced AI engine analyzes clinical parameters to assess the probability of diabetes.
          Please fill in the patient details below for a real-time assessment.
        </p>
      </div>

      <HeartFormResult />
    </div>
  )
}

export default page
