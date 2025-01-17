import { User } from "@/app/_types/UserTypes";
import { InfoField } from "../page";
import Container from "./Container";
import InfoHeader from "./InfoHeader";
import InfoList from "./InfoList";
import jalaali from "jalaali-js";

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
      content: info[field] ?? "-",
    }),
  );

  const userBirthDateIndex = infoArr?.findIndex(
    (el) => el.label === "تاریخ تولد",
  );

  let userBirthDate: string | Date = "";
  if (userBirthDateIndex > 0) {
    const userGeorgianBirthDate = new Date(
      infoArr.at(userBirthDateIndex)?.content as string,
    );
    const birthYear = userGeorgianBirthDate.getFullYear();
    const birthMonth = userGeorgianBirthDate.getMonth();
    const birthDate = userGeorgianBirthDate.getDate();
    const jalaaliBirthDateObject = jalaali.toJalaali(
      birthYear,
      birthMonth + 1,
      birthDate,
    );
    userBirthDate = `${jalaaliBirthDateObject.jy}/${jalaaliBirthDateObject.jm}/${jalaaliBirthDateObject.jd}`;
  }

  if (userBirthDate !== "") {
    infoArr.map((el) => {
      if (el.label === "تاریخ تولد") {
        el.content = userBirthDate as string;
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
