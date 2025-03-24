import { ISubscription } from "@/app/_types/subscriptionTypes";
import { subscriptionOptions } from "@/app/_utils/constants";
import { calcSubExpireDay, numericJalaaliDate } from "@/app/_utils/helpers";
import { getCurrentSubscription } from "@/app/api/subscriptionApi";

async function ActiveSubscription() {
  const currentSubscription = await getCurrentSubscription();

  return (
    <div className="rounded-b-xl bg-white text-xs leading-5 md:text-sm md:leading-6">
      <div
        style={{
          background:
            "linear-gradient(90deg, rgb(199, 199, 199) 0%, rgb(238, 238, 238) 48.44%, rgb(199, 199, 199) 100%)",
        }}
        className="py-1 text-center font-medium leading-5 xsm:rounded-t-xl"
      >
        {
          subscriptionOptions.find(
            (el) => el.month === (currentSubscription as ISubscription).months,
          )?.expirationDate
        }
      </div>
      <div className="flex flex-col gap-3 px-4 pb-4 pt-4 xsm:px-6 xsm:pt-4 md:px-7">
        <Row
          title="تاریخ شروع"
          value={numericJalaaliDate(
            (currentSubscription as ISubscription).createdAt,
          )}
        />
        <Row
          title="تاریخ پایان"
          value={numericJalaaliDate(
            (currentSubscription as ISubscription).expiresAt,
          )}
        />
        <Row
          title="روز های باقی مانده"
          value={`${calcSubExpireDay(
            (currentSubscription as ISubscription).expiresAt,
          )} روز`}
        />
      </div>
    </div>
  );
}

function Row({ title, value }: { title: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs leading-5 md:text-sm md:leading-6">
      <span className="text-gray-700">{title}:</span>
      <span className="text-black">{value}</span>
    </div>
  );
}

export default ActiveSubscription;
