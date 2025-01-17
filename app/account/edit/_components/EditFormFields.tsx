"use client";

import { FormControl } from "@/app/_components/FormControl";
import { useSelect } from "@/app/_hooks/useSelect";
import { UpdateMePayload, User } from "@/app/_types/UserTypes";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "../../../_components/Select";
import BirthDaySelectGroup from "./BirthDaySelectGroup";
import EditFormSubmit from "./EditFormSubmit";
import SelectLabel from "./SelectLabel";
import CustomRadioGroup from "@/app/_components/CustomRadioGroup";

function EditFormFields({ user }: { user: User }) {
  // province select hook
  const {
    close: closeProvince,
    isOpen: provinceIsOpen,
    open: openProvince,
    updateValue: updateProvinceValue,
    value: provinceValue,
    clear: clearProvince,
  } = useSelect(user.province ?? "");

  const { register, reset, getValues, setValue } = useForm<UpdateMePayload>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      firstName: user?.firstName ?? "",
      birthDate: user?.birthDate ?? "",
      lastName: user?.lastName ?? "",
      gender: user?.gender ?? "",
      province: provinceValue ?? "",
    });
  }, [reset, user, provinceValue]);

  return (
    <div className="flex flex-col gap-6">
      <FormControl
        name="firstName"
        register={register}
        type="text"
        label="نام"
        validation={{ required: false }}
      />
      <FormControl
        name="lastName"
        register={register}
        type="text"
        label="نام خانوادگی"
        validation={{ required: false }}
      />
      <div className="flex flex-col gap-2">
        <input type="hidden" {...register("province")} />
        {/* Province Select */}
        <SelectLabel
          onClick={() => clearProvince()}
          label={{ title: "استان", optionalTitle: "اختیاری" }}
        />
        <Select
          items={[
            "تهران",
            "قم",
            "اصفهان",
            "همدان",
            "زنجان",
            "آذربایجان شرقی",
            "آذربایجان غربی",
            "اردبیل",
            "قزوین",
          ].sort()}
          placeholder="نام استان خود را وارد کنید"
          isOpen={provinceIsOpen}
          onOpen={openProvince}
          updateValue={updateProvinceValue}
          value={provinceValue}
          close={closeProvince}
        />
      </div>
      {/* BirthDay Select group */}
      <BirthDaySelectGroup
        setValue={setValue}
        defaultDate={getValues()?.birthDate}
        name="birthDate"
        register={register}
      />
      {/* Radio Group */}
      <SelectLabel label={{ optionalTitle: "اختیاری", title: "جنسیت" }} />
      <CustomRadioGroup
        name="gender"
        options={["مرد", "زن"]}
        defaultChecked={user?.gender}
        register={register}
      />
      {/* Submit Button */}
      <EditFormSubmit>ثبت تغییرات</EditFormSubmit>
    </div>
  );
}

export default EditFormFields;
