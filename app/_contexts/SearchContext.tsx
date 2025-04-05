"use client";

import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { IGetMoviesResponse, IMovie } from "../_types/movieTypes";
import {
  API_BASE_URL,
  englishLetters,
  persianLetters,
} from "../_utils/constants";

type FilterMode = "onChange" | "onClick";

export type SortBy = "imdbRating" | "newest" | "oldest" | "none";

type Filters = {
  genres?: string[];
  countries?: string[];
  releasedYear: { from: number; to: number };
  sortBy: SortBy;
};

interface IContext {
  modalIsOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleReleasedYearUntil: (year: number) => void;
  handleReleasedYearFrom: (year: number) => void;
  handleAddCountry: (country: string) => void;
  handleRemoveCountry: (country: string) => void;
  handleAddGenre: (genre: string) => void;
  handleRemoveGenre: (genre: string) => void;
  handleSortBy: (sortBy: SortBy) => void;
  filterMode: FilterMode;
  movies: null | IMovie[] | string;
  filters: Filters;
  handleSearch: (e: React.ChangeEvent) => void;
  resetSearch: () => void;
  reset: () => void;
  filterInitialValues: Filters;
  hasFiltered: boolean;
  submitFilters: () => void;
}

async function getMovies() {
  try {
    const res: AxiosResponse<IGetMoviesResponse> = await axios.get(
      `${API_BASE_URL}/movie`,
    );
    if (res.status === 200) {
      return res?.data?.data.docs as IMovie[];
    }
  } catch (err) {
    const error = err as AxiosError<ApiError>;
    console.log(error.response?.data.message);
  }
}

const SearchContext = createContext({
  modalIsOpen: false,
  closeModal() {},
  openModal() {},
  filterMode: "onClick",
  movies: null,
  filters: {
    countries: [],
    genres: [],
    releasedYear: { from: 1900, to: new Date().getFullYear() },
    sortBy: "none",
  },
  handleSearch() {},
  resetSearch() {},
  handleAddCountry() {},
  handleRemoveCountry() {},
  handleAddGenre() {},
  handleRemoveGenre() {},
  handleReleasedYearFrom() {},
  handleReleasedYearUntil() {},
  handleSortBy() {},
  reset() {},
  hasFiltered: false,
  filterInitialValues: {
    countries: [],
    genres: [],
    releasedYear: { from: 1900, to: new Date().getFullYear() },
    sortBy: "none",
  },
  submitFilters() {},
} as IContext);

interface IState {
  filterMode: FilterMode;
  movies: null | IMovie[];
  filters: Filters;
}

type Actions =
  | { type: "movies"; payload: IState["movies"] }
  | { type: "filterMode"; payload: IState["filterMode"] }
  | { type: "untilYear"; payload: number }
  | { type: "fromYear"; payload: number }
  | { type: "addCountry"; payload: string }
  | { type: "removeCountry"; payload: string }
  | { type: "addGenre"; payload: string }
  | { type: "removeGenre"; payload: string }
  | { type: "sortBy"; payload: SortBy }
  | { type: "reset" }
  | { type: "submitFilter"; payload: Filters };

const initialState: IState = {
  movies: null,
  filterMode: "onClick",
  filters: {
    countries: [],
    genres: [],
    releasedYear: { from: 1900, to: new Date().getFullYear() },
    sortBy: "none",
  },
};

