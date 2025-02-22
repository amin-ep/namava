import MovieSlider from "../_components/MovieSlider/MovieSlider";
import SliderBanner from "../_components/SliderBanner/SliderBanner";
import { IMovie } from "../_types/movieTypes";
import { getAllMovies, getNewestMovies } from "../api/movieApi";
import NeonSlider from "./_components/NeonSlider";

async function Page() {
  const movies = await getNewestMovies();
  const data = await getAllMovies();
  return (
    <div>
      <SliderBanner data={movies as IMovie[]} />
      <div>
        <NeonSlider />
        <MovieSlider heading="ویژه" movies={data as IMovie[]} />
      </div>
    </div>
  );
}

export default Page;
