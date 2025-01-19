"use client";

import { logout } from "@/app/auth/login-otp/actions";
import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  FaFolderOpen,
  FaGift,
  FaPhone,
  FaStar,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { PiPowerFill } from "react-icons/pi";

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

function UserOptions() {
  const [optionsStyles, setOptionsStyles] = useState<string>("hidden");
  const [{ openingPattern, isOpen }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionsRef = useRef<HTMLDivElement | null>(null);

  // Styling container
  useEffect(() => {
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
  }, [isOpen, optionsStyles]);

  // changing opening pattern of user options in different window sizes
  useEffect(() => {
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
  }, []);

  // handling open and close functionalities
  useEffect(() => {
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
  }, [openingPattern, isOpen]);

  useEffect(() => {
    const handleChangingWindowSize = () => {
      if (openingPattern === "onHover" && isOpen) dispatch({ type: "close" });
    };

    window.addEventListener("resize", handleChangingWindowSize);

    return () => {
      window.removeEventListener("resize", handleChangingWindowSize);
    };
  }, [openingPattern, isOpen]);

  const items: {
    title: string;
    href: string;
    icon: ReactNode;
    onClick?: () => void;
  }[] = useMemo(() => {
    return [
      {
        title: "لیست ها",
        icon: <FaFolderOpen size={20} />,
        href: "/playlists",
      },
      {
        title: "خرید اشتراک",
        icon: <FaStar size={20} />,
        href: "/plans",
      },
      {
        title: "کارت هدیه",
        icon: <FaGift size={20} />,
        href: "/plans#redeemCard",
      },
      {
        title: "دعوت از دوستان",
        icon: <FaUsers size={20} />,
        href: "/referral",
      },
      {
        title: "حساب کاربری شما",
        icon: <FaUser size={20} />,
        href: "/account",
      },
      {
        title: "تماس با ما",
        icon: <FaPhone size={20} />,
        href: "/contact",
      },
      {
        title: "خروج از حساب کاربری",
        icon: <PiPowerFill size={20} />,
        href: "/home",
        onClick: logout,
      },
    ];
  }, []);

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

  return (
    <div
      className={cls("relative flex items-center justify-center")}
      {...(openingPattern === "onHover" && {
        onMouseEnter: handleContainerOnMouseEnter,
        onMouseOut: handleContainerOnMouseOut,
      })}
    >
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
      <button ref={buttonRef}>
        <Image
          src="/user-icon.png"
          alt="user"
          width={25}
          height={25}
          className="aspect-square w-[30px] rounded-full outline outline-2 outline-offset-2 outline-[#d95c5c] xl:w-9"
        />
      </button>

      <div
        className={cls(
          "fixed bottom-0 left-0 right-0 top-1/4 z-20 grid h-full grid-cols-1 grid-rows-[20%_1fr] transition duration-500 xsm:bottom-[unset] xsm:left-1 xsm:right-[unset] xsm:top-[58px] xsm:h-[80vh] xsm:max-h-[469px] xsm:w-[272px] xsm:rounded-xl xsm:before:absolute xsm:before:-top-3 xsm:before:left-7 xsm:before:z-20 xsm:before:h-5 xsm:before:w-4 xsm:before:bg-[url('/triangle.svg')] xsm:before:bg-no-repeat base:left-[11px] lg:left-6 xl:left-[26px] xl:top-20",
          optionsStyles,
        )}
        ref={optionsRef}
      >
        <div className="grid h-[calc(100vh)] grid-cols-1 grid-rows-[90px_auto] rounded-xl bg-white shadow-[0_10px_12px_rgba(0,0,0,0.3)] xsm:h-[340px]">
          <div className="flex flex-col items-center justify-center gap-[10px] rounded-t-xl bg-[#d95c5c] p-4">
            <p className="text-sm text-white">اشتراک فعالی ندارید.</p>
            <Link
              href="/plans"
              className="w-full rounded-xl bg-white px-5 text-center text-xs leading-[30px] text-[rgb(26,26,26)] shadow-[0_4px_8px_rgba(0,0,0,0.25)] hover:bg-primary hover:text-white"
            >
              خرید اشتراک
            </Link>
          </div>
          <div className="h-[calc(100vh-90px)] overflow-auto px-3 py-2 text-xs text-black xsm:h-[250px] xsm:rounded-b-xl">
            <ul className="flex flex-col gap-[15px]">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-start gap-2 hover:text-primary"
                    {...(item.onClick && { onClick: item.onClick })}
                  >
                    <span className="text-stone-400">{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserOptions;
