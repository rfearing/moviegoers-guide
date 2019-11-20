/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer ${process.env.MOVIE_ACCESS_TOKEN}`,
    Accept: 'application/json;charset=utf-8',
  },
});

export const getMovies = (query = '') => (
  API.get(`discover/movie${query}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const getMovie = (id = '') => (
  API.get(`movie/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);

export const getMovieImages = (id = '') => (
  API.get(`movie/${id}/images`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);
