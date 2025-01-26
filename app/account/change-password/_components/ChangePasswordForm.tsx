"use client";

import FormLayout from "@/app/_components/FormLayout";
import { useActionState, useEffect, useReducer, useState } from "react";
import { MdLockReset } from "react-icons/md";
import { changePassword } from "../actions";
import { useForm } from "react-hook-form";
import ChangePasswordSuccess from "./ChangePasswordSuccess";
import Image from "next/image";
import { ChangePasswordPayload } from "@/app/_types/userTypes";
import { useToast } from "@/app/_hooks/useToast";

interface State {
  passwordIsLarge: null | boolean;
  passwordIsShort: null | boolean;
}

type Action =
  | { type: "large" }
  | { type: "short" }
  | { type: "notShort" }
  | { type: "notLarge" };

const initialState: State = {
  passwordIsLarge: null,
  passwordIsShort: null,
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "large":
      return { ...state, passwordIsLarge: true };

    case "short":
      return { ...state, passwordIsShort: true };

    case "notShort":
      return { ...state, passwordIsShort: false };

    case "notLarge":
      return { ...state, passwordIsLarge: false };

    default:
      throw new Error("unknown action type");
  }
};

function ChangePasswordForm() {
  const [finished, setIsFinished] = useState(false);
  const [{ passwordIsLarge, passwordIsShort }, dispatch] = useReducer(
    reducer,
    initialState,
  );
  const [response, formAction, isPending] = useActionState(
    changePassword,
    null,
  );

  const notify = useToast();

  const {
    register,
    formState: { isValid, isValidating },
    getFieldState,
    getValues,
  } = useForm<ChangePasswordPayload>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (response) {
      if (response?.status === "success") {
        // setIsFinished(true);
        console.log("success");
      } else {
        notify(response.status, response.message);
      }
    }
  }, [response, notify]);

  useEffect(() => {
    if (isValidating) {
      const password = getValues()?.password;
      const passwordIsDirty = getFieldState("password").isDirty;
      if (password) {
        if (passwordIsDirty && password.length < 8) {
          dispatch({ type: "short" });
        } else if (password.length >= 8) {
          dispatch({ type: "notShort" });
        }

        if (password.length > 14) {
          dispatch({ type: "large" });
        } else if (password.length <= 14) {
          dispatch({ type: "notLarge" });
        }
      }
    }
  }, [getFieldState, getValues, isValidating]);

  return (
    <>
      {!finished ? (
        <div className="my-10">
          <FormLayout
            action={formAction}
            description="لطفا رمز عبور جدید خود را تعیین کنید."
            heading="تغییر رمز عبور"
            icon={<MdLockReset size={35} className="text-primary" />}
          >
            <FormLayout.Control
              name="currentPassword"
              register={register}
              validation={{ required: true, minLength: 8, maxLength: 14 }}
              label="رمز عبور فعلی"
              textAlign="left"
              type="password"
            />
            <FormLayout.Control
              name="password"
              register={register}
              validation={{ required: true, minLength: 8, maxLength: 14 }}
              label="رمز عبور جدید"
              textAlign="left"
              type="password"
            />
            <div className="flex flex-col items-start justify-center gap-2 text-sm text-stone-700">
              <p>رمز عبور باید دارای شرایط زیر باشد:</p>
              <ul className="flex flex-col gap-2">
                <li className="flex items-center gap-3">
                  <Image
                    src={
                      passwordIsShort === null
                        ? "/icons/mini-gray-circle.svg"
                        : passwordIsShort
                          ? "/icons/times-circle.svg"
                          : "/icons/mark-green.svg"
                    }
                    alt="circle"
                    width={passwordIsShort === null ? 6 : 16}
                    height={passwordIsShort === null ? 6 : 16}
                    className="flex items-center justify-center"
                  />
                  <span>دارای هشت کاراکتر باشد.</span>
                </li>
                <li className="flex items-center gap-3">
                  <Image
                    src={
                      passwordIsLarge === null
                        ? "/icons/mini-gray-circle.svg"
                        : passwordIsLarge
                          ? "/icons/times-circle.svg"
                          : "/icons/mark-green.svg"
                    }
                    alt="circle"
                    width={passwordIsLarge === null ? 6 : 16}
                    height={passwordIsLarge === null ? 6 : 16}
                    className="flex items-center justify-center"
                  />
                  <span>کمتر یا برابر چهارده کاراکتر باشد.</span>
                </li>
              </ul>
            </div>
            <FormLayout.Submit
              label="تغییر رمز عبور"
              pendingStatus={isPending}
              disabled={!isValid}
            />
          </FormLayout>
        </div>
      ) : (
        <ChangePasswordSuccess />
      )}
    </>
  );
}

export default ChangePasswordForm;
