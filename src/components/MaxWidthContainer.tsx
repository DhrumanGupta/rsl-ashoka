import cn from "@/lib/cn";
import React from "react";

function MaxWidthContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("max-w-[100ch] mx-auto", className)}>
      <div className="mx-8 md:mx-16">{children}</div>
    </div>
  );
}

export default MaxWidthContainer;
