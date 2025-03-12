import MovieSlider from "../_components/MovieSlider/MovieSlider";
import { IMovie } from "../_types/movieTypes";
import SliderBanner from "../_components/SliderBanner/SliderBanner";
import { getAllMovies, getNewestMovies } from "../api/movieApi";
import NeonSlider from "./_components/NeonSlider";
import PageContainer from "../_components/PageContainer";

async function Page() {
  const movies = await getNewestMovies();
  const data = await getAllMovies();
  return (
    <PageContainer topPadding={false}>
      <SliderBanner data={movies as IMovie[]} />
      <div>
        <NeonSlider />
        <MovieSlider heading="ویژه" movies={data as IMovie[]} />
      </div>
    </PageContainer>
  );
}

export default Page;
