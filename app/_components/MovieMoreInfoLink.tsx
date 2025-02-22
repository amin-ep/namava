import Link from "next/link";
import { GrCircleInformation } from "react-icons/gr";
import cls from "classnames";

export default function MovieMoreInfoLink({
  href,
  extraStyles,
}: {
  href: string;
  extraStyles?: string;
}) {
  return (
    <Link
      href={href}
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
