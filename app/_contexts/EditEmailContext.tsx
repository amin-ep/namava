/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { createContext, useCallback, useContext, useReducer } from "react";
import { User } from "../_types/userTypes";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMe } from "../api/userApi";

interface State {
  step: number;
  option: string | null;
  result: null | string;
  message: null | string;
}

interface Context extends State {
  handleNextStep: () => void;
  handleResult: (_result: "success" | "error", _message: string) => void;
  handleChangeOption: (_option: "password" | "email") => void;
  userData: User | null;
}

const EditEmailContext = createContext<Context>({
  step: 0,
  option: null,
  result: null,
  message: null,
  handleNextStep: () => {},
  handleResult: (_result: "success" | "error", _message: string) => {},
  handleChangeOption: (_option: "password" | "email") => {},
  userData: null,
});

type Actions =
  | { type: "nextStep" }
  | { type: "email" }
  | { type: "password" }
  | { type: "error"; payload: string }
  | { type: "success"; payload: string };

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "nextStep":
      return { ...state, step: state.step + 1 };

    case "email":
      return { ...state, option: "email", step: state.step + 1 };

    case "password":
      return { ...state, option: "password", step: state.step + 1 };

    case "error":
      return { ...state, result: "error", message: action.payload };

    case "success":
      return { ...state, result: "success", message: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};
const initialState: State = {
  step: 0,
  option: null,
  result: null,
  message: null,
};

function EditEmailProvider({ children }: { children: React.ReactNode }) {
  const [{ option, step, result, message }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const queryClient = useQueryClient();
  const { data: userData } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  function handleChangeOption(option: "email" | "password") {
    switch (option) {
      case "email":
        dispatch({ type: "email" });
        break;

      case "password":
        dispatch({ type: "password" });
        break;

      default:
        throw new Error("Unknown option");
    }
  }

  function handleNextStep() {
    dispatch({ type: "nextStep" });
    if (step >= 2) {
      queryClient.invalidateQueries({
        queryKey: "currentUser",
      });
    }
  }

  function handleResult(result: "success" | "error", message: string) {
    if (result === "success") {
      dispatch({ type: "success", payload: message });
    } else if (result === "error") {
      dispatch({ type: "error", payload: message });
    }
  }

  return (
    <EditEmailContext
      value={{
        handleChangeOption,
        handleNextStep,
        handleResult,
        message,
        option,
        result,
        step,
        userData: userData as User,
      }}
    >
      {children}
    </EditEmailContext>
  );
}

const useEditEmail = () => {
  const context = useContext(EditEmailContext);

  if (context === undefined) {
    throw new Error("context is used outside the provider");
  }

  return context;
};

export { EditEmailProvider, useEditEmail };
