import Link from "next/link";

export default function InfoHeader({
  heading,
  link,
}: {
  heading: string;
  link?: { title: string; href: string };
}) {
  return (
    <div className="flex items-center justify-between text-xs xsm:text-sm xl:text-base">
      <h3 className="font-bold text-stone-800">{heading}</h3>
      {link && (
        <Link href={link.href} className="text-primary">
          {link.title}
        </Link>
      )}
    </div>
  );
}
