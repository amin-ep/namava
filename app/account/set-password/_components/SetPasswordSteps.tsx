"use client";

import { useEffect, useState } from "react";
import SetPasswordOptions from "./SetPasswordOptions";
import SetPasswordVerificationForm from "./SetPasswordVerificationForm";
import SetPasswordForm from "./SetPasswordForm";
import { getMe } from "@/app/api/userApi";
import { User } from "@/app/_types/UserTypes";
import StepsContainer from "../../_components/StepsContainer";

function SetPasswordSteps() {
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
    <StepsContainer>
      {level === 1 ? (
        <SetPasswordOptions setLevel={setLevel} email={userEmail} />
      ) : level === 2 ? (
        <SetPasswordVerificationForm setLevel={setLevel} email={userEmail} />
      ) : level === 3 ? (
        <SetPasswordForm />
      ) : (
        ""
      )}
    </StepsContainer>
  );
}

export default SetPasswordSteps;
