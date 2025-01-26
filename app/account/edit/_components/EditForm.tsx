"use client";

import { useActionState, useEffect } from "react";
import { updateMe } from "../actions";
import { useRouter } from "next/navigation";
import { User } from "@/app/_types/userTypes";
import EditFormFields from "./EditFormFields";
import { useToast } from "@/app/_hooks/useToast";

function EditForm({ user }: { user: User }) {
  const [res, formAction, isPending] = useActionState(updateMe, null);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (res && (res as { status: "success" | "error"; message: string })) {
      if (res?.status === "success") {
        toast(res?.status, res.message as string);
        router.push("/account");
      } else {
        toast(res.status as string, res.message as string);
      }
    }
  }, [res, router, toast]);

  return (
    <form className="md:px-1 xl:px-[68px]" action={formAction}>
      <EditFormFields isPending={isPending} user={user} />
    </form>
  );
}

export default EditForm;
