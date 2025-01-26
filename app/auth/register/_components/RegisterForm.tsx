"use client";

import { useReducer } from "react";
import RegisterEmailForm from "./RegisterEmailForm";
import RegisterFormVerification from "./RegisterFormVerification";

type State = { email: string; hasSent: boolean };

export type RegisterActionTypes =
  | { type: "sent"; payload: State["email"] }
  | { type: "clear" };

const initialState: { email: string; hasSent: boolean } = {
  email: "",
  hasSent: false,
};

const reducer = (state: State, action: RegisterActionTypes) => {
  switch (action.type) {
    case "sent":
      return { ...state, email: action.payload, hasSent: true };

    case "clear":
      return initialState;

    default:
      throw new Error("Unknown action type");
  }
};

function RegisterForm() {
  const [{ email, hasSent }, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      {!hasSent ? (
        <RegisterEmailForm dispatch={dispatch} />
      ) : (
        <RegisterFormVerification email={email} dispatch={dispatch} />
      )}
    </>
  );
}

export default RegisterForm;
