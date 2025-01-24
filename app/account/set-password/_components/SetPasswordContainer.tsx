"use client";

import { useEffect, useState } from "react";
import SetPasswordRequestButton from "./SetPasswordRequestButton";
import SetPasswordVerificationForm from "./SetPasswordVerificationForm";
import SetPasswordForm from "./SetPasswordForm";
import { getMe } from "@/app/api/userApi";
import { User } from "@/app/_types/UserTypes";

function SetPasswordContainer() {
  const [level, setLevel] = useState<number>(1);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user: User = await getMe();

      if (user?.email) setUserEmail(user?.email);
    };
    getUser();
  }, []);

  return (
    <div className="flex h-dvh w-full items-start bg-white xsm:items-center xsm:bg-[unset]">
      <div className="mx-auto h-fit w-[500px] max-w-full">
        {level === 1 ? (
          <SetPasswordRequestButton setLevel={setLevel} email={userEmail} />
        ) : level === 2 ? (
          <SetPasswordVerificationForm setLevel={setLevel} email={userEmail} />
        ) : level === 3 ? (
          <SetPasswordForm />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default SetPasswordContainer;
