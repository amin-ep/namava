import Link from "next/link";
import AccountMainHeading from "./AccountMainHeading";

export default function InfoHeader({
  heading,
  link,
}: {
  heading: string;
  link?: { title: string; href: string };
}) {
  return (
    <div className="flex items-center justify-between">
      <AccountMainHeading>{heading}</AccountMainHeading>
      {link && (
        <Link href={link.href} className="text-primary">
          {link.title}
        </Link>
      )}
    </div>
  );
}
