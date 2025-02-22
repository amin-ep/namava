import {
  IGetMoviesBasedOnGenresResponse,
  IGetMoviesResponse,
} from "../_types/movieTypes";
import { apiRequest, handleServerActionError } from ".";

export async function getAllMovies() {
  try {
    const res = await apiRequest<IGetMoviesResponse>({
      method: "GET",
      contentType: "application/json",
      url: "/movie",
    });
    if (res.data.status === "success") {
      return res.data.data.docs;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function getNewestMovies() {
  try {
    const res = await apiRequest<IGetMoviesResponse>({
      method: "GET",
      contentType: "application/json",
      url: "/movie/",
      params: {
        limit: "5",
        fields:
          "logoImageUrl,bannerImageUrl,duration,name,ageLimit,actors,releaseYear,isFree,slug,posterUrl,imdbRating,videoUrl",
        sort: "-createdAt",
      },
    });

    if (res?.data.status === "success") {
      return res.data.data.docs;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function getMoviesByGenre(genre: string) {
  try {
    const res = await apiRequest<IGetMoviesBasedOnGenresResponse>({
      method: "GET",
      contentType: "application/json",
      url: `/movie?genres=${genre}`,
      authorization: false,
    });

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
