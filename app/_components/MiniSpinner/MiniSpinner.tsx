import styles from "./MiniSpinner.module.css";
import cls from "classnames";

type Props = { color?: "primary" | "black" | "white" };

function MiniSpinner({ color = "primary" }: Props) {
  return (
    <div className={cls(styles.spinner, styles[`spinner-${color}`])}></div>
  );
}

export default MiniSpinner;
