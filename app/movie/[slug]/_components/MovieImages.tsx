import { IMovie } from "@/app/_types/movieTypes";
import { FILE_BASE_URL } from "@/app/_utils/constants";
import Image from "next/image";
import cls from "classnames";
import styles from "./MovieImages.module.css";

type Props = { movie: IMovie };

function MovieImages({ movie }: Props) {
  return (
    <div>
      <h3 className="mb-4 text-base leading-[1.75] text-white xl:text-lg">
        تصاویر و جزئیات
      </h3>
      <div className={cls(styles["image-wrapper"])}>
        {movie.images?.map((img, i) => (
          <Image
            key={i}
            src={`${FILE_BASE_URL}/${img}`}
            alt={`${i}-image`}
            width={86}
            height={66}
            className="aspect-[4/3] w-full rounded-[3px] object-cover md:rounded-[4px] xl:rounded-[6px]"
            unoptimized
          />
        ))}
      </div>
    </div>
  );
}

export default MovieImages;
