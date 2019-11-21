import React from 'react';
import PropTypes from 'prop-types';
import { getImageUrl } from 'BASE/utils';
import style from './style.scss';

const Movie = ({
  movie: {
    release_date,
    vote_average,
    poster_path,
    overview,
    revenue,
    runtime,
    genres,
    title,
  },
}) => {
  const poster = getImageUrl(poster_path);
  const movieGenres = genres.map((genre) => genre.name).join(', ');
  const release = new Date(release_date).toDateString();

  return (
    <div className={style.movieBox}>
      <div className={style.poster}>
        <img src={poster} alt={`Movie poster for ${title}`} />
      </div>
      <div className={style.content}>
        <h1 className="clearfix">{title}</h1>
        <p>{overview}</p>
        {movieGenres && (
          <p>
            <b className="green-text">Genres: </b><br />
            {movieGenres}
          </p>
        )}
        <div className="row">
          <div className="col-md">
            <p>
              <b className="green-text">Release Date: </b><br />
              {release}
            </p>
          </div>
          <div className="col-md">
            <p>
              <b className="green-text">Runtime: </b><br />
              {runtime} mins
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-md">
            <p>
              <b className="green-text">Vote Average: </b><br />
              {vote_average > 0 ? ` ${vote_average} / 10` : 'NA'}
            </p>
          </div>
          <div className="col-md">
            <p>
              <b className="green-text">Box Office: </b><br />
              {revenue > 0 ? `$${revenue.toLocaleString()}` : 'NA'}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    revenue: PropTypes.number,
    genres: PropTypes.array,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    runtime: PropTypes.number,
  }).isRequired,
};

export default Movie;
