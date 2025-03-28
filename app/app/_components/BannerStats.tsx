"use client";

import LinkButton from "@/app/_components/LinkButton";
import { useApp } from "@/app/_contexts/AppContext";
import { HiDownload } from "react-icons/hi";

function BannerStats() {
  const { heading, activeTab, description } = useApp();

  const handleDownloadButtonClick = () => {
    const tabPanel = document.querySelector(`#panel-${activeTab}`);
    if (tabPanel) {
      tabPanel.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <div>
      <h3 className="mb-2 text-center text-base font-bold leading-7 md:mb-5 md:text-right md:text-[22px] md:leading-9 lg:text-2xl lg:leading-10">
        {heading}
      </h3>
      <p className="mb-3 text-sm font-normal leading-6 md:mb-7 md:text-lg md:leading-8 xl:text-xl xl:leading-9">
        {description}
      </p>
      <div className="flex w-full items-center justify-center md:justify-start">
        <LinkButton
          onClick={handleDownloadButtonClick}
          color="white"
          variation="button"
          extraStyles="gap-2 font-bold"
        >
          <HiDownload size={24} />
          <span>دانلود ها</span>
        </LinkButton>
      </div>
    </div>
  );
}

export default BannerStats;
