import cls from "classnames";
import RippleLoader from "./RippleLoader/RippleLoader";

export default function BannerLoader() {
  return (
    <div
      className={cls("banner-container", "flex items-center justify-center")}
    >
      <RippleLoader />
    </div>
  );
}
