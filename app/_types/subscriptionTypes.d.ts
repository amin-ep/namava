import { Status } from "./globalTypes";
import { User } from "./userTypes";

export interface ISubscription {
  user: User;
  price: number;
  expiresAt: Date | string;
}

export type SubscriptionOption = {
  price: number;
  expirationDate: string;
  discountPercentage: number;
  key: string;
};

export interface IGetMySubscriptionResponse extends Status {
  data: ISubscription[];
}
