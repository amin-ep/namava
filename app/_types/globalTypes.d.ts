export type NavMenuItem = { title: string; href: string };

export interface Status {
  status: string;
}

export interface Message {
  message: string;
}

export interface MobileNavListItem {
  title: string;
  href: string;
  icon?: React.ReactNode;
  iconPath?: string;
  activeIconPath?: string;
}

export interface LinkField {
  title: string;
  href: string;
}

export interface ApiError extends Status, Message {}

export type FormActionPreviousState =
  | null
  | {
      status: string;
      message?: string;
      statusCode?: number;
      values?: T;
    }
  | undefined;
