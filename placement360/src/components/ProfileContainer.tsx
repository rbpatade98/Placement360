import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

const ProfileContainer = () => {
  return (
    <>
      <SignedOut>
        <div className="hidden sm:flex gap-2">
          <Link to="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
          <Link to="/signup">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </SignedOut>
      
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  )
}

export default ProfileContainer;