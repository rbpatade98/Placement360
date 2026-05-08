import { SignIn } from "@clerk/clerk-react";

const SigninPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <SignIn routing="path" path="/signin" signUpUrl="/signup" afterSignInUrl="/" fallbackRedirectUrl="/" />
    </div>
  )
};

export default SigninPage;