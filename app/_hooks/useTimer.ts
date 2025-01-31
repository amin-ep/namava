"use client";

import { useEffect, useReducer, useTransition } from "react";
import { FormActionPreviousState } from "../_types/globalTypes";

export type UseTimerFormAction<T> = (
  _prevState?: FormActionPreviousState,
  formData?: FormData,
) => Promise<
  | null
  | {
      status: string;
      message?: undefined | string;
      values?: undefined | T;
      statusCode?: number | undefined;
    }
  | undefined
>;

interface IState {
  time: number;
  finished: boolean;
}

type Actions =
  | { type: "increase" }
  | { type: "decrease" }
  | { type: "finish" }
  | {
      type: "restart";
      payload: {
        step: number;
      };
    };

const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "increase":
      return { ...state, time: state.time + 1 };

    case "decrease":
      return { ...state, time: state.time - 1 };

    case "finish":
      return { ...state, finished: true };

    case "restart":
      return { ...state, finished: false, time: action.payload.step };

    default:
      throw new Error("Unknown action type");
  }
};

export function useTimer<T>({
  step,
  variant = "increase",
  finishesAt = 0,
  formAction,
}: {
  step: number;
  variant: "increase" | "decrease";
  finishesAt: number;
  formAction: UseTimerFormAction<T> | Promise<string | number | undefined>;
}) {
  const [isPending, startTransition] = useTransition();
  const [{ time, finished }, dispatch] = useReducer(reducer, {
    time: step,
    finished: false,
  } as IState);

  useEffect(
    function () {
      if (finishesAt === time) {
        dispatch({ type: "finish" });
      } else {
        const interval = setInterval(() => {
          dispatch({
            type: variant,
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    },
    [variant, finishesAt, time],
  );

  const handleRestart = function () {
    startTransition(async () => {
      const res = await formAction();
      if (res?.status === "success") {
        dispatch({ type: "restart", payload: { step } });
      }
    });
  };

  // const { action, isPending } = useFormAction({
  //   formAction: formAction,
  //   shouldNotifyOnError: true,
  //   onSuccess: handleRestart,
  // });

  return { time, finished, handleRestart, isPending };
}
