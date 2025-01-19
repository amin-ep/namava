import LoginForm from "@/app/auth/login/_components/LoginForm";

export const metadata = {
  title: "ورود",
};

function Page() {
  return (
    <div className="bg-gray-100 xsm:px-9 xsm:py-[70px]">
      <LoginForm />
    </div>
  );
}

export default Page;
