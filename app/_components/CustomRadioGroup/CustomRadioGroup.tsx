"use client";

import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FieldValues } from "../../_types/globalTypes";
import styles from "./CustomRadioGroup.module.css";

function CustomRadioGroup<TFormValues extends FieldValues>({
  defaultChecked,
  name,
  options,
  register,
  validation,
}: {
  defaultChecked?: string;
  name: Path<TFormValues>;
  options: string[];
  register: UseFormRegister<TFormValues>;
  validation: RegisterOptions<TFormValues, Path<TFormValues>> | undefined;
}) {
  return (
    <FormControl>
      <RadioGroup
        {...register(name, { ...validation })}
        {...(defaultChecked && { defaultValue: defaultChecked })}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          padding: 0,
        }}
      >
        {options.map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={
              <Radio
                classes={{
                  root: styles["radio-root"],
                  checked: styles["radio-checked"],
                  colorPrimary: styles["radio-color-primary"],
                }}
                size="small"
              />
            }
            label={item}
            classes={{
              root: styles["form-control-root"],
              label: styles["form-control-label"],
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioGroup;
