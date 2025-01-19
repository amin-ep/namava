import RegisterForm from "./_components/RegisterForm";

export const metadata = {
  title: "ثبت نام",
};

async function Page() {
  return (
    <div className="bg-stone-100 xsm:px-9 xsm:py-[70px]">
      <RegisterForm />
    </div>
  );
}

export default Page;
