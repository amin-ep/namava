import Link from "next/link";
import { GrCircleInformation } from "react-icons/gr";
import cls from "classnames";
import { IMovie } from "../_types/movieTypes";

export default function MovieMoreInfoLink({
  slug,
  extraStyles,
}: {
  slug: IMovie["slug"];
  extraStyles?: string;
}) {
  return (
    <Link
      href={`/movie/${slug}`}
      className={cls(
        "flex flex-row items-center justify-between gap-2 text-xs text-white hover:text-primary-default",
        extraStyles,
      )}
    >
      <GrCircleInformation size={25} />
      اطلاعات بیشتر
    </Link>
  );
}
