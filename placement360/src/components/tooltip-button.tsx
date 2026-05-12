import React from "react";
import { Button, type buttonVariants } from "@/components/ui/Button";
import type { VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TooltipButtonProps {
  content: string;
  buttonVariant?: VariantProps<typeof buttonVariants>["variant"];
  onClick?: () => void;
  disbaled?: boolean;
  buttonClassName?: string;
  icon: React.ReactNode;
  loading: boolean;
}

export const TooltipButton = ({
  content,
  buttonVariant = "ghost",
  onClick,
  disbaled = false,
  buttonClassName,
  icon,
  loading,
}: TooltipButtonProps) => {
  return (
    <div className="relative group/tooltip inline-block">
      <Button
        variant={buttonVariant}
        size="icon"
        disabled={disbaled || loading}
        onClick={onClick}
        className={cn(buttonClassName)}
      >
        {loading ? <Loader2 className="animate-spin" /> : icon}
      </Button>
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-foreground text-background text-xs whitespace-nowrap opacity-0 pointer-events-none group-hover/tooltip:opacity-100 transition-opacity duration-200 z-50">
        {content}
      </span>
    </div>
  );
};
