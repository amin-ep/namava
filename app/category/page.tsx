import PageContainer from "../_components/PageContainer";
import { categories } from "../_utils/constants";

import CategoryItem from "./_components/CategoryItem";
import CategoryWrapper from "./_components/CategoryWrapper/CategoryWrapper";

export const metadata = {
  title: "دسته بندی",
};

function Page() {
  return (
    <PageContainer topPadding>
      <CategoryWrapper>
        {categories
          .filter((c) => c.imageSrc !== undefined)
          .map((category, i) => (
            <CategoryItem
              imageSrc={category.imageSrc as string}
              title={category.title}
              key={i}
              href={category.href}
            />
          ))}
      </CategoryWrapper>
    </PageContainer>
  );
}

export default Page;
