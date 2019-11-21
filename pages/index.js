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
    const query = generateQueryString({ sort_by, playing, page: newPage });
    try {
      Router.push(`/${query}`);
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

  return (
    <>
      <Header />
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

Home.getInitialProps = async ({ query }) => {
  const {
    page,
    sort_by,
    playing,
    search,
  } = query || {};

  const qString = generateQueryString({ page, sort_by, search });
  const api = pickCorrectEndpoint(query);
  const isNowPlaying = (typeof playing === 'string');
  let er = false;
  let response;

  try {
    response = await api(qString);
  } catch (error) {
    er = error;
  }

  // To easily check in the component:
  let list = 'popular';
  if (sort_by && sort_by.includes('vote_average')) { list = 'top_rated'; }
  if (isNowPlaying) { list = 'playing'; }

  return {
    movies: response.results || [],
    totalPages: response.total_pages || 0,
    page: page ? Number(page) : 1,
    sort_by,
    playing: isNowPlaying,
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
  playing: PropTypes.bool,
};

Home.defaultProps = {
  movies: [],
  er: false,
  sort_by: null,
  playing: false,
};

export default withRouter(Home);
