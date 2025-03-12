import CategoryMovieSlider from "@/app/_components/CategoryMovieSlider";
import PageContainer from "@/app/_components/PageContainer";
import SliderBanner from "@/app/_components/SliderBanner/SliderBanner";
import { IMovie } from "@/app/_types/movieTypes";
import { findPersianCategoryName } from "@/app/_utils/helpers";
import { getMoviesByGenre } from "@/app/api/movieApi";
import { Params } from "next/dist/server/request/params";
import SliderWrapper from "./_components/SliderWrapper";

type Props = { params: Params };

async function page({ params }: Props) {
  const { name } = await params;

  const categoryName = findPersianCategoryName(name as string);
  const movies = await getMoviesByGenre(categoryName as string);

  return (
    <PageContainer topPadding={false}>
      <SliderBanner data={(movies as IMovie[]).slice(0, 5)} />
      <CategoryMovieSlider category={name as string} HeadingStartsWithTitle />
      <SliderWrapper categoryName={name as string} />
    </PageContainer>
  );
}

export default page;
