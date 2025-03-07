import styles from "./FreeStatusLabel.module.css";
import cls from "classnames";

type Props = { extraStyles?: string };

export default function FreeStatusLabel({ extraStyles }: Props) {
  return <span className={cls(styles.label, extraStyles)}>رایگان</span>;
}
