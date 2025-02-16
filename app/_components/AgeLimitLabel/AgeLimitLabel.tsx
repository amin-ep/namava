import { IMovie } from "@/app/_types/movieTypes";
import cls from "classnames";
import styles from "./AgeLimitLabel.module.css";

type Props = { age: IMovie["ageLimit"] };

function AgeLimitLabel({ age }: Props) {
  const agesClassNames: { [k: number]: string } = {
    3: "lime",
    7: "white",
    12: "yellow",
    15: "clayBrown",
    18: "appleBlossom",
  };

  return (
    <div
      className={cls(
        "flex h-6 w-9 items-center justify-center rounded-full text-center text-sm font-bold",
        styles[agesClassNames[age]],
      )}
    >
      {age}+
    </div>
  );
}

export default AgeLimitLabel;
