import PaymentSummary from "@/app/_components/PaymentSummary";
import { subscriptionOptions } from "@/app/_utils/constants";
import { Params } from "next/dist/server/request/params";
import SuccessCard from "./_components/SuccessCard";
import TopSection from "./_components/TopSection";

async function Page({ params }: { params: Params }) {
  const key = (await params).key;
  const boughtSub = subscriptionOptions.find((el) => el.key == key);
  return (
    <div className="bg-gray-100">
      <TopSection />
      <div className="mx-auto w-80 pt-5 xsm:w-[452px] xsm:pb-[60px] md:w-[680px] md:pt-8 xl:pb-20">
        <SuccessCard expirationDate={boughtSub?.expirationDate as string} />
        <PaymentSummary status="payed" subKey={key as string} />
      </div>
    </div>
  );
}

export default Page;
