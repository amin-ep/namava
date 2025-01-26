"use client";

import CustomRadioGroup from "@/app/_components/CustomRadioGroup";
import FormControl from "@/app/_components/FormControl";
import FormSubmit from "@/app/_components/FormSubmit";
import { useSelect } from "@/app/_hooks/useSelect";
import { UpdateMePayload } from "@/app/_types/userTypes";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import Select from "../../../_components/Select";
import BirthDaySelectGroup from "./BirthDaySelectGroup";
import SelectLabel from "./SelectLabel";

function EditFormFields({
  user,
  isPending,
}: {
  user: Partial<UpdateMePayload>;
  isPending: boolean;
}) {
  // province select hook
  const {
    close: closeProvince,
    isOpen: provinceIsOpen,
    open: openProvince,
    updateValue: updateProvinceValue,
    value: provinceValue,
    clear: clearProvince,
  } = useSelect(user.province ?? "");

  const {
    register,
    setValue,
    formState: { isDirty, isValidating },
    getValues,
  } = useForm<UpdateMePayload>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: useMemo(() => {
      return {
        firstName: user.firstName ?? "",
        birthDate: user.birthDate ?? "",
        lastName: user.lastName ?? "",
        gender: user.gender ?? "",
      };
    }, [user.birthDate, user.firstName, user.gender, user.lastName]),
    resetOptions: {
      keepDefaultValues: true,
      keepValues: true,
    },
  });

  useEffect(() => {
    const values = getValues();
    const keys = Object.keys(values);
    if (isValidating) {
      for (let i = 0; i < keys.length; i++) {
        console.log(
          (values[keys[i]] as string).trim() ===
            (user[keys[i]] as string).trim(),
        );
      }
    }
  }, [isValidating]);

  return (
    <div className="flex flex-col gap-6">
      <FormControl
        textAlign="right"
        name="firstName"
        register={register}
        type="text"
        label="نام"
        validation={{
          required: false,
          minLength: 3,
          maxLength: 25,
        }}
      />
      <FormControl
        textAlign="right"
        name="lastName"
        register={register}
        type="text"
        label="نام خانوادگی"
        validation={{
          required: false,
          minLength: 4,
          maxLength: 25,
        }}
      />
      <div className="flex flex-col gap-2">
        <input
          type="hidden"
          {...register("province", {
            required: false,
          })}
        />
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
        defaultDate={user?.birthDate}
        name="birthDate"
        register={register}
        validation={{
          required: false,
        }}
      />
      {/* Radio Group */}
      <div className="flex flex-col gap-2">
        <SelectLabel label={{ optionalTitle: "اختیاری", title: "جنسیت" }} />
        <CustomRadioGroup
          validation={{
            required: false,
          }}
          name="gender"
          options={["مرد", "زن"]}
          defaultChecked={user?.gender}
          register={register}
        />
      </div>
      {/* Submit Button */}

      <FormSubmit
        label="ثبت تغییرات"
        pendingStatus={isPending}
        disabled={!isDirty}
      />
    </div>
  );
}

export default EditFormFields;
