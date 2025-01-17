import { FieldValues } from "react-hook-form";
import { Status } from "./GlobalTypes";

export type User = {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  role: "admin" | "user" | string;
  verified: boolean;
  active: boolean;
  province?: string;
  gender?: string;
  birthDate?: string | Date;
  phoneNumber?: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface GetUserResponseData extends Status {
  data: {
    document: User;
  };
}

export interface UpdateMePayload extends FieldValues {
  firstName?: string;
  lastName?: string;
  province?: string;
  gender?: "male" | "female" | string;
  birthDate?: string | Date;
}

export interface UpdateMeResponseData extends Status {
  data: {
    user: User;
  };
}
