import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoaderPageProps {
  className?: string;
}

export const LoaderPage = ({ className }: LoaderPageProps) => {
  return (
    <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );
};
