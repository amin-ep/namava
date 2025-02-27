"use client";

import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import CustomRadio from "../CustomRadio/CustomRadio";

function CustomRadioGroup<TFormValues extends FieldValues>({
  defaultChecked,
  name,
  options,
  validation,
  control,
}: {
  defaultChecked?: string;
  name: Path<TFormValues>;
  options: string[];
  validation?: RegisterOptions<TFormValues, Path<TFormValues>>;
  control: Control<TFormValues>;
}) {
  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      render={({ field }) => (
        <FormControl>
          <RadioGroup
            {...field}
            row
            onChange={(_event, value) => field.onChange(value)}
            value={field.value || defaultChecked || ""}
          >
            {options.map((item) => (
              <CustomRadio
                themeColor="dark"
                label={item}
                key={item}
                value={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}

export default CustomRadioGroup;
