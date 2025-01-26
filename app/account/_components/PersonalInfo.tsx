import { User } from "@/app/_types/userTypes";
import { InfoField } from "../page";
import Container from "./Container";
import InfoHeader from "./InfoHeader";
import InfoList from "./InfoList";
import { numericJalaaliBirthDate } from "@/app/_utils/helpers";

const userLabels: { [key: string]: string } = {
  firstName: "نام",
  lastName: "نام خانوادگی",
  birthDate: "تاریخ تولد",
  gender: "جنسیت",
};

function PersonalInfo({ info }: { info: User }) {
  const infoArr: InfoField[] = Object.entries(userLabels)?.map(
    ([field, label]) => ({
      label,
      content: info[field as keyof User] ?? "-",
    }),
  );

  const userBirthDateIndex = infoArr?.findIndex(
    (el) => el.label === "تاریخ تولد",
  );

  let userBirthDate: string | Date = "";
  const userBirthDateValue: string = infoArr.at(userBirthDateIndex)
    ?.content as string;
  if (userBirthDateIndex > 0 && userBirthDateValue != "-") {
    const userGeorgianBirthDate = new Date(
      infoArr.at(userBirthDateIndex)?.content as string,
    );

    userBirthDate = numericJalaaliBirthDate(userGeorgianBirthDate);
  }

  if (userBirthDateValue !== "-") {
    infoArr.map((el) => {
      if (el.label === "تاریخ تولد") {
        if (el.content !== "-") {
          el.content = userBirthDate as string;
        }
      }
    });
  }

  return (
    <Container className="flex flex-col gap-4 md:gap-6 xl:gap-8">
      <InfoHeader
        heading="اطلاعات شخصی"
        link={{ title: "ویرایش اطلاعات", href: "account/edit" }}
      />
      <InfoList items={infoArr} />
    </Container>
  );
}

export default PersonalInfo;
