import React from 'react';
import PropTypes from 'prop-types';
import style from './style.scss';
import Movie from './movie';

export const noMoviesText = 'Oh No! We could\'t find any movies!';

/**
 * Map over an array of movies. If no movies are found, return text.
 */
const MoviesList = ({
  movies,
}) => {
  let moviesList = movies.map((movie) => (
    <Movie movie={movie} />
  ));

  if (!movies || movies.length === 0) {
    moviesList = <p>{noMoviesText}</p>;
  }

  return (
    <ul className={style.list}>
      {moviesList}
    </ul>
  );
};

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

MoviesList.defaultProps = {
  movies: [],
};

export default MoviesList;
