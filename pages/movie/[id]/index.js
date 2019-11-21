import React from 'react';
import { withRouter } from 'next/router';
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
  error,
}) => {
  const highest = getHighestVotedImage(backdrops);
  const imagePath = highest && highest.file_path ? getImageUrl(highest.file_path) : '';

  return (
    <>
      <Header />
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
