import styles from "./CategoryWrapper.module.css";

type Props = { children: React.ReactNode };

function CategoryWrapper({ children }: Props) {
  return <div className={styles.wrapper}>{children}</div>;
}

export default CategoryWrapper;
