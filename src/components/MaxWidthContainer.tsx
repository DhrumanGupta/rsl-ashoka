import React from "react";

function MaxWidthContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-[100ch] mx-auto">
      <div className="mx-16">{children}</div>
    </div>
  );
}

export default MaxWidthContainer;
