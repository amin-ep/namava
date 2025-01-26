import { FieldValues, Message, Status } from "./globalTypes";
import { User } from "./userTypes";

// Update Email
export interface UpdateEmailPayload extends FieldValues {
  email: Required<User["email"]>;
  verificationNumber: string;
}

export interface UpdateEmailResponse extends Status {
  data: {
    user: User;
  };
}
// ***

// Update Email Request
export interface UpdateEmailRequestPayload extends FieldValues {
  email: Required<User["email"]>;
}

export interface UpdateEmailRequestResponse extends Status, Message {}
// ***

// OTPUpdateEmailVerify
export interface OtpUpdateEmailVerifyPayload extends FieldValues {
  verificationNumber: string;
}

export interface OtpUpdateEmailVerifyResponse extends Status, Message {}
// ***
