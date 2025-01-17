import { useFormStatus } from "react-dom";
import cls from "classnames";
import MiniSpinner from "@/app/_components/MiniSpinner";

function EditFormSubmit({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <button
      className={cls(
        "my-3 flex h-[42px] cursor-pointer items-center justify-center rounded-xl bg-primary px-5 text-xs leading-[42px] text-white xsm:my-4",
        !pending
          ? "disabled:cursor-default disabled:bg-stone-400"
          : "disabled:cursor-default",
      )}
    >
      {!pending ? children : <MiniSpinner />}
    </button>
  );
}

export default EditFormSubmit;
