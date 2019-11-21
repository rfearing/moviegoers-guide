/* eslint-disable object-curly-newline */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MoviePage from '.';

const movie = {
  backdrop_path: '/test.jpg',
  genres: [
    { id: 14, name: 'Fantasy' },
    { id: 18, name: 'Drama' },
  ],
  overview: 'Lorem Ipsem',
  poster_path: '/example.jpg',
  title: 'Test Movie',
  release_date: '2019-03-06',
  revenue: 0,
  runtime: 808,
  vote_average: 10,
};

const images = {
  backdrops: [
    { vote_count: 1, file_path: '...' },
  ],
};

test('Renders a movie when passed in a movie object', () => {
  const { container } = render(<MoviePage movie={movie} images={images} />);
  expect(container.querySelector('h1')).toContainHTML(movie.title);
});
