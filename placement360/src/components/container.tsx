import { cn } from "@/lib/utils";
import React from "react";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
    return (
        <div className={cn("container mx-auto px-4 md:px-8", className)}>
            {children}
        </div>
    );
};
