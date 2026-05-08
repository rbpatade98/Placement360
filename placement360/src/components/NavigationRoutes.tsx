import { NavLink } from "react-router";
import { cn } from "@/lib/utils";
import { MainRoutes } from "@/lib/helpers";
import { SignedIn } from "@clerk/clerk-react";

interface NavigationRoutesProps {
    isMobile?: boolean;
}

const NavigationRoutes = ({ isMobile = false}: NavigationRoutesProps) => {
  return (
    <ul className={cn("flex items-center gap-6", isMobile && "flex-col items-start gap-4")}>
      {MainRoutes.map((route) => (
        <li key={route.href}>
          <NavLink 
            to={route.href} 
            className={({isActive}) => cn(
              "text-sm font-medium transition-colors hover:text-primary", 
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            {route.Label}
          </NavLink>
        </li>
      ))}
      {/* Your custom "Take an Interview" route - Only visible to authenticated users */}
      <SignedIn>
        <li key="generate">
          <NavLink 
            to="/generate" 
            className={({isActive}) => cn(
              "text-sm font-medium transition-colors hover:text-primary", 
              isActive ? "text-primary" : "text-muted-foreground"
            )}
          >
            Take an Interview
          </NavLink>
        </li>   
      </SignedIn>
    </ul>
  );
}

export default NavigationRoutes;