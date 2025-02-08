import React from "react";

function BottomSheetModalHeading({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-center text-sm font-bold leading-6 text-white">
      {children}
    </h1>
  );
}

export default BottomSheetModalHeading;
