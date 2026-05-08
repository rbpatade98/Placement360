import { useAuth } from "@clerk/clerk-react";
import LogoContainer from "@/components/LogoContainer";
import NavigationRoutes from "../NavigationRoutes";
import ProfileContainer from "@/components/ProfileContainer";
import ToggleContainer from "@/components/ToggleContainer";

const Header = () => {
  const { isLoaded } = useAuth();

  if(!isLoaded) {
    return (
      <div className="flex items-center justify-center h-16">
        <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className='w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50'>
      <header className="container mx-auto flex items-center justify-between h-16 px-4">
        
        {/* LOGO SECTION */}
        <LogoContainer />

        {/* DESKTOP NAVIGATION SECTION */}
        <nav className="hidden md:flex gap-6 items-center">
          <NavigationRoutes />
        </nav>

        {/* PROFILE SECTION & MOBILE MENU */}
        <div className="flex gap-4 items-center">
          <ProfileContainer />
          <ToggleContainer />
        </div>
        
      </header>
    </div>
  )
}

export default Header