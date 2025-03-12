import { Suspense } from "react";
import BannerLoader from "../_components/BannerLoader";
import CategoryMovieSlider from "../_components/CategoryMovieSlider";
import NewestMoviesBanner from "../_components/NewestMoviesBanner";
import PageContainer from "../_components/PageContainer";
import SliderLoader from "../_components/SliderLoader";
import { categories } from "../_utils/helpers";

function Page() {
  return (
    <PageContainer topPadding={false}>
      <Suspense fallback={<BannerLoader />}>
        <NewestMoviesBanner />
      </Suspense>
      {categories.map((ctg) => (
        <Suspense key={ctg.href} fallback={<SliderLoader />}>
          <CategoryMovieSlider category={ctg.href} />
        </Suspense>
      ))}
    </PageContainer>
  );
}

export default Page;
