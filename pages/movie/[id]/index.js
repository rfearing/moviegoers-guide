import React, { useState } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import Movie from 'COMPONENTS/Movie';
import { getImageUrl, getHighestVotedImage } from 'BASE/utils';
import { getMovie, getMovieImages } from 'SERVICES';
import '../../start.scss';
import style from './style.scss';

const MoviePage = ({
  movie,
  images: { backdrops },
  error: er,
}) => {
  const highest = getHighestVotedImage(backdrops);
  const imagePath = highest && highest.file_path ? getImageUrl(highest.file_path) : '';
  const [error, setError] = useState(er);

  /**
   * Request paginated movies and update state.
   */
  const handleSearch = async (searchTerm) => {
    try {
      Router.push(`/?query=${encodeURI(searchTerm)}`);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <Header handleSearch={handleSearch} />
      <div style={{ backgroundImage: `url(${imagePath})` }} className={`py-5 page-body ${style.background}`}>
        <div className="container">
          {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}
          <Movie movie={movie} />
        </div>
      </div>
      <Footer />
    </>
  );
};

MoviePage.getInitialProps = async ({ query }) => {
  const { id } = query;
  try {
    const [movie, images] = await Promise.all([
      getMovie(id),
      getMovieImages(id),
    ]);
    return { movie, images };
  } catch (error) {
    return error;
  }
};

MoviePage.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    genres: PropTypes.array,
  }),
  images: PropTypes.shape({
    backdrops: PropTypes.array,
  }),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

MoviePage.defaultProps = {
  movie: {},
  images: [],
  error: null,
};

export default withRouter(MoviePage);