const reducer = (state: IState, action: Actions) => {
  switch (action.type) {
    case "movies":
      return { ...state, movies: action.payload as IMovie[] };

    case "addCountry":
      return {
        ...state,
        filters: {
          ...state.filters,
          countries: [...(state.filters.countries as string[]), action.payload],
        },
      };

    case "submitFilter":
      return { ...state, filters: action.payload };

    case "removeCountry":
      return {
        ...state,
        filters: {
          ...state.filters,
          countries: state.filters.countries?.filter(
            (country) => country !== action.payload,
          ),
        },
      };
    case "addGenre":
      return {
        ...state,
        filters: {
          ...state.filters,
          genres: [...(state.filters.genres as string[]), action.payload],
        },
      };

    case "removeGenre":
      return {
        ...state,
        filters: {
          ...state.filters,
          genres: state.filters.genres?.filter(
            (genre) => genre !== action.payload,
          ),
        },
      };

    case "fromYear":
      return {
        ...state,
        filters: {
          ...state.filters,
          releasedYear: { ...state.filters.releasedYear, from: action.payload },
        },
      };

    case "untilYear":
      return {
        ...state,
        filters: {
          ...state.filters,
          releasedYear: { ...state.filters.releasedYear, to: action.payload },
        },
      };

    case "sortBy":
      return {
        ...state,
        filters: { ...state.filters, sortBy: action.payload },
      };

    case "filterMode":
      return { ...state, filterMode: action.payload as IState["filterMode"] };

    case "reset":
      return { ...state, filters: initialState.filters };

    default:
      throw new Error("Unknown action type");
  }
};

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasFiltered, setHasFiltered] = useState(false);
  const [filterInitialValues, setFilterInitialValues] = useState<Filters>(
    initialState.filters,
  );
  const [{ filters, movies, filterMode }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const { data: moviesData } = useQuery({
    queryKey: ["movies"],
    queryFn: getMovies,
  });

  // open modal
  const handleOpenModal = () => setModalIsOpen(true);

  // close modal
  const handleCloseModal = () => setModalIsOpen(false);

  function handleSearchChange(e: React.ChangeEvent) {
    const target = e.target as HTMLInputElement;
    setSearchTerm(target.value);
  }

  useEffect(() => {
    // toggle document scroll if modal is changing
    if (document) {
      if (modalIsOpen) {
        document.body.style.overflowY = "hidden";
      } else {
        document.body.style.overflowY = "auto";
      }
    }

    // close modal if window.innerWidth is equal or less than 800 while resizing window
    function handleModalOnResize() {
      if (window.innerWidth < 800) {
        dispatch({ type: "filterMode", payload: "onClick" });
      } else if (window.innerWidth >= 800) {
        if (modalIsOpen) setModalIsOpen(false);
        dispatch({ type: "filterMode", payload: "onChange" });
      }
    }

    window.addEventListener("resize", handleModalOnResize);
    handleModalOnResize();
    return () => window.removeEventListener("resize", handleModalOnResize);
  }, [modalIsOpen]);

  useEffect(() => {
    if (moviesData) {
      let filteredMovies: IMovie[] = [];
      // handle has filtered or not

      if (
        filters.countries?.length === 0 &&
        filters.genres?.length === 0 &&
        filters.releasedYear.from === 1900 &&
        filters.releasedYear.to === new Date().getFullYear() &&
        filters.sortBy === "none" &&
        searchTerm.trim().length === 0
      ) {
        // set empty if there is no filter for movies
        filteredMovies = [];
        setHasFiltered(false);
      } else {
        filteredMovies = moviesData;
        setHasFiltered(true);
        // search movies
        if (searchTerm.length > 0) {
          // search on persian language
          const hasPersianLetter = persianLetters.some((val) =>
            searchTerm.includes(val),
          );
          // search on english language
          const hasEnglishLetter = englishLetters.some((val) =>
            searchTerm.includes(val),
          );

          if (hasEnglishLetter && hasPersianLetter) {
            // if search contains both languages return empty array
            filteredMovies = [];
          } else if (hasPersianLetter) {
            // return movies based on persian name
            filteredMovies = moviesData.filter((movie) =>
              movie.name.trim().includes(searchTerm),
            );
          } else if (hasEnglishLetter) {
            // return movies based on english name
            filteredMovies =
              moviesData.filter((movie) =>
                movie.englishName.trim().toLowerCase().includes(searchTerm),
              ) ?? [];
          }
        }

        // countries filter
        if (filters.countries && filters.countries.length > 0) {
          filteredMovies = filteredMovies.filter((movie) =>
            movie.countries?.some((country) =>
              filters.countries?.includes(country),
            ),
          );
        }

        // genre filters
        if (filters.genres && filters.genres.length > 0) {
          filteredMovies = filteredMovies.filter((movie) =>
            movie.genres?.some((genre) => filters.genres?.includes(genre)),
          );
        }

        // released year from filters
        if (filters.releasedYear.from > 1900) {
          filteredMovies = filteredMovies.filter(
            (movie) => movie.releaseYear >= filters.releasedYear.from,
          );
        }

        // released year to filters
        if (filters.releasedYear.to <= 2025) {
          filteredMovies = filteredMovies.filter(
            (movie) => movie.releaseYear <= filters.releasedYear.to,
          );
        }

        // sort movies based on "imdb rating" or "newest" or "oldest"
        const sortByValue = filters.sortBy;
        if (sortByValue != "none") {
          // based on better imdb (asc)
          if (sortByValue == "imdbRating") {
            filteredMovies = filteredMovies.sort(
              (a, b) => (b.imdbRating as number) - (a.imdbRating as number),
            );
          }
          // based on oldest release year
          if (sortByValue == "oldest") {
            filteredMovies = filteredMovies.sort(
              (a, b) => a.releaseYear - b.releaseYear,
            );
          }

          // based on newest release year
          if (sortByValue == "newest") {
            filteredMovies = filteredMovies.sort(
              (a, b) => b.releaseYear - a.releaseYear,
            );
          }
        } else {
        }
      }
      dispatch({ type: "movies", payload: filteredMovies });
    }
  }, [moviesData, filters, searchTerm]);

  // handle sort
  function handleSortBy(sort: SortBy) {
    if (filterMode === "onChange") {
      dispatch({ type: "sortBy", payload: sort });
    } else if (filterMode === "onClick") {
      setFilterInitialValues({ ...filterInitialValues, sortBy: sort });
    }
  }

  // handle released year from year
  function handleReleasedYearFrom(year: number) {
    if (filterMode === "onChange") {
      dispatch({ type: "fromYear", payload: year });
    } else if (filterMode === "onClick") {
      setFilterInitialValues({
        ...filterInitialValues,
        releasedYear: { from: year, to: filterInitialValues.releasedYear.to },
      });
    }
  }

  // handle released year to year
  function handleReleasedYearUntil(year: number) {
    if (filterMode === "onChange")
      dispatch({ type: "untilYear", payload: year });

    setFilterInitialValues({
      ...filterInitialValues,
      releasedYear: { from: filterInitialValues.releasedYear.from, to: year },
    });
  }

  // handle add country
  function handleAddCountry(country: string) {
    if (filterMode === "onChange")
      dispatch({ type: "addCountry", payload: country });

    setFilterInitialValues({
      ...filterInitialValues,
      countries: [...(filterInitialValues.countries as string[]), country],
    });
  }

  // handle add genre
  function handleAddGenre(genre: string) {
    if (filterMode === "onChange")
      dispatch({ type: "addGenre", payload: genre });

    setFilterInitialValues({
      ...filterInitialValues,
      genres: [...(filterInitialValues.genres as string[]), genre],
    });
  }

  // handle remove genre
  function handleRemoveGenre(genre: string) {
    if (filterMode === "onChange")
      dispatch({ type: "removeGenre", payload: genre });

    setFilterInitialValues({
      ...filterInitialValues,
      genres: filterInitialValues.genres?.filter((g) => g !== genre),
    });
  }

  // handle remove country
  function handleRemoveCountry(country: string) {
    if (filterMode === "onChange")
      dispatch({ type: "removeCountry", payload: country });

    setFilterInitialValues({
      ...filterInitialValues,
      countries: filterInitialValues.countries?.filter((c) => c !== country),
    });
  }

  // handle reset
  function reset() {
    dispatch({ type: "reset" });
    setFilterInitialValues(initialState.filters);
  }

  function resetSearch() {
    setSearchTerm("");
  }

  // handle submit filters
  function handleSubmitFilter() {
    dispatch({ type: "submitFilter", payload: filterInitialValues });
  }

  return (
    <SearchContext
      value={{
        reset,
        closeModal: handleCloseModal,
        modalIsOpen,
        openModal: handleOpenModal,
        filterMode,
        movies,
        resetSearch,
        filters,
        handleSearch: handleSearchChange,
        handleSortBy,
        handleReleasedYearUntil,
        handleReleasedYearFrom,
        handleAddCountry,
        handleAddGenre,
        handleRemoveCountry,
        handleRemoveGenre,
        hasFiltered,
        filterInitialValues,
        submitFilters: handleSubmitFilter,
      }}
    >
      {children}
    </SearchContext>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("Context is used outside the provider");
  }

  return context;
};
