import words from 'lodash/words';
import { getMovies, searchMovies, getPlayingMovies } from 'SERVICES';

/**
 * Get image src URL for TMDB or the default img
 * @param {String} end
 */
export const getImageUrl = (end) => {
  return end
    ? `https://image.tmdb.org/t/p/w370_and_h556_bestv2${end}`
    : '/default-poster.jpg';
};

/**
 * Get Shortened description with max words.
 * @param {String} text - Original description
 * @param {Int} count - The max number of words
 */
export const getExcerpt = (text, count) => {
  const excerptArray = words(text).slice(0, count);
  const excerpt = excerptArray.join(' ');
  return `${excerpt} ...`;
};

/**
 * Get the smallest sized Image (Good use case for lazy loading)
 * @param {Array} paths - Path URLs
 */
export const getSmallestImage = (paths) => paths.reduce((prev, curr) => (
  prev.width < curr.width ? prev : curr
));

/**
 * Get the largest sized Image (Good use case for lazy loading)
 * @param {Array} paths - Path URLs
 */
export const getLargestImage = (paths) => paths.reduce((prev, curr) => (
  prev.width > curr.width ? prev : curr
));

/**
 * Get the highest voted Image
 * @param {Array} paths - Path URLs
 */
export const getHighestVotedImage = (paths) => paths.reduce((prev, curr) => (
  prev.vote_count > curr.vote_count ? prev : curr
));

/**
 * Returns a query string for Movie API
 * @param {Object} params
 */
export const generateQueryString = (params = {}) => {
  // Return null if we don't have any params
  if (params.length === 0) return null;
  // Generate the string from the params:
  const queryString = Object.keys(params)
    .filter((key) => Boolean(params[key]))
    .map((key) => (`${key}=${encodeURI(params[key])}`))
    .filter(Boolean)
    .join('&');
  return `?${queryString}`;
};

/**
 * There are different API EndPoints depending on the search.
 * This picks the right one.
 * @param {Object} params
 *
 * @returns {Function}
 */
export const pickCorrectEndpoint = (params = {}) => {
  if (params.search) {
    return searchMovies;
  }
  if (typeof params.playing === 'string') {
    return getPlayingMovies;
  }
  return getMovies;
};
