import { FieldValues } from "react-hook-form";
import { Status } from "./globalTypes";
import { User } from "./userTypes";
import { IReaction } from "./reactionTypes";

export interface IComment {
  _id: string;
  text: string;
  user: {
    _id: string;
    email: User["email"];
  };
  movie: string;
  spoils: boolean;
  reactions: IReaction[];
  likeQuantity: number;
  dislikeQuantity: number;
  createdAt: Date | string;
}

export interface IGetCommentResponse extends Status {
  result: number;
  data: {
    docs: IComment[];
  };
}

export interface ICreateCommentPayload extends FieldValues {
  text: string;
  spoils: boolean;
  movie: string;
}

export interface ICreateCommentResponse extends Status {
  data: {
    document: IComment;
  };
}
