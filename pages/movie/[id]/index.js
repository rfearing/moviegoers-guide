/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import { getImageUrl, getHighestVotedImage } from 'BASE/utils';
import { getMovie, getMovieImages } from 'SERVICES';
import '../../start.scss';
import style from './style.scss';

const Movie = ({
  movie: {
    release_date,
    vote_average,
    poster_path,
    title,
    overview,
    genres,
    runtime,
    revenue,
  },
  images: {
    backdrops,
  },
}) => {
  const [error, setError] = useState(false);
  const highest = getHighestVotedImage(backdrops);
  const poster = getImageUrl(poster_path);
  const imagePath = highest && highest.file_path ? getImageUrl(highest.file_path) : '';
  const movieGenres = genres.map((genre) => genre.name).join(', ');
  const release = new Date(release_date).toDateString();

  return (
    <>
      <Header />
      <div style={{ backgroundImage: `url(${imagePath})` }} className={`py-5 page-body ${style.background}`}>
        <div className="container">
          {/* Show error message */}
          {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}
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
        </div>
      </div>
      <Footer />
    </>
  );
};

Movie.getInitialProps = async ({ query }) => {
  const { id } = query;
  const [movie, images] = await Promise.all([
    getMovie(id),
    getMovieImages(id),
  ]);

  return { movie, images };
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.string,
    vote_average: PropTypes.number,
    genres: PropTypes.array,
  }),
  images: PropTypes.shape({
    backdrops: PropTypes.array,
    images: PropTypes.array,
  }),
};

Movie.defaultProps = {
  movie: {},
  images: [],
};

export default withRouter(Movie);
