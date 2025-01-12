import { User } from "@/app/_types/UserTypes";
import { InfoField } from "../page";
import Container from "./Container";
import InfoHeader from "./InfoHeader";
import InfoList from "./InfoList";

const userLabels: Partial<User> = {
  firstName: "نام",
  lastName: "نام خانوادگی",
  birthDate: "تاریخ تولد",
  gender: "جنسیت",
};

function PersonalInfo({ info }: { info: User }) {
  const infoArr: InfoField[] = Object.entries(userLabels)?.map(
    ([field, label]) => ({
      label,
      content: info[field] ?? "-",
    }),
  );

  return (
    <Container className="flex flex-col gap-4 md:gap-6 xl:gap-8">
      <InfoHeader
        heading="اطلاعات شخصی"
        link={{ title: "ویرایش اطلاعات", href: "edit" }}
      />
      <InfoList items={infoArr} />
    </Container>
  );
}

export default PersonalInfo;
