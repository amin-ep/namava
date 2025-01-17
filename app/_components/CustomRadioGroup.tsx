"use client";

import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { Path, UseFormRegister } from "react-hook-form";
import { FieldValues } from "../_types/GlobalTypes";

function CustomRadioGroup<TFormValues extends FieldValues>({
  defaultChecked,
  name,
  options,
  register,
}: {
  defaultChecked?: string;
  name: Path<TFormValues>;
  options: string[];
  register: UseFormRegister<TFormValues>;
}) {
  return (
    <FormControl>
      <RadioGroup
        {...register(name)}
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
            control={<Radio sx={{}} />}
            label={item}
            sx={{
              display: "flex",
              alignItems: "center",
              ".css-1qirb4w-MuiFormControlLabel-root": {
                marginLeft: 0,
                marginRight: 0,
              },
              ".MuiFormControlLabel-root": {
                marginLeft: 0,
                marginRight: 0,
              },
              ".MuiFormControlLabel-labelPlacementEnd": {
                marginLeft: 0,
                marginRight: 0,
              },
            }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default CustomRadioGroup;
