"use client";

import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import FormControl from "./FormControl";
import FormSubmit from "./FormSubmit";
import MainLink from "./MainLink";

function FormLayout({
  children,
  icon,
  heading,
  headerLink,
  description,
  action,
}: {
  children: ReactNode;
  icon?: ReactNode;
  heading?: string;
  headerLink?: { title: string; href: string };
  description?: string;
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
            <MainLink
              href={headerLink.href}
              extraStyles="absolute left-0 flex h-10 items-center"
              boldLevel="semibold"
            >
              {headerLink.title}
            </MainLink>
          )}
        </div>
        <div className="flex flex-col gap-6">
          {heading && icon && (
            <h1 className="flex items-center gap-3">
              <span
                className={`${
                  headerLink?.href === "login" && "bg-sky-100"
                } flex aspect-square w-8 items-center justify-center rounded-full`}
              >
                {icon}
              </span>

              <span className="text-sm font-bold text-gray-950 xsm:text-base">
                {heading}
              </span>
            </h1>
          )}
          <p className="mb-6 text-xs font-normal text-gray-600 md:text-base">
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
    <div className="flex flex-col gap-8 text-center text-sm text-gray-800">
      {children}
    </div>
  );
}

function ExtraLink({ children, href }: { children: ReactNode; href: string }) {
  return <MainLink href={href}>{children}</MainLink>;
}

function ExtraButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className="text-xs text-primary-default md:text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

FormLayout.Control = FormControl;
FormLayout.Submit = FormSubmit;
FormLayout.Footer = Footer;
FormLayout.ExtraLink = ExtraLink;
FormLayout.ExtraButton = ExtraButton;

export default FormLayout;
