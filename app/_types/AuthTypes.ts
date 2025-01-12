import { FieldValues } from "react-hook-form";
import { User } from "./UserTypes";
import { Message, Status } from "./GlobalTypes";

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
