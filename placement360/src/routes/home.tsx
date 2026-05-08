import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-24 text-center px-4">
      <h1 className="text-5xl font-extrabold tracking-tight lg:text-6xl text-primary mb-6">Placement360</h1>
      <p className="max-w-[600px] text-xl text-muted-foreground mb-8">
        Your comprehensive platform for tracking, preparing, and succeeding in your career journey.
      </p>
      
      <SignedOut>
        <div className="flex gap-4 justify-center">
          <Link to="/signin">
            <Button size="lg" className="font-semibold">Get Started</Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" variant="outline" className="font-semibold">Create Account</Button>
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="flex flex-col items-center gap-4 bg-card p-8 rounded-xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
          <p className="text-muted-foreground">You are successfully signed in via Google.</p>
          <Button size="lg" className="mt-4">Go to Dashboard</Button>
        </div>
      </SignedIn>
    </div>
  )
}

export default Home;
