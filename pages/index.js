import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import Movies from 'COMPONENTS/Movies';
import Pagination from 'COMPONENTS/Pagination';
import { getMovies } from 'ACTIONS';
import css from './start.scss';

const Home = ({
  movies,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  /**
   * Request paginated movies and update state.
   */
  const handlePagination = async () => {
    try {
      setLoading(true);
      // Pagination added after API
      setTimeout(() => null, 1000);
      setLoading(false);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  /*
   * Movie List or Loading state
   */
  let content = (
    <>
      <Movies movies={movies} />
      <Pagination
        handlePagination={handlePagination}
      />
    </>
  );

  if (loading) {
    content = (
      <div className={css.centerContent}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={`container mt-4 ${css.pageBody}`}>
        {/* Show error message */}
        {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}
        {content}
      </div>
      <Footer />
    </>
  );
};

Home.getInitialProps = async () => {
  const response = await getMovies();
  return {
    movies: response.results || [],
  };
};

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

Home.defaultProps = {
  movies: [],
};

export default Home;
