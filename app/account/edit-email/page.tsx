import { Metadata } from "next";
import EditEmailSteps from "./_components/EditEmailSteps";
import { EditEmailProvider } from "@/app/_contexts/EditEmailContext";

export const metadata: Metadata = {
  title: "تغییر ایمیل",
};

function Page() {
  return (
    <EditEmailProvider>
      <EditEmailSteps />
    </EditEmailProvider>
  );
}

export default Page;
