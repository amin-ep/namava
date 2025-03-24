import cls from "classnames";
import { cookies } from "next/headers";
import Container from "../_components/Container";
import ActiveSubscription from "./_components/ActiveSubscription";
import BuySubscriptionSection from "./_components/BuySubscriptionSection";

export const metadata = {
  title: "وضعیت اشتراک",
};

async function Page() {
  const subscriptionKey = await (
    await cookies()
  ).get(process.env.SUBSCRIPTION_KEY as string)?.value;

  return (
    <div className="min-h-screen">
      {subscriptionKey && (
        <div className="flex w-full items-center justify-center">
          <span className="mx-0 mb-3 mt-4 text-center xsm:mb-4 xsm:mt-5 md:mt-0">
            اشتراک فعال
          </span>
        </div>
      )}
      <Container
        className={cls(
          !subscriptionKey
            ? "flex h-64 flex-col items-center justify-center gap-6 md:h-[308px] md:gap-8 xl:gap-10"
            : "",
        )}
        hasPadding={false}
      >
        {!subscriptionKey ? <BuySubscriptionSection /> : <ActiveSubscription />}
      </Container>
    </div>
  );
}

export default Page;
