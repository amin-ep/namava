import { IMovie } from "../_types/movieTypes";
import { getNewestMovies } from "../api/movieApi";
import SliderBanner from "./SliderBanner/SliderBanner";

async function NewestMoviesBanner() {
  const data = await getNewestMovies();
  return <SliderBanner data={data as IMovie[]} />;
}

export default NewestMoviesBanner;
