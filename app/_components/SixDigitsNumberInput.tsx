"use client";

import { ChangeEvent, useRef } from "react";
import { FieldValues, Path, PathValue, UseFormSetValue } from "react-hook-form";

function SixDigitsNumberInput<T extends FieldValues>({
  setValue,
}: {
  setValue: UseFormSetValue<T>;
}) {
  const ref = useRef<(HTMLInputElement | null)[]>([]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const sumValuesArr: string[] = [];
    ref.current.forEach((input) => {
      if (input && input.value.length > 0) {
        sumValuesArr.push(input.value);
        setValue(
          "verificationNumber" as Path<T>,
          sumValuesArr.join("") as PathValue<T, Path<T>>,
          {
            shouldValidate: true,
          }
        );
      }
    });
    if (e.target.value.length === 1 && index < ref.current.length - 1) {
      ref.current[index + 1]?.focus();
    }
  };

  const handleInputKeydown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      ref.current[index]!.value = "";
      if (index > 0) {
        ref.current[index - 1]?.focus();
      }
    }
  };
  return (
    <div className="grid grid-cols-6 gap-3" style={{ direction: "ltr" }}>
      {Array(6)
        .fill(null)
        .map((_el, index) => (
          <input
            key={index}
            className="text-center text-black outline-none border border-gray-300 w-full leading-6 h-[60px] rounded-xl"
            maxLength={1}
            minLength={1}
            type="text"
            // min={0}
            autoComplete="off"
            ref={(el) => {
              if (ref.current) ref.current[index] = el;
            }}
            onChange={(e) => {
              handleInputChange(e, index);
            }}
            onKeyDown={(e) => {
              handleInputKeydown(e, index);
            }}
          />
        ))}
    </div>
  );
}

export default SixDigitsNumberInput;
