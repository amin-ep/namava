import { IActor } from "./actorTypes";
import { Status } from "./globalTypes";

export interface IMovie {
  _id: string;
  name: string;
  englishName: string;
  duration: number;
  isFree?: boolean;
  ageLimit: number;
  genres: string[];
  actors?: {
    actorId: {
      _id: string;
      name: IActor["name"];
      imageUrl: IActor["imageUrl"];
      id: string;
    };
    isStar?: boolean;
  }[];
  bannerImageUrl: string;
  images?: string[];
  description?: string;
  //   directors: Types.ObjectId[];
  countries: string[];
  about: string;
  hasSubtitle?: boolean;
  imdbRating?: number;
  releaseYear: number;
  posterUrl: string;
  videoUrl: string;
  exclusiveDubbed?: boolean;
  logoImageUrl?: string;
  slug: string;
}

export interface IGetMoviesResponse extends Status {
  result: number;
  data: {
    docs: IMovie[];
  };
}

export interface IGetMoviesBasedOnGenresResponse extends Status {
  result: number;
  data: IMovie[];
}
