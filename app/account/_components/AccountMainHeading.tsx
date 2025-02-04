function AccountMainHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-bold text-gray-800 xsm:text-sm xl:text-base">
      {children}
    </h3>
  );
}

export default AccountMainHeading;
