"use client";

import { useReducer } from "react";
import RecoverFormEmail from "./RecoverFormEmail";
import RecoverFormPassword from "./RecoverFormPassword";
import RecoverFormVerify from "./RecoverFormVerify";

interface IState {
  step: number;
  email: null | string;
  resetId: string | null;
}

type IActions =
  | { type: "nextStep" }
  | { type: "email"; payload: string }
  | { type: "clearEmail" }
  | { type: "prevStep" }
  | { type: "resetId"; payload: string };

const initialState: IState = {
  step: 1,
  email: null,
  resetId: null,
};

const reducer = (state: IState, action: IActions) => {
  switch (action.type) {
    case "nextStep":
      return { ...state, step: state.step + 1 };

    case "email":
      return { ...state, email: action.payload };

    case "clearEmail":
      return { ...state, email: null };

    case "prevStep":
      return { ...state, step: state.step - 1 };

    case "resetId":
      return { ...state, resetId: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};

function RecoverSteps() {
  const [{ step, email, resetId }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleNextStep = () => {
    dispatch({ type: "nextStep" });
  };

  const handleSetEmail = (email: string) => {
    dispatch({ type: "email", payload: email });
  };

  const handlePrevStep = () => {
    dispatch({ type: "prevStep" });
  };

  const handleClearEmail = () => {
    dispatch({ type: "clearEmail" });
  };

  const handleWrongEmail = () => {
    handleClearEmail();
    handlePrevStep();
  };

  const handleSetPasswordResetId = (id: string) => {
    dispatch({ type: "resetId", payload: id });
  };

  return (
    <div>
      {step === 1 && (
        <RecoverFormEmail nextStep={handleNextStep} setEmail={handleSetEmail} />
      )}
      {step === 2 && (
        <RecoverFormVerify
          nextStep={handleNextStep}
          email={email as string}
          setResetId={handleSetPasswordResetId}
          wrongEmail={handleWrongEmail}
        />
      )}
      {step === 3 && <RecoverFormPassword resetId={resetId as string} />}
    </div>
  );
}

export default RecoverSteps;
