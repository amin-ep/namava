import { ReactNode } from "react";

export type NavMenuItem = { title: string; href: string };

export interface Status {
  status: string;
}

export interface Message {
  message: string;
}

export interface FieldValues {
  [key: string]: string;
}

export interface MobileNavListItem {
  title: string;
  href: string;
  icon: ReactNode;
}