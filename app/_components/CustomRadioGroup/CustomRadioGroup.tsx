"use client";

import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import styles from "./CustomRadioGroup.module.css";
import { Controller } from "react-hook-form";

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
      )}
    ></Controller>
  );
}

export default CustomRadioGroup;
