import { FieldValues } from "react-hook-form";
import { User } from "./userTypes";
import { Message, Status } from "./globalTypes";

// Payloads

export interface RegisterPayload extends FieldValues {
  email: string;
}

export interface RegisterVerificationPayload extends FieldValues {
  verificationNumber: string;
  email: string;
}

export interface LoginPayload extends FieldValues {
  email: User["email"];
  oneTimePassword: boolean;
  password: User["password"];
}

export interface LoginResponse extends Status {
  token: string;
  data: User;
}

export interface OTPLoginPayload extends FieldValues {
  email: User["email"];
  oneTimePassword: boolean;
}

export type OTPLoginVerificationPayload = RegisterVerificationPayload;

// Response Data

export interface RegisterResponseData extends Status, Message {
  email: User["email"];
}

export interface RegisterVerificationResponseData extends Status {
  token: string;
  data: User;
}

export interface OTPLoginResponseData extends Status, Message {
  email: string;
}

export interface OTPLoginVerificationResponseData extends Status {
  token: string;
  data: User;
}

export type RegisterError = RegisterResponseData;

export interface IForgetPasswordResponse extends Status, Message {}

export interface IForgetPasswordPayload extends FieldValues {
  email: string;
}

export interface IForgetPasswordVerifyPayload extends FieldValues {
  email: string;
  verificationNumber: string;
}

export interface IForgetPasswordVerifyResponse extends Status, Message {
  resetId: string;
}

export interface IResetPasswordPayload extends FieldValues {
  resetId: string;
  password: string;
}

export interface IResetPasswordResponse extends Status {
  token: string;
  data: {
    user: User;
  };
}
