/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    Authorization: `Bearer ${process.env.MOVIE_ACCESS_TOKEN}`,
    Accept: 'application/json;charset=utf-8',
  },
});

export const getMovies = (query = '') => (
  API.get(`https://api.themoviedb.org/4/discover/movie${query}`)
    .then((response) => {
      if (response.status === 200) {
        return response.data;
      }
      throw new Error(`${response.status}: ${response.statusText}`);
    })
);
