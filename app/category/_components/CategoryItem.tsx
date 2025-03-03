import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { imageSrc: string; title: string; href: string };

function CategoryItem({ imageSrc, title, href }: Props) {
  return (
    <Link href={`/category/${href}`} className="relative">
      <Image
        src={imageSrc}
        title={title}
        width={135}
        height={75}
        className="aspect-[9/5] w-full rounded-sm md:aspect-[47/26] md:rounded-[4px] xl:aspect-[143/80] xl:rounded-md"
        alt={title}
        unoptimized
      />
      <div className="absolute bottom-0 right-0 top-0 z-10 flex w-[70%] items-center text-right xsm:w-[55%]">
        <h2 className="table-cell pr-3 text-right text-sm text-white xsm:pr-6 xsm:text-lg md:text-xl xl:text-2xl">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default CategoryItem;
