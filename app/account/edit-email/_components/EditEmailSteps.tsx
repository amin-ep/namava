"use client";

import { useEditEmail } from "@/app/_contexts/EditEmailContext";
import ResultCard from "../../_components/ResultCard";
import StepsContainer from "../../_components/StepsContainer";
import EditEmailConfirmForm from "./EditEmailConfirmForm";
import EditEmailForm from "./EditEmailForm";
import EditEmailOptions from "./EditEmailOptions";
import EditEmailOtpPassword from "./EditEmailOtpPassword";
import EditEmailPasswordForm from "./EditEmailPasswordForm";

function EditEmailSteps() {
  const { step, option, result, message } = useEditEmail();

  return (
    <StepsContainer>
      {step === 0 && <EditEmailOptions />}
      {step === 1 &&
        (option === "password" ? (
          <EditEmailPasswordForm />
        ) : option === "email" ? (
          <EditEmailOtpPassword />
        ) : (
          ""
        ))}
      {step === 2 && <EditEmailForm />}
      {step === 3 && <EditEmailConfirmForm />}
      {step === 4 && result !== null && (
        <ResultCard
          status={result as "success" | "error"}
          message={message as string}
          link={{ href: "/account", label: "بازگشت" }}
        />
      )}
    </StepsContainer>
  );
}

export default EditEmailSteps;
