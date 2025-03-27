import { Status } from "./globalTypes";
import { User } from "./userTypes";

export interface ISubscription {
  user: User;
  price: number;
  expiresAt: Date | string;
  months: number;
  subCode: number;
  _id: string;
  createdAt: Date;
  tax: number;
  discount?: number;
}

export type SubscriptionOption = {
  price: number;
  expirationDate: string;
  discountPercentage: number;
  key: string;
  month: number;
};

export interface IGetMySubscriptionResponse extends Status {
  data: ISubscription[];
}

export interface IPaySubscriptionResponse extends Status {
  data: {
    document: ISubscription;
  };
}

export interface IPaySubscriptionPayload {
  price: number;
  months: number;
  discount?: number;
  tax: number;
}

export interface IGetCurrentSubscriptionResponse extends Status {
  data: {
    document: ISubscription;
  };
}

export interface IGetSubscriptionByIdResponse extends Status {
  data: {
    document: ISubscription;
  };
}
