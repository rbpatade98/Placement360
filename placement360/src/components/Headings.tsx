import { cn } from "@/lib/utils";

interface HeadingsProps {
  title: string;
  description?: string;
  isSubHeading?: boolean;
  className?: string;
}

export const Headings = ({ title, description, isSubHeading, className }: HeadingsProps) => {
  return (
    <div className={cn("space-y-1", className)}>
      <h2 className={cn(
        "font-bold tracking-tight",
        isSubHeading ? "text-lg md:text-xl" : "text-xl md:text-2xl"
      )}>
        {title}
      </h2>
      {description && (
        <p className="text-[10px] md:text-xs text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};
