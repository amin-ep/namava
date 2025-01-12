import Image from "next/image";
import { memo } from "react";

const Logo = memo(function Logo() {
  return <Image src="/logo-white.svg" alt="logo" width={60} height={25} />;
});

export default Logo;
