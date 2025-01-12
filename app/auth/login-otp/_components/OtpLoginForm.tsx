"use client";

import { useReducer } from "react";
import OtpLoginFormEmail from "./OtpLoginFormEmail";
import OtpLoginFormVerification from "./OtpLoginFormVerification";

type State = { email: string; hasSent: boolean };

export type OTPLoginActionTypes =
  | { type: "sent"; payload: State["email"] }
  | { type: "clear" };

const initialState: { email: string; hasSent: boolean } = {
  email: "",
  hasSent: false,
};

const reducer = (state: State, action: OTPLoginActionTypes) => {
  switch (action.type) {
    case "sent":
      return { ...state, email: action.payload, hasSent: true };

    case "clear":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
};

export default function OtpLoginForm() {
  const [{ email, hasSent }, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {!hasSent ? (
        <OtpLoginFormEmail dispatch={dispatch} />
      ) : (
        <OtpLoginFormVerification email={email} dispatch={dispatch} />
      )}
    </>
  );
}
