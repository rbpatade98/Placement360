import React from "react";
import { Button, type buttonVariants } from "@/components/ui/Button";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipButtonProps {
  content: string;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  onClick?: () => void;
  disabled?: boolean;
  buttonClassName?: string;
  icon: React.ReactNode;
  loading?: boolean;
}

export const TooltipButton = ({
  content,
  buttonVariant = "ghost",
  onClick,
  disabled = false,
  buttonClassName,
  icon,
  loading = false,
}: TooltipButtonProps) => {
  return (
    <div className="relative group/tooltip inline-block">
      <Button
        variant={buttonVariant}
        size="icon"
        disabled={disabled || loading}
        onClick={onClick}
        className={cn(buttonClassName)}
      >
        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : icon}
      </Button>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs font-medium whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 z-50 shadow-sm">
        {content}
      </span>
    </div>
  );
};
