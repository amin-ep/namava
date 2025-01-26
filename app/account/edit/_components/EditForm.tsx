"use client";

import { useActionState, useEffect } from "react";
import { updateMe } from "../actions";
import { useRouter } from "next/navigation";
import { User } from "@/app/_types/userTypes";
import EditFormFields from "./EditFormFields";
import { useToast } from "@/app/_hooks/useToast";

function EditForm({ user }: { user: User }) {
  const [result, formAction, isPending] = useActionState(updateMe, null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (result && result?.status === "success") {
      toast("success", result?.message as string);
      router.push("/account");
    }
  }, [result?.status, result?.message]);

  useEffect(() => {
    if (result && result.status === "error") {
      toast("error", result.message as string);
    }
  }, [result]);

  return (
    <form className="md:px-1 xl:px-[68px]" action={formAction}>
      <EditFormFields isPending={isPending} user={user} />
    </form>
  );
}

export default EditForm;
