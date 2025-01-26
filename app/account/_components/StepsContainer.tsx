function StepsContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-dvh w-full items-start bg-white xsm:items-center xsm:bg-[unset]">
      <div className="mx-auto h-fit w-[500px] max-w-full">{children}</div>
    </div>
  );
}

export default StepsContainer;
