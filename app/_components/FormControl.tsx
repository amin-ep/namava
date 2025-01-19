"use client";

import { HTMLInputTypeAttribute, useEffect, useReducer, useRef } from "react";
import { FieldValues } from "../_types/GlobalTypes";
import { Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import { HiEye, HiEyeSlash } from "react-icons/hi2";

const eyeButtonInitialState: { showPassword: boolean; showButton: boolean } = {
  showButton: false,
  showPassword: false,
};
type EyeButtonActionType =
  | { type: "showButton" }
  | { type: "hideButton" }
  | { type: "showPassword" }
  | { type: "hidePassword" };

const reducer = (
  state: { showPassword: boolean; showButton: boolean },
  action: EyeButtonActionType,
) => {
  switch (action.type) {
    case "showButton":
      return { ...state, showButton: true };

    case "hideButton":
      return { ...state, showButton: false };

    case "hidePassword":
      return { ...state, showPassword: false };

    case "showPassword":
      return { ...state, showPassword: true };
  }
};

export function FormControl<TFormValues extends FieldValues>({
  label,
  type,
  register,
  name,
  validation,
  textAlign = "left",
}: {
  label?: string;
  type: HTMLInputTypeAttribute;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  validation: RegisterOptions<TFormValues, Path<TFormValues>> | undefined;
  textAlign?: "right" | "left";
}) {
  const [{ showPassword, showButton }, dispatch] = useReducer(
    reducer,
    eyeButtonInitialState,
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const input = containerRef.current?.querySelector(`#${name}-input`);
    input?.addEventListener("focus", function () {
      if (
        containerRef &&
        containerRef?.current &&
        typeof containerRef !== null
      ) {
        containerRef.current.style.borderColor = "#1a1a1a";
      }
    });
    input?.addEventListener("blur", function () {
      if (
        containerRef &&
        containerRef?.current &&
        typeof containerRef !== null
      ) {
        containerRef.current.style.borderColor = "#d1d5db";
      }
    });
  }, [containerRef, name]);

  const passwordEyeButton = () => {
    return (
      <>
        {type === "password" && showButton && (
          <button
            type="button"
            onClick={() => {
              if (showPassword) {
                dispatch({
                  type: "hidePassword",
                });
              } else {
                dispatch({
                  type: "showPassword",
                });
              }
            }}
            className="absolute right-[14px] text-stone-500"
          >
            {showPassword ? <HiEyeSlash size={15} /> : <HiEye size={15} />}
          </button>
        )}
      </>
    );
  };

  const inputElement = () => {
    return (
      <>
        <input
          {...register(name as Path<TFormValues>, {
            ...validation,
            onChange(e) {
              if (textAlign === "right") {
                return;
              } else {
                if (e.target.value.length === 0) {
                  e.target.style.textAlign = "right";
                  e.target.style.direction = "rtl";
                } else {
                  e.target.style.textAlign = "left";
                  e.target.style.direction = "ltr";
                }
              }
              if (type === "password" && e.target.value.length > 0) {
                dispatch({
                  type: "showButton",
                });
              } else {
                dispatch({
                  type: "hideButton",
                });
              }
            },
          })}
          type={type === "password" ? (showPassword ? "text" : type) : type}
          placeholder={label}
          className="w-full pl-2 pr-4 text-xs placeholder:text-right xsm:text-sm"
          autoComplete="off"
          id={`${name}-input`}
        />
        {passwordEyeButton()}
      </>
    );
  };

  return (
    <>
      {type !== "hidden" ? (
        <div className="flex flex-col gap-2">
          {label && (
            <label className="text-right text-xs font-normal text-stone-950 md:text-sm">
              {label}
            </label>
          )}
          <div
            ref={containerRef}
            className="relative flex h-10 w-full items-center rounded-xl border border-stone-300 xsm:h-[52px]"
          >
            {inputElement()}
          </div>
        </div>
      ) : (
        inputElement()
      )}
    </>
  );
}
