import Image from "next/image";
import MainLink from "./MainLink";
import Link from "next/link";

interface AppLinkProps {
  href: string;
  imageSrc: string;
  title: string;
}

const apps: AppLinkProps[] = [
  {
    title: "بازار",
    href: "https://cafebazaar.ir/app/com.shatelland.namava.mobile",
    imageSrc: "/cafe-bazaar-logo.png",
  },
  {
    title: "سیب اپ",
    href: "https://sibapp.com/applications/namava",
    imageSrc: "/sibapp-logo.png",
  },
  {
    title: "گوگل پلی",
    href: "https://play.google.com/store/apps/details?id=com.shatelland.namava.mobile",
    imageSrc: "/google-play-logo.png",
  },
];

function FooterApplications() {
  return (
    <div className="flex items-center justify-between rounded-md xl:bg-[#222327] xl:px-6 xl:py-4">
      <div className="flex flex-row items-center gap-4">
        <Image
          src="/namava.jpg"
          alt="namava"
          width={48}
          height={48}
          className="aspect-square w-12 rounded-lg xl:w-[74px]"
        />
        <span className="text-sm text-white xl:text-base">دانلود اپلیکیشن</span>
      </div>
      <div className="flex items-center justify-end gap-4">
        {apps.map((app) => (
          <AppLink
            href={app.href}
            imageSrc={app.imageSrc}
            title={app.title}
            key={app.imageSrc}
          />
        ))}
        <MainLink href="/app">بیشتر</MainLink>
      </div>
    </div>
  );
}

function AppLink({ href, imageSrc, title }: AppLinkProps) {
  return (
    <Link
      href={href}
      className="grid h-12 w-12 items-center justify-center rounded-md bg-[#37383e] p-1 xl:w-[106px] xl:grid-cols-[40px_1fr] xl:justify-between xl:gap-2"
    >
      <Image
        src={imageSrc}
        alt={title}
        width={48}
        height={48}
        className="h-10 w-10"
      />
      <div className="hidden text-[9px] text-stone-400 xl:block">
        دریافت از
        <br />
        <span className="text-xs font-bold text-stone-300">{title}</span>
      </div>
    </Link>
  );
}

export default FooterApplications;
