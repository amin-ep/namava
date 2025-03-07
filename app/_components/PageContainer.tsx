import cls from "classnames";

function PageContainer({
  children,
  extraStyles,
}: {
  children: React.ReactNode;
  extraStyles?: string;
}) {
  return (
    <div className={cls("pt-[60px] md:pt-20", extraStyles)}>{children}</div>
  );
}

export default PageContainer;
