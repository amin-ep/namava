import { Params } from "next/dist/server/request/params";
import Image from "next/image";
import Link from "next/link";
import Container from "../_components/Container";
import PaymentSummary from "./_components/PaymentSummary";

async function Page({ params }: { params: Params }) {
  const key = (await params).key;

  return (
    <div className="bg-gray-100">
      <section className="h-[60px] bg-white px-5 xsm:px-6 md:bg-transparent md:px-8">
        <Link
          href="/plans"
          className="float-right flex h-full items-center justify-center md:hidden"
        >
          <Image
            src="/icons/chevron-right-gray.svg"
            alt="chevron-right"
            width={30}
            height={40}
          />
        </Link>
        <Link
          href="/"
          className="float-right hidden h-full items-center justify-center md:flex"
        >
          <Image src="/logo-primary.svg" alt="namava" width={65} height={40} />
        </Link>
      </section>
      <h1 className="mb-6 mt-3 text-center text-base font-semibold text-black md:mb-8 md:mt-2 md:text-lg xl:mb-8 xl:mt-2 xl:text-xl">
        تکمیل خرید
      </h1>
      <Container>
        <PaymentSummary subKey={key as string} />
      </Container>
    </div>
  );
}

export default Page;
