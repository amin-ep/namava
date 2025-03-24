import React from "react";
import TopSection from "./_components/TopSection/TopSection";
import BannerImage from "./_components/BannerImage";
import SubCard from "./_components/SubCard/SubCard";
import { subscriptionOptions } from "../_utils/constants";
import { getMySubscriptions } from "../api/subscriptionApi";
import { ISubscription } from "../_types/subscriptionTypes";
import Container from "./_components/Container";

async function Page() {
  const subscriptions = await getMySubscriptions();
  return (
    <div className="bg-gray-100">
      <TopSection />
      <Container>
        <BannerImage />
        <h1 className="mb-5 text-center text-sm font-semibold leading-6 text-gray-700 md:mb-6 md:text-[20px] md:leading-6">
          اشتراک ماهانه
        </h1>
        {subscriptionOptions.map((subOption) => (
          <SubCard
            subOption={subOption}
            key={subOption.price}
            hadSubscriptionBefore={
              (subscriptions as ISubscription[]).length > 0
            }
          />
        ))}
      </Container>
    </div>
  );
}

export default Page;
