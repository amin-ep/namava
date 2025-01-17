"use client";

import { useEffect, useReducer } from "react";

interface State {
  value: string;
  isOpen: boolean;
}

type Action =
  | { type: "open" }
  | { type: "close" }
  | { type: "value"; payload: string }
  | { type: "clear" };

const initialState: State = {
  isOpen: false,
  value: "",
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "open":
      return { ...state, isOpen: true };

    case "close":
      return { ...state, isOpen: false };

    case "value":
      return { ...state, value: action.payload };

    case "clear":
      return { ...state, value: initialState.value };

    default:
      throw new Error("Unknown action type");
  }
};

export function useSelect(defaultValue?: string) {
  const [{ value, isOpen }, dispatch] = useReducer(reducer, initialState);
  const open = () => {
    dispatch({ type: "open" });
  };

  const close = () => {
    dispatch({
      type: "close",
    });
  };

  const updateValue = (payload: string) => {
    dispatch({ type: "value", payload });
  };

  const clear = () => {
    dispatch({ type: "clear" });
  };

  useEffect(() => {
    if (defaultValue) {
      updateValue(defaultValue);
    }
  }, [defaultValue]);

  return { value, isOpen, close, open, updateValue, clear };
}
