import { FieldValues } from "react-hook-form";
import { IMovie } from "./movieTypes";
import { Message, Status } from "./globalTypes";

export interface IPlaylist {
  _id: string;
  title: string;
  movies: IMovie[];
  user: string;
}

export interface ICreatePlaylistPayload extends FieldValues {
  title: string;
  movies: string[];
}

export interface ICreatePlaylistResponse extends Status {
  data: {
    document: IPlaylist[];
  };
}

export interface IGetCurrentUserPlaylist extends Status {
  data: IPlaylist[];
}

export interface IAddMovieToListResponse extends Status, Message {
  data: {
    document: IPlaylist;
  };
}

export interface IGetPlaylistByIdResponse extends Status {
  data: {
    document: IPlaylist;
  };
}
