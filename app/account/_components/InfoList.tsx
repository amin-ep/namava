import Link from "next/link";
import { InfoField } from "../page";

function InfoList({ items }: { items: InfoField[] }) {
  return (
    <ul className="flex flex-col gap-4 md:gap-6">
      {items.map((item) => (
        <li
          className="flex items-center justify-between gap-2 text-xs text-stone-600 md:text-sm xl:text-base"
          key={item?.label as string}
        >
          <div className="flex">
            {item.label as string}:{" "}
            <span className="px-1 text-stone-800">
              {item.label === "رمز عبور" && item.content != "-"
                ? "********"
                : item.content}
            </span>
          </div>
          {item.link && (
            <Link
              className="text-primary"
              href={
                item.label === "رمز عبور" && item.content === "-"
                  ? "/account/set-password"
                  : item.link.href
              }
            >
              {item.label === "رمز عبور" && item.content === "-"
                ? "افزودن رمز عبور"
                : item.link.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

export default InfoList;
