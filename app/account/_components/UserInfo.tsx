import { User } from "@/app/_types/userTypes";
import Container from "./Container";
import InfoHeader from "./InfoHeader";
import InfoList from "./InfoList";
import { LinkField } from "@/app/_types/globalTypes";
import { InfoField } from "../page";

const labels: Partial<User> = {
  phoneNumber: "شماره موبایل",
  email: "ایمیل",
  password: "رمز عبور",
};

const links: LinkField[] = [
  {
    title: "تغییر شماره موبایل",
    href: "/account/edit-phone",
  },
  {
    title: "تغییر ایمیل",
    href: "/account/edit-email",
  },
  {
    title: "تغییر رمز عبور",
    href: "/account/change-password",
  },
];

function UserInfo({ info }: { info: User }) {
  const userInfoArr: InfoField[] = Object.entries(labels)
    ?.map(([field, label]) => ({
      label,
      content: info[field as keyof User] ?? "-",
    }))
    .map((el, index) => ({
      ...el,
      link: links[index],
    }));

  return (
    <Container className="flex flex-col gap-4 md:gap-6 xl:gap-8">
      <InfoHeader heading="اطلاعات کاربری" />
      <InfoList items={userInfoArr} />
    </Container>
  );
}

export default UserInfo;
