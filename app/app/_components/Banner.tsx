import styles from "./Banner.module.css";
import BannerImage from "./BannerImage";
import BannerStats from "./BannerStats";

export default function Banner() {
  return (
    <div className={styles.banner}>
      <div className="relative flex h-full w-full flex-col items-center md:flex-row">
        <BannerStats />
        <BannerImage />
      </div>
    </div>
  );
}
