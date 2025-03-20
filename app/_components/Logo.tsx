import Image from "next/image";
import { memo } from "react";

type Props = { color?: "primary" | "white" };

const Logo = memo(function Logo({ color = "white" }: Props) {
  return (
    <Image
      src={`/logo-${color}.svg`}
      alt="logo"
      width={60}
      height={25}
      className="w-12 xl:w-[62px]"
    />
  );
});

export default Logo;
