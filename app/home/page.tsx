import MovieSlider from "../_components/MovieSlider/MovieSlider";
import { IMovie } from "../_types/movieTypes";
import { getAllMovies } from "../api/movieApi";
import NeonSlider from "./_components/NeonSlider";
import PageContainer from "../_components/PageContainer";
import NewestMoviesBanner from "../_components/NewestMoviesBanner";
import { Suspense } from "react";
import RippleLoader from "../_components/RippleLoader/RippleLoader";

async function Page() {
  const data = await getAllMovies();
  return (
    <PageContainer topPadding={false}>
      <Suspense fallback={<RippleLoader />}>
        <NewestMoviesBanner />
      </Suspense>
      <div>
        <NeonSlider />
        <MovieSlider heading="ویژه" movies={data as IMovie[]} />
      </div>
    </PageContainer>
  );
}

export default Page;
