"use client";

import { useOutsideClick } from "@/app/_hooks/useOutsideClick";
import { User } from "@/app/_types/userTypes";
import { getMe } from "@/app/api/userApi";
import { useQuery } from "@tanstack/react-query";

type Props = { close: () => void };

function UserSubscriptionPopover({ close }: Props) {
  const { data: userData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
  });

  const ref = useOutsideClick(close);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="absolute left-1 top-14 min-w-64 rounded-xl bg-white px-2.5 py-5 shadow-[0_-3px_10px_0_rgba(0,0,0,0.16)] md:top-[66px]"
    >
      <Row>
        <span>{(userData as User)?.firstName || "-"}</span>{" "}
        <span>{(userData as User)?.lastName || "-"}</span>
      </Row>
      <Row>
        <span className="font-bold">وضعیت اشتراک: </span>
        <span className="text-red-default">غیر فعال</span>
      </Row>
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div className="px-2 py-1.5 text-sm">{children}</div>;
}

export default UserSubscriptionPopover;
