"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import { FormControl } from "./FormControl";
import FormSubmit from "./FormSubmit";

function FormLayout({
  children,
  icon,
  heading,
  headerLink,
  description,
  action,
}: {
  children: ReactNode;
  icon: ReactNode;
  heading: string;
  headerLink?: { title: string; href: string };
  description: string;
  action: (payload: FormData) => void;
}) {
  return (
    <div className="mx-auto max-w-[500px] rounded-xl bg-white px-6 py-10 xsm:p-10 xsm:shadow-[0_0px_8px_0_rgba(0,0,0,0.2)] md:px-[70px]">
      <header className="flex flex-col gap-8">
        <div className="relative flex items-center justify-center py-5">
          <Link href="/">
            <Image src="/logo.svg" width={85} height={40} alt="Namava Logo" />
          </Link>
          {headerLink && (
            <Link
              href={headerLink.href}
              className="absolute left-0 flex h-10 items-center text-sm font-semibold text-primary"
            >
              {headerLink.title}
            </Link>
          )}
        </div>
        <div className="flex flex-col gap-6">
          <h1 className="flex items-center gap-3">
            <span
              className={`${
                headerLink?.href === "login" && "bg-sky-100"
              } flex aspect-square w-8 items-center justify-center rounded-full`}
            >
              {icon}
            </span>

            <span className="text-sm font-bold text-stone-950 xsm:text-base">
              {heading}
            </span>
          </h1>
          <p className="mb-6 text-xs font-normal text-stone-600 md:text-base">
            {description}
          </p>
        </div>
      </header>
      <form className="flex flex-col gap-6" action={action}>
        {children}
      </form>
    </div>
  );
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-8 text-center text-sm text-stone-900">
      {children}
    </div>
  );
}

function ExtraLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link href={href} className="text-primary">
      {children}
    </Link>
  );
}

FormLayout.Control = FormControl;
FormLayout.Submit = FormSubmit;
FormLayout.Footer = Footer;
FormLayout.ExtraLink = ExtraLink;

export default FormLayout;
