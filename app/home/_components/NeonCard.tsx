import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./NeonCard.module.css";
import cls from "classnames";

type Props = { href: string; imagePath: string };

function NeonCard({ href, imagePath }: Props) {
  return (
    <Link href={href} className={cls(styles.card, "")}>
      <Image
        src={imagePath}
        alt={href}
        width={280}
        height={201}
        className={cls("h-full w-full rounded-xl object-cover", styles.img)}
        unoptimized
      />
    </Link>
  );
}

export default NeonCard;
