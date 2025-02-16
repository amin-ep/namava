import PageContainer from "../_components/PageContainer";
import { categories } from "../_utils/helpers";
import CategoryItem from "./_components/CategoryItem";
import CategoryWrapper from "./_components/CategoryWrapper/CategoryWrapper";

export const metadata = {
  title: "دسته بندی",
};

function Page() {
  return (
    <PageContainer>
      <CategoryWrapper>
        {categories.map((category, i) => (
          <CategoryItem
            imageSrc={category.imageSrc}
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
