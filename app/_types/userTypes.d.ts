import { FieldValues } from "react-hook-form";
import { Status } from "./globalTypes";

// User
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
  candidateEmail?: string;
  [key: string]: string;
};
// ***

// Get re response Data
export interface GetUserResponseData extends Status {
  data: {
    document: User;
  };
}
// ***

// Update me
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
// ***

// Change password
export interface ChangePasswordPayload extends FieldValues {
  password: string;
  currentPassword: string;
}

export type ChangePasswordResponse = GetUserResponseData;
// ***

// Set password
export interface SetPasswordPayload extends FieldValues {
  password: string;
}

export interface SetPasswordResponse extends Status {
  data: {
    user: User;
  };
}

// ***

export interface VerifyMePayload extends FieldValues {
  password: string;
}

export interface VerifyMeResponse extends Status {
  data: {
    user: User;
  };
}
