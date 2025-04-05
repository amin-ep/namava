"use client";

import { useHasSubscription } from "@/app/_hooks/useHasSubscription";
import cls from "classnames";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import UserOptionsMenu from "./UserOptionsMenu";
import UserOptionsSubscriptionStatus from "./UserOptionsSubscriptionStatus";

interface State {
  isOpen: boolean;
  openingPattern: "onClick" | "onHover" | null;
}

type Actions =
  | { type: "open" }
  | { type: "close" }
  | { type: "openingPattern"; payload: State["openingPattern"] }
  | { type: "toggle" };

const initialState: State = {
  isOpen: false,
  openingPattern: "onClick",
};

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case "open":
      return { ...state, isOpen: true };

    case "close":
      return { ...state, isOpen: false };

    case "toggle":
      return { ...state, isOpen: !state.isOpen };

    case "openingPattern":
      return { ...state, openingPattern: action.payload };

    default:
      throw new Error("Unknown action type");
  }
};

type Props = { subscriptionExpiresAt: null | Date };

function UserOptions({ subscriptionExpiresAt }: Props) {
  const pathname = usePathname();
  const [hasSubscription] = useHasSubscription();

  const isDisableRoute = useMemo(() => {
    const disableRoutes: string[] = ["/app"];
    return disableRoutes.includes(pathname);
  }, [pathname]);

  const [optionsStyles, setOptionsStyles] = useState<string>("hidden");
  const [{ openingPattern, isOpen }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  // Styling container
  useEffect(() => {
    if (isDisableRoute) return;
    const handleOptionsStyles = () => {
      if (window.innerWidth < 500) {
        if (isOpen) {
          setOptionsStyles("translate-x-[unset]");
        } else {
          setOptionsStyles("translate-y-full");
        }
      } else {
        if (isOpen) {
          setOptionsStyles("grid");
        } else {
          setOptionsStyles("hidden");
        }
      }
    };
    handleOptionsStyles();

    window.addEventListener("resize", handleOptionsStyles, true);

    return () =>
      window.removeEventListener("resize", handleOptionsStyles, true);
  }, [isOpen, optionsStyles, isDisableRoute]);

  // changing opening pattern of user options in different window sizes
  useEffect(() => {
    if (isDisableRoute) return;
    const handleOpeningPattern = () => {
      if (window.innerWidth < 500) {
        dispatch({ type: "openingPattern", payload: "onClick" });
      } else if (window.innerWidth >= 500) {
        dispatch({
          type: "openingPattern",
          payload: "onHover",
        });
      }
    };

    window.addEventListener("resize", handleOpeningPattern);

    handleOpeningPattern();

    return () => {
      window.removeEventListener("resize", handleOpeningPattern);
    };
  }, [isDisableRoute]);

  useEffect(() => {
    if (isDisableRoute) return;
    const handleOpenOnClick = () => {
      dispatch({ type: "toggle" });
    };

    if (buttonRef) {
      // button click
      buttonRef.current?.addEventListener("click", handleOpenOnClick);
      return () => {
        buttonRef.current?.removeEventListener("click", handleOpenOnClick);
      };
    }

    if (openingPattern === "onHover") {
      const handleChangingWindowSize = () => {
        if (openingPattern === "onHover" && isOpen) dispatch({ type: "close" });
      };

      window.addEventListener("resize", handleChangingWindowSize);

      return () => {
        window.removeEventListener("resize", handleChangingWindowSize);
      };
    }
  }, [openingPattern, isOpen, isDisableRoute]);

  useEffect(() => {
    if (isDisableRoute) return;
    if (openingPattern === "onHover" && isOpen) {
      const handleCloseDuringScroll = () => {
        if (isOpen) {
          dispatch({ type: "close" });
        }
      };

      window.addEventListener("scroll", handleCloseDuringScroll);

      return () =>
        window.removeEventListener("scroll", handleCloseDuringScroll);
    }
  }, [isOpen, openingPattern, isDisableRoute]);

  useEffect(() => {
    if (isDisableRoute) return;
    if (openingPattern === "onClick") {
      if (isOpen) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }
  }, [isOpen, openingPattern, isDisableRoute]);

  const handleContainerOnMouseEnter = () => {
    dispatch({ type: "open" });
  };

  const handleContainerOnMouseOut = useCallback(() => {
    setTimeout(() => {
      if (optionsRef.current?.matches(":hover")) {
        return;
      } else {
        if (buttonRef.current?.matches(":hover")) {
          return;
        } else {
          dispatch({ type: "close" });
        }
      }
    }, 2000);
  }, []);

  if (isDisableRoute) return null;
  else
    return (
      <div
        className={cls("relative flex items-center justify-center")}
        {...(openingPattern === "onHover" && {
          onMouseEnter: handleContainerOnMouseEnter,
          onMouseOut: handleContainerOnMouseOut,
        })}
      >
        {isOpen && (
          <div
            className={cls(
              "fixed inset-0 bg-black/50 transition duration-[1300ms] xsm:hidden",
              isOpen ? "z-10 opacity-100" : "-z-50 opacity-0",
            )}
            onClick={() => {
              dispatch({
                type: "close",
              });
            }}
          ></div>
        )}
        <button ref={buttonRef}>
          <Image
            src="/user-icon.png"
            alt="user"
            width={25}
            height={25}
            className={cls(
              "aspect-square w-[30px] rounded-full outline outline-2 outline-offset-2 xl:w-9",
              hasSubscription ? "outline-success" : "outline-red-default",
            )}
          />
        </button>

        <div
          className={cls(
            "fixed bottom-0 left-0 right-0 top-1/4 z-20 grid h-full grid-cols-1 grid-rows-[20%_1fr] transition duration-500 xsm:bottom-[unset] xsm:left-1 xsm:right-[unset] xsm:top-[58px] xsm:h-[80vh] xsm:max-h-[469px] xsm:w-[272px] xsm:rounded-xl xsm:before:absolute xsm:before:-top-3 xsm:before:left-7 xsm:before:z-20 xsm:before:h-5 xsm:before:w-4 xsm:before:bg-no-repeat base:left-[11px] lg:left-6 xl:left-[26px] xl:top-20",
            optionsStyles,
            hasSubscription
              ? "xsm:before:bg-[url('/triangle-green.svg')]"
              : "xsm:before:bg-[url('/triangle-red.svg')]",
          )}
          ref={optionsRef}
        >
          <div className="grid h-[calc(100vh)] grid-cols-1 grid-rows-[90px_auto] rounded-xl bg-white shadow-[0_10px_12px_rgba(0,0,0,0.3)] xsm:h-[340px]">
            <UserOptionsSubscriptionStatus
              subscriptionExpiresAt={subscriptionExpiresAt as Date}
              hasSubscription={hasSubscription}
            />
            <UserOptionsMenu />
          </div>
        </div>
      </div>
    );
}

export default UserOptions;
