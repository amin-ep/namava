import Link from "next/link";
import { IPanelItem } from "./Tabs";
import Image from "next/image";
import { TabValue } from "@/app/_contexts/AppContext";

type Props = { items: IPanelItem[]; activeTab: TabValue };

function TabPanelContent({ items, activeTab }: Props) {
  return (
    <div
      id={`panel-${activeTab}`}
      className="flex flex-col gap-3 p-5 md:gap-4 md:px-6 xl:py-6"
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex justify-center rounded-md border border-gray-400 py-2"
        >
          <Image
            alt={item.title}
            src={item.imageSrc}
            width={20}
            height={20}
            className="w-5 md:w-6"
          />
          <span className="mr-2 text-xs font-bold leading-5 text-gray-700 md:text-sm md:leading-6">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default TabPanelContent;
