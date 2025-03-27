import { Params } from "next/dist/server/request/params";
import Container from "../../_components/Container";
import Details from "./_components/Details";

export const metadata = {
  title: "جزئیات سفارش",
};

async function Page({ params }: { params: Params }) {
  const id = (await params).id;

  return (
    <Container>
      <div className="flex items-center justify-center">
        <p className="mb-4 text-center text-xs font-medium leading-none xsm:mb-6 xsm:text-sm md:mb-6 md:text-base">
          جزئیات سفارش
        </p>
      </div>
      <Details id={id as string} />
    </Container>
  );
}

export default Page;
