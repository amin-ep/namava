import React from "react";
import Container from "../_components/Container";
import { getMySubscriptions } from "@/app/api/subscriptionApi";
import { ISubscription } from "@/app/_types/subscriptionTypes";
import OrdersTable from "./_components/OrdersTable";
import EmptySubscriptions from "./_components/EmptySubscriptions";

export const metadata = {
  title: "لیست سفارشات",
};

async function Page() {
  const subscriptions = (await getMySubscriptions()) as ISubscription[];

  return (
    <div className="min-h-screen">
      {subscriptions.length > 0 ? (
        <OrdersTable subscriptions={subscriptions} />
      ) : (
        <Container hasPadding={false}>
          <EmptySubscriptions />
        </Container>
      )}
    </div>
  );
}

export default Page;
