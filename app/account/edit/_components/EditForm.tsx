"use client";

import CustomRadioGroup from "@/app/_components/CustomRadioGroup/CustomRadioGroup";
import FormControl from "@/app/_components/FormControl";
import FormSubmit from "@/app/_components/FormSubmit";
import { useSelect } from "@/app/_hooks/useSelect";
import { useToast } from "@/app/_hooks/useToast";
import { UpdateMePayload, User } from "@/app/_types/userTypes";
import { provincesArr } from "@/app/_utils/constants";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Controller, ControllerRenderProps, useForm } from "react-hook-form";
import Select from "../../../_components/Select/Select";
import { updateMe } from "../actions";
import BirthDaySelectGroup from "./BirthDaySelectGroup";
import SelectLabel from "./SelectLabel";

function EditForm({ user }: { user: User }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const notify = useToast();

  const {
    register,
    formState: { isValid },
    handleSubmit,
    control,
  } = useForm<UpdateMePayload>({
    reValidateMode: "onChange",
    mode: "onChange",
    defaultValues: {
      firstName: user.firstName ?? "",
      birthDate: user.birthDate ?? "",
      lastName: user.lastName ?? "",
      gender: user.gender ?? "",
    },
  });

  // province useSelect
  const {
    close: closeProvince,
    isOpen: provinceIsOpen,
    updateValue: updateProvinceValue,
    value: provinceValue,
    clear: clearProvince,
    toggle: toggleProvince,
  } = useSelect(user?.province ?? "");

  // Click Province Item
  const handleClickProvinceItem = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    field: ControllerRenderProps,
  ) => {
    const target = e.target as HTMLLIElement;
    updateProvinceValue(target.textContent!);
    field.onChange(target.textContent!);
    closeProvince();
  };

  // Clear Province Select
  const handleClearProvince = (field: ControllerRenderProps) => {
    clearProvince();
    field.onChange("");
  };

  // Submit form
  const onSubmit = (data: UpdateMePayload) => {
    startTransition(async () => {
      for (const [key, value] of Object.entries(data)) {
        if (
          !(value.trim().length > 0) ||
          (value.trim().length > 0 && value === user[key])
        ) {
          delete data[key];
        }
      }
      console.log(data);
      const result = await updateMe(data);

      if (result?.status === "success") {
        notify("success", result?.message as string);
        router.push("/account");
      } else {
        notify("error", result?.message as string);
      }
    });
  };

  const firstNameMsg =
    "تعداد کاراکترهای نام باید حداقل ۲، حداکثر ۱۵ و فاقد عدد و علامت باشد.";

  const lastNameMsg =
    "تعداد کاراکترهای نام خانوادگی باید حداقل ۲، حداکثر ۱۵ و فاقد عدد و علامت باشد.";

  return (
    <form className="md:px-1 xl:px-[68px]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <FormControl
          textAlign="right"
          name="firstName"
          register={register}
          type="text"
          label="نام"
          validation={{
            required: false,
            minLength: {
              value: 2,
              message: firstNameMsg,
            },
            maxLength: {
              value: 15,
              message: firstNameMsg,
            },
            validate: (val: string) => {
              // ! DISABLE SYMBOLS & NUMBERS
              if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(val)) {
                return firstNameMsg;
              }
              return true;
            },
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
            minLength: {
              value: 2,
              message: lastNameMsg,
            },
            maxLength: {
              value: 15,
              message: lastNameMsg,
            },
            validate: (val: string) => {
              // ! DISABLE SYMBOLS & NUMBERS
              if (!/^[a-zA-Z\u0600-\u06FF\s]+$/.test(val)) {
                return lastNameMsg;
              }
              return true;
            },
          }}
        />
        <div className="flex flex-col gap-2">
          {/* Province Select */}

          <Controller
            control={control}
            rules={{ required: false, minLength: 2, maxLength: 25 }}
            name="province"
            defaultValue={user?.province || ""}
            render={({ field }) => (
              <>
                <SelectLabel
                  onClick={() => {
                    handleClearProvince(field);
                  }}
                  label={{ title: "استان", optionalTitle: "اختیاری" }}
                />
                <Select
                  items={provincesArr.sort()}
                  placeholder="نام استان خود را وارد کنید"
                  isOpen={provinceIsOpen}
                  onOpen={toggleProvince}
                  value={provinceValue}
                  close={closeProvince}
                  onClick={(e) => {
                    handleClickProvinceItem(
                      e as React.MouseEvent<HTMLLIElement, MouseEvent>,
                      field,
                    );
                  }}
                />
              </>
            )}
          ></Controller>
        </div>

        {/* BIRTHDAY Select group */}
        <BirthDaySelectGroup
          control={control}
          validation={{ required: false, minLength: 1 }}
          defaultDate={user?.birthDate}
          name="birthDate"
        />
        {/* GENDER Radio Group */}
        <div className="flex flex-col gap-2">
          <SelectLabel label={{ optionalTitle: "اختیاری", title: "جنسیت" }} />
          <CustomRadioGroup
            validation={{
              required: false,
            }}
            name="gender"
            options={["مرد", "زن"]}
            control={control}
          />
        </div>
        {/* Submit Button */}
        <FormSubmit
          label="ثبت تغییرات"
          pendingStatus={isPending}
          disabled={!isValid}
        />
      </div>
    </form>
  );
}

export default EditForm;

// TODO: validate form if anything does not changed
