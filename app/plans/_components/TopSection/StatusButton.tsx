"use client";

import { useState } from "react";
import UserSubscriptionPopover from "./UserSubscriptionPopover";

function StatusButton() {
  const [showStatus, setShowStatus] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowStatus((s) => !s)}
        className="cursor-pointer text-xs font-semibold text-primary-default xsm:text-sm"
      >
        مشاهده وضعیت
      </button>
      {showStatus && (
        <UserSubscriptionPopover close={() => setShowStatus(false)} />
      )}
    </>
  );
}

export default StatusButton;
