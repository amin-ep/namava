import Image from "next/image";
import SliderBanner from "../_components/SliderBanner/SliderBanner";
import { IMovie } from "../_types/movieTypes";
import { getNewestMovies } from "../api/movieApi";

async function Page() {
  const movies = await getNewestMovies();
  return (
    <div>
      <SliderBanner data={movies as IMovie[]} />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
      <Image width={200} height={170} alt="image" src="/Dirty-Angels.jpg" />
    </div>
  );
}

export default Page;
