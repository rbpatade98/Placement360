import { Menu } from "lucide-react";
import { Link } from "react-router";
import { SignedOut } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import LogoContainer from "@/components/LogoContainer";
import NavigationRoutes from "./NavigationRoutes";

const ToggleContainer = () => {
  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Access navigation links and authentication options.
        </SheetDescription>
        <div className="flex flex-col gap-8 mt-8 px-4 sm:px-6">
          <LogoContainer />
          <nav className="flex flex-col gap-4">
            <NavigationRoutes isMobile={true} />
          </nav>
          <SignedOut>
            <div className="flex flex-col gap-2 mt-4 border-t pt-4 sm:hidden">
              <Link to="/signin">
                <Button variant="ghost" className="w-full justify-start">Sign In</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full justify-start">Sign Up</Button>
              </Link>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ToggleContainer;
