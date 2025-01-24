import { getMe } from "@/app/api/userApi";
import AccountMainHeading from "../_components/AccountMainHeading";
import Container from "../_components/Container";
import EditForm from "./_components/EditForm";

export const metadata = {
  title: "ویرایش اطلاعات شخصی",
};

async function page() {
  const user = await getMe();
  console.log("render");
  return (
    <div>
      <Container className="flex flex-col gap-4 md:gap-6 xl:gap-8">
        <div className="text-center">
          <AccountMainHeading>ویرایش اطلاعات شخصی</AccountMainHeading>
        </div>
        <EditForm user={user} />
      </Container>
    </div>
  );
}

export default page;
