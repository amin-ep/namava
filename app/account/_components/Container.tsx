import { ReactNode } from "react";
import cls from "classnames";

function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cls(
        "md:max-w mx-auto w-full bg-white px-6 pb-4 pt-5 xsm:rounded-xl xsm:shadow-[0_8px_32px_0_rgba(0,0,0,0.08)] md:max-w-[600px] md:py-6 xl:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Container;
