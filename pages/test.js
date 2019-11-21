/* eslint-disable object-curly-newline */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home, { noMoviesText } from '.';

const movieList = [
  { poster_path: '...', backdrop_path: '...', title: 'Test Movie One', overview: 'Lorem Ipsem', id: 1 },
  { poster_path: '...', backdrop_path: '...', title: 'Test Movie Two', overview: 'Lorem Ipsem Dorum', id: 2 },
];

test('Renders a list of movies when past in an array of movies', () => {
  const { getByText } = render(<Home movies={movieList} />);
  expect(getByText(movieList[0].title)).toBeInTheDocument();
});

test('Renders no movies text if none are returned from API', () => {
  const { getByText } = render(<Home movies={[]} />);
  expect(getByText(noMoviesText)).toBeInTheDocument();
});
