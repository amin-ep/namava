import { User } from "@/app/_types/UserTypes";
import Container from "./Container";
import InfoHeader from "./InfoHeader";
import InfoList from "./InfoList";
import { LinkField } from "@/app/_types/GlobalTypes";
import { InfoField } from "../page";

const labels: Partial<User> = {
  phoneNumber: "شماره موبایل",
  email: "ایمیل",
  password: "رمز عبور",
};

const links: LinkField[] = [
  {
    title: "تغییر شماره موبایل",
    href: "edit-phone",
  },
  {
    title: "تغییر ایمیل",
    href: "edit-email",
  },
  {
    title: "تغییر رمز عبور",
    href: "change-password",
  },
];

function UserInfo({ info }: { info: User }) {
  const userInfoArr: InfoField[] = Object.entries(labels)
    ?.map(([field, label]) => ({
      label,
      content: info[field] ?? "-",
    }))
    .map((el, index) => ({
      ...el,
      link: (links as LinkField)[index as number],
    }));

  return (
    <Container className="flex flex-col gap-4 md:gap-6 xl:gap-8">
      <InfoHeader heading="اطلاعات کاربری" />
      <InfoList items={userInfoArr} />
    </Container>
  );
}

export default UserInfo;
