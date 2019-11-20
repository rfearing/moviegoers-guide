/* eslint-disable camelcase */
import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { getImageUrl, getExcerpt } from 'BASE/utils';
import style from './style.scss';

const Movie = ({ movie }) => {
  const {
    title,
    poster_path,
    id,
    // backdrop_path,
    vote_average,
    overview,
  } = movie;

  const poster = getImageUrl(poster_path);
  const excerpt = getExcerpt(overview, 30);
  const vote = vote_average * 10;
  let circleColor;

  // Passing or Failing colors
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
      <text
        className={style.percent}
        fill="#FFF"
        x={vote === 100 ? '16%' : '25%'}
        y="65%"
      >
        {vote > 0 ? vote : 'NR'}
      </text>
    </svg>
  );

  return (
    <div className={style.movieItem}>
      <div className={style.poster}>
        <img src={poster} alt={`Movie poster for ${title}`} />
      </div>
      <div className={style.content}>
        {circle}
        <h5 className="clearfix">{title}</h5>
        <p>{excerpt}</p>
      </div>
      <div className={style.info}>
        <hr />
        <p className="text-right">
          <Link href={`/movie/${id}`}>
            <a>Learn more</a>
          </Link>
        </p>
      </div>

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
