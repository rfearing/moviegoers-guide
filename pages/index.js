import React, { useState } from 'react';
import Router, { withRouter } from 'next/router';
import PropTypes from 'prop-types';
import Header from 'COMPONENTS/Header';
import Footer from 'COMPONENTS/Footer';
import Movies from 'COMPONENTS/Movies';
import Pagination from 'COMPONENTS/Pagination';
import Sort from 'COMPONENTS/Sort';
import { generateQueryString, pickCorrectEndpoint } from 'BASE/utils';
import './start.scss';

export const noMoviesText = 'We could\'nt find any matching movies.';

const Home = ({
  page,
  movies,
  totalPages,
  sort_by,
  query,
  playing,
  er,
}) => {
  const [error, setError] = useState(er);
  let heading = 'Popular Movies';
  let allowPopular = false;
  let allowNowPlaying = true;
  let allowTopRated = true;

  if (sort_by && sort_by.includes('vote_average')) {
    allowPopular = true;
    allowTopRated = false;
    heading = 'Top Rated Movies';
  }
  if (playing) {
    allowPopular = true;
    allowNowPlaying = false;
    heading = 'Movies Playing Now';
  }
  if (query) {
    allowPopular = true;
    heading = `Search Results for ${decodeURI(query)}`;
  }

  /**
   * Request paginated movies and update state.
   */
  const handlePagination = async (newPage) => {
    const newQuery = generateQueryString({
      sort_by,
      playing,
      query,
      page: newPage,
    });
    try {
      Router.push(`/${newQuery}`);
    } catch (e) {
      setError(e);
    }
  };

  /**
   * Request paginated movies and update state.
   */
  const handleChangeList = async (newList) => {
    try {
      Router.push(newList);
    } catch (e) {
      setError(e);
    }
  };

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

  /**
   * Display no movies text if none are found
   */
  const content = movies && movies.length > 0
    ? (
      <div className="pb-5">
        <Movies movies={movies} />
      </div>
    )
    : <h1>{noMoviesText}</h1>;

  return (
    <>
      <Header handleSearch={handleSearch} search={query} />
      <div className="container mt-4 pb-5 pt-4 page-body">
        {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}
        <Sort
          handleChangeList={handleChangeList}
          allowNowPlaying={allowNowPlaying}
          allowPopular={allowPopular}
          allowTopRated={allowTopRated}
          heading={heading}
        />
        {content}
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

/**
 * Make API Calls and pass down as props to component.
 * Note getInitialProps is called on the server.
 * @param {Object} query - Renamed "server" because Movie DB's search is called "query"
 */
Home.getInitialProps = async ({ query: server }) => {
  const {
    page,
    sort_by,
    playing,
    query,
  } = server || {};

  const queryString = generateQueryString({ page, sort_by, query });
  const api = pickCorrectEndpoint(server);
  let er = false;

  let response;
  try {
    response = await api(queryString);
  } catch (error) {
    er = error;
  }

  return {
    movies: response.results || [],
    totalPages: response.total_pages || 0,
    page: page ? Number(page) : 1,
    sort_by,
    query,
    playing: (typeof playing === 'string'),
    er,
  };
};

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number,
  page: PropTypes.number,
  er: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  sort_by: PropTypes.string,
  query: PropTypes.string, // Note: This is the search query
  playing: PropTypes.bool,
};

Home.defaultProps = {
  totalPages: 0,
  page: 1,
  movies: [],
  er: false,
  sort_by: null,
  query: null,
  playing: false,
};

export default withRouter(Home);
