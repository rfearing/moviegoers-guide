import React, { useState } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import Movies from 'COMPONENTS/Movies';
import Pagination from 'COMPONENTS/Pagination';
import { getMovies } from 'ACTIONS';
import css from './start.scss';

const Home = ({
  page,
  movies,
  totalPages,
}) => {
  const [error, setError] = useState(false);

  /**
   * Request paginated movies and update state.
   */
  const handlePagination = async (newPage) => {
    try {
      Router.push(`/?page=${newPage}`);
    } catch (e) {
      setError(e);
    }
  };

  return (
    <>
      <Header />
      <div className={`container mt-4 ${css.pageBody}`}>
        {/* Show error message */}
        {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}
        <Movies movies={movies} />
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePagination={handlePagination}
        />
      </div>
      <Footer />
    </>
  );
};

Home.getInitialProps = async ({ query }) => {
  const { page } = query;
  const qString = page ? `?page=${page}` : '';
  const response = await getMovies(qString);

  return {
    movies: response.results || [],
    totalPages: response.total_pages || 0,
    page: page ? Number(page) : 1,
  };
};

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

Home.defaultProps = {
  movies: [],
};

export default withRouter(Home);
