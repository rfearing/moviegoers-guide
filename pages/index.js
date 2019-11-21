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

const Home = ({
  page,
  movies,
  totalPages,
  sort_by,
  query,
  playing,
  list,
  er,
}) => {
  const [error, setError] = useState(er);
  let heading;
  let allowPopular = true;
  let allowNowPlaying = true;
  let allowTopRated = true;

  // Switch between which buttons are active and the correct heading.
  switch (list) {
    case 'playing':
      allowNowPlaying = false;
      heading = 'Movies Playing Now';
      break;
    case 'top_rated':
      allowTopRated = false;
      heading = 'Top Rated Movies';
      break;
    default:
      allowPopular = false;
      heading = 'Popular Movies';
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

  return (
    <>
      <Header handleSearch={handleSearch} />
      <div className="container mt-4 pb-5 pt-4 ${css.pageBody">
        {error && (<div className="alert alert-danger" role="alert">{error.message}</div>)}

        <Sort
          handleChangeList={handleChangeList}
          allowNowPlaying={allowNowPlaying}
          allowPopular={allowPopular}
          allowTopRated={allowTopRated}
          heading={heading}
        />

        <div className="pb-5">
          <Movies movies={movies} />
        </div>

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

  // To easily check later in the component:
  let list = 'popular';
  if (sort_by && sort_by.includes('vote_average')) { list = 'top_rated'; }
  if (typeof playing === 'string') { list = 'playing'; }

  return {
    movies: response.results || [],
    totalPages: response.total_pages || 0,
    page: page ? Number(page) : 1,
    sort_by,
    query,
    playing: (typeof playing === 'string'),
    list,
    er,
  };
};

Home.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  list: PropTypes.string.isRequired,
  er: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  sort_by: PropTypes.string,
  query: PropTypes.string, // Note: This is the search query
  playing: PropTypes.bool,
};

Home.defaultProps = {
  movies: [],
  er: false,
  sort_by: null,
  query: null,
  playing: false,
};

export default withRouter(Home);
