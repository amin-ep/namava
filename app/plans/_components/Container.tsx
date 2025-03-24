type Props = { children: React.ReactNode };

export default function Container({ children }: Props) {
  return (
    <div className="mx-auto w-80 pt-5 xsm:w-[452px] xsm:pb-[60px] md:w-[680px] md:pt-8 xl:pb-20">
      {children}
    </div>
  );
}
