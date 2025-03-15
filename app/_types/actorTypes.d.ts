import { Status } from "./globalTypes";
import { IMovie } from "./movieTypes";

export interface IActor {
  _id: string;
  name: string;
  biography: string;
  imageUrl: string;
  movies: IMovie[];
}

export interface IGetActorByIdResponse extends Status {
  data: {
    actor: IActor;
  };
}
