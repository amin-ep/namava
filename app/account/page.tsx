import { LinkField } from "../_types/globalTypes";
import { getMe } from "../api/userApi";
import PersonalInfo from "./_components/PersonalInfo";
import UserInfo from "./_components/UserInfo";

export interface InfoField {
  label: string | boolean | Date | undefined;
  content?: string;
  link?: LinkField;
}

async function page() {
  const userInfo = await getMe();

  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <PersonalInfo info={userInfo} />
      <UserInfo info={userInfo} />
    </div>
  );
}

export default page;
