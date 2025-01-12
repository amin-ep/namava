"use client";

import Link from "next/link";

function Sidebar() {
  return (
    <aside className="flex w-full flex-col gap-4 bg-white shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]">
      <div>
        <h2>نام و نام خانوادگی</h2>
      </div>
      <ul className="flex flex-col">
        <li>
          <Link href="/" className="flex items-center justify-start">
            <span></span>
            <span></span>
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
