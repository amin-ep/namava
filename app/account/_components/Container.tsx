import { ReactNode } from "react";
import cls from "classnames";

function Container({
  children,
  className,
  hasPadding = true,
}: {
  children: ReactNode;
  className?: string;
  hasPadding?: boolean;
}) {
  return (
    <div
      className={cls(
        "md:max-w mx-auto w-full bg-white xsm:rounded-xl xsm:shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] md:max-w-[600px]",
        className,
        hasPadding && "px-5 pb-4 pt-5 md:py-6 xl:p-8",
      )}
    >
      {children}
    </div>
  );
}

export default Container;
