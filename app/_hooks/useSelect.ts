"use client";

import { useCallback, useEffect, useReducer } from "react";

interface State {
  value: string;
  isOpen: boolean;
}

type Action =
  | { type: "open" }
  | { type: "close" }
  | { type: "value"; payload: string }
  | { type: "clear" }
  | { type: "toggle" };

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

    case "toggle":
      return { ...state, isOpen: !state.isOpen };

    default:
      throw new Error("Unknown action type");
  }
};

export function useSelect(defaultValue?: string) {
  const [{ value, isOpen }, dispatch] = useReducer(reducer, initialState);
  const open = () => {
    dispatch({ type: "open" });
  };

  const toggle = () => {
    dispatch({ type: "toggle" });
  };

  const close = () => {
    dispatch({
      type: "close",
    });
  };

  const updateValue = useCallback(
    (payload: string) => dispatch({ type: "value", payload }),
    [],
  );

  const clear = () => {
    dispatch({ type: "clear" });
  };

  useEffect(() => {
    if (defaultValue) {
      updateValue(defaultValue);
    }
  }, [defaultValue, updateValue]);

  return { value, isOpen, close, open, updateValue, clear, toggle };
}
