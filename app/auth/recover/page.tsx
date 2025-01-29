import RecoverSteps from "./_components/RecoverSteps";

export const metadata = {
  title: "بازیابی رمز عبور",
};

function Page() {
  return (
    <div className="bg-stone-100 xsm:px-9 xsm:py-[70px]">
      <RecoverSteps />
    </div>
  );
}

export default Page;
