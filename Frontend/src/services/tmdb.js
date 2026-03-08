import axios from "axios";

const tmdb = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
});

export const getTrending = (mediaType = "all", timeWindow = "day") =>
  tmdb.get(`/trending/${mediaType}/${timeWindow}`);

export const getPopularMovies = (page = 1) =>
  tmdb.get("/movie/popular", { params: { page } });

export const getPopularTVShows = (page = 1) =>
  tmdb.get("/tv/popular", { params: { page } });

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`);

export const getMovieVideos = (id) =>
  tmdb.get(`/movie/${id}/videos`);

export const searchMulti = (query, page = 1) =>
  tmdb.get("/search/multi", { params: { query, page } });

export const getTVDetails = (id) =>
  tmdb.get(`/tv/${id}`);

export const getTVVideos = (id) =>
  tmdb.get(`/tv/${id}/videos`);

export const getTVCredits = (id) =>
  tmdb.get(`/tv/${id}/credits`);

export const getMovieGenres = () =>
  tmdb.get("/genre/movie/list");

export const getTVGenres = () =>
  tmdb.get("/genre/tv/list");

export const getMoviesByGenre = (genreId, page = 1) =>
  tmdb.get("/discover/movie", { params: { with_genres: genreId, page } });

export const getTVByGenre = (genreId, page = 1) =>
  tmdb.get("/discover/tv", { params: { with_genres: genreId, page } });

export const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const TMDB_BACKDROP_BASE = "https://image.tmdb.org/t/p/original";