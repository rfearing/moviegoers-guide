import words from 'lodash/words';

export const getImageUrl = (end) => `https://image.tmdb.org/t/p/w370_and_h556_bestv2${end}`;

export const getExcerpt = (text, count) => {
  const excerptArray = words(text).slice(0, count);
  const excerpt = excerptArray.join(' ');
  return `${excerpt} ...`;
}

export const getSmallestImage = (paths) => paths.reduce((prev, curr) => (
  prev.width < curr.width ? prev : curr
));

export const getLargestImage = (paths) => paths.reduce((prev, curr) => (
  prev.width > curr.width ? prev : curr
));

export const getHighestVotedImage = (paths) => paths.reduce((prev, curr) => (
  prev.vote_count > curr.vote_count ? prev : curr
));
