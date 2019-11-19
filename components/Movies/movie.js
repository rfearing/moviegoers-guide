/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from 'BASE/utils';
import style from './style.scss';

const Movie = ({ movie }) => {
  const {
    title,
    poster_path,
    // id,
    // backdrop_path,
    vote_average,
    overview,
  } = movie;

  const poster = getImageUrl(poster_path);
  // const backdrop = getImageUrl(backdrop_path);
  const vote = vote_average * 10;
  let circleColor;
  if (vote >= 70) {
    circleColor = 'green';
  } else if (vote >= 40) {
    circleColor = 'yellow';
  } else if (vote > 0) {
    circleColor = 'red';
  }

  const circle = (
    <svg viewBox="0 0 36 36" className={style.chart}>
      <path
        className={`${style.circle} ${circleColor}`}
        strokeDasharray={`${vote}, 100`}
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
      />
      <text className={style.percent} fill="#FFF" x="30%" y="60%">{vote > 0 ? vote : 'NR'}</text>
    </svg>
  );

  return (
    <div className="jumbotron">
      <img src={poster} />
      <h4>{title}</h4>
      <p>{overview}</p>
      {circle}
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
    backdrop_path: PropTypes.string,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
  }).isRequired,
};

export default Movie;
