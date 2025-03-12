import { findPersianCategoryName } from "../_utils/helpers";
import MovieSlider from "./MovieSlider/MovieSlider";
import { IMovie } from "../_types/movieTypes";
import { getMoviesByGenre } from "../api/movieApi";

type Props = { category: string; HeadingStartsWithTitle?: boolean };

async function CategoryMovieSlider({
  category,
  HeadingStartsWithTitle,
}: Props) {
  const categoryName = findPersianCategoryName(category);
  const movies = await getMoviesByGenre(categoryName as string);

  if ((movies as IMovie[]).length > 0) {
    return (
      <MovieSlider
        heading={`${HeadingStartsWithTitle ? "فیلم های " : ""} ${categoryName}`}
        movies={movies as IMovie[]}
      />
    );
  } else return null;
}

export default CategoryMovieSlider;
