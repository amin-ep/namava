import cls from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styles from "./NeonCard.module.css";
import NeonSkeleton from "./NeonSkeleton";

type Props = { href: string; imagePath: string };

function NeonCard({ href, imagePath }: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <Link href={href} className={cls(styles.card, "relative")}>
      {!loaded && <NeonSkeleton />}
      <Image
        src={imagePath}
        alt={href}
        width={280}
        height={201}
        className={cls(
          "h-full w-full rounded-xl object-cover",
          styles.img,
          !loaded && "absolute inset-0 -z-10 opacity-0",
        )}
        unoptimized
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
}

// TODO: fix the skeleton
export default NeonCard;
