import styles from "./Banner.module.css";
import BannerImage from "./BannerImage";
import BannerStats from "./BannerStats";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <BannerStats />
      <BannerImage />
    </div>
  );
}
