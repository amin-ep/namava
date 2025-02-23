import LinkButton from "@/app/_components/LinkButton";
import Container from "../_components/Container";

export const metadata = {
  title: "وضعیت اشتراک",
};

function Page() {
  return (
    <div className="min-h-screen">
      <Container className="flex h-64 flex-col items-center justify-center gap-6 md:h-[308px] md:gap-8 xl:gap-10">
        <p className="text-center text-xs md:text-sm xl:text-base">
          شما در حال حاضر اشتراک فعالی ندارید.
        </p>
        <LinkButton color="primary" variation="link" href="/plans">
          خرید اشتراک
        </LinkButton>
      </Container>
    </div>
  );
}

export default Page;
