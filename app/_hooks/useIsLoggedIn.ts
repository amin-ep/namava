"use client";

import Cookies from "js-cookie";
import { useLayoutEffect, useState } from "react";
import { JWT_SECRET_KEY } from "../_utils/constants";

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useLayoutEffect(() => {
    const token = Cookies.get(JWT_SECRET_KEY);

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return [isLoggedIn];
}
