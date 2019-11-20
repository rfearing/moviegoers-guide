import React, { useState } from 'react';
import { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import { getMovie } from 'SERVICES';
import '../../start.scss';

const Movie = ({
  movie: {
    title,
  },
}) => {
  const [error, setError] = useState(false);

  return (
    <>
      <Header />
      <div className="container mt-4 py-5 page-body">
        {/* Show error message */}
        {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}
        <div className="pb-5">
          <h1>{title}</h1>
        </div>
      </div>
      <Footer />
    </>
  );
};

Movie.getInitialProps = async ({ query }) => {
  const { id } = query;
  const response = await getMovie(id);

  return {
    movie: response,
  };
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.number,
    overview: PropTypes.string,
  }),
};

Movie.defaultProps = {
  movie: {},
};

export default withRouter(Movie);
