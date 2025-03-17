import {
  IGetMovieByIdResponse,
  IGetMovieBySlugResponse,
  IGetMoviesBasedOnGenresResponse,
  IGetMoviesResponse,
  IMovie,
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
      params: {
        sort: "+createdAt",
      },
    });

    if (res.data.status === "success") {
      return res.data.data.docs;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function getMoviesByDoubleGenreName(
  first: string,
  second: string,
) {
  try {
    const res = await apiRequest<IGetMoviesBasedOnGenresResponse>({
      method: "GET",
      contentType: "application/json",
      url: `/movie?genres=${first},${second}`,
      authorization: false,
      params: {
        sort: "+createdAt",
      },
    });

    if (res.status === 200) {
      return res.data.data.docs;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function getMovieBySlug(slug: IMovie["slug"]) {
  try {
    const res = await apiRequest<IGetMovieBySlugResponse>({
      method: "GET",
      contentType: "application/json",
      url: `/movie/slug/${slug}`,
    });

    if (res.data.status === "success") {
      return res.data.data;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}

export async function getMovieById(id: string) {
  try {
    const res = await apiRequest<IGetMovieByIdResponse>({
      contentType: "application/json",
      method: "GET",
      url: `/movie/${id}`,
    });

    if (res.status === 200) {
      return res.data.data.document;
    }
  } catch (err) {
    return handleServerActionError(err);
  }
}
