import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useSwiper } from "swiper/react";

function SliderBannerButtons() {
  const swiper = useSwiper();

  return (
    <div className="absolute bottom-[4.6875vw] left-0 z-10 hidden items-center gap-3 md:flex xl:bottom-[10vw]">
      <Button onClick={() => swiper.slideNext()}>
        <FaChevronRight />
      </Button>
      <Button onClick={() => swiper.slidePrev()}>
        <FaChevronLeft />
      </Button>
      <button className="white/60 aspect-square w-10 rounded-full"></button>
    </div>
  );
}

function Button({
  onClick,
  children,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex aspect-square w-10 cursor-default items-center justify-center rounded-full bg-white/25 text-gray-400 hover:text-white"
    >
      {children}
    </button>
  );
}

export default SliderBannerButtons;
