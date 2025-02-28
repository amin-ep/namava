import { Status } from "./globalTypes";

export interface IReaction {
  value: "like" | "dislike";
  movie: string;
  user: string;
}

export interface IToggleReactionResponse extends Status {
  data: IReaction;
}

export type ToggleReactionPayload = Pick<IReaction>;
