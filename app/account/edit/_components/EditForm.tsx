import { getMe } from "@/app/api/userApi";
import AccountMainHeading from "../../_components/AccountMainHeading";
import Container from "../../_components/Container";
import EditFormFields from "./EditFormFields";
import { updateMe } from "../../actions";

async function EditForm() {
  const user = await getMe();

  return (
    <Container className="flex flex-col gap-4 md:gap-6 xl:gap-8">
      <div className="text-center">
        <AccountMainHeading>ویرایش اطلاعات شخصی</AccountMainHeading>
      </div>
      <form action={updateMe} className="md:px-1 xl:px-[68px]">
        <EditFormFields user={user} />
      </form>
    </Container>
  );
}

export default EditForm;
