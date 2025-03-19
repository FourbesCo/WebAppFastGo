
import * as React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  as: Component = "div",
  ...props
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "w-full px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
