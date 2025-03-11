import MovieSlider from "@/app/_components/MovieSlider/MovieSlider";
import { IMovie } from "@/app/_types/movieTypes";
import { categories, findPersianCategoryName } from "@/app/_utils/helpers";
import { getMoviesByDoubleGenreName } from "@/app/api/movieApi";

type Props = { categoryName: string };

type DataArray = { movies: IMovie[]; heading: string }[];

async function SliderWrapper({ categoryName }: Props) {
  const dataArray: DataArray = [];
  for (let i = 0; i < categories.length; i++) {
    const movies = await getMoviesByDoubleGenreName(
      findPersianCategoryName(categoryName) as string,
      categories[i].title,
    );

    if ((movies as IMovie[]).length > 0) {
      dataArray.push({
        heading: categories[i].title || "",
        movies: (movies as IMovie[]) || [],
      });
    }
  }
  return (
    <div className="flex flex-col">
      {dataArray.map((data) => (
        <MovieSlider
          heading={`${findPersianCategoryName(categoryName)} - ${data.heading}`}
          movies={data.movies}
          key={data.heading}
        />
      ))}
    </div>
  );
}

export default SliderWrapper;
