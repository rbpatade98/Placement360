import { SignUp } from "@clerk/clerk-react";

const SignupPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SignUp routing="path" path="/signup" signInUrl="/signin" forceRedirectUrl="/" />
    </div>
  )
};

export default SignupPage;