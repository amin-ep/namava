import { LinkField } from "../_types/globalTypes";
import { User } from "../_types/userTypes";
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
      <PersonalInfo info={userInfo as User} />
      <UserInfo info={userInfo as User} />
    </div>
  );
}

export default page;
