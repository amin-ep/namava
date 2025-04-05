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
  name,
  options,
  validation,
  control,
}: {
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
            row
            onChange={(event) => field.onChange(event.target.value)}
            value={field.value ?? ""}
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
    />
  );
}

export default CustomRadioGroup;
