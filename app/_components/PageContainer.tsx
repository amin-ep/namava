import cls from "classnames";

function PageContainer({
  children,
  extraStyles,
  topPadding = true,
}: {
  children: React.ReactNode;
  extraStyles?: string;
  topPadding?: boolean;
}) {
  return (
    <div
      className={cls(
        "pb-20 md:pb-10",
        extraStyles,
        topPadding ? "pt-[60px] md:pt-20" : "",
      )}
    >
      {children}
    </div>
  );
}

export default PageContainer;
