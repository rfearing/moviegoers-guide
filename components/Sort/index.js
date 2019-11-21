import React from 'react';
import PropTypes from 'prop-types';

const Sort = ({
  handleChangeList,
  allowNowPlaying,
  allowPopular,
  allowTopRated,
  heading,
}) => (
  <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4">
    <h1>{heading}</h1>
    <div className="d-flex align-items-center">
      <p className="mb-0 mr-3">Show:</p>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={!allowPopular}
          onClick={() => handleChangeList('/')}
        >
          Popular
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={!allowNowPlaying}
          onClick={() => handleChangeList('/?playing')}
        >
          Now Playing
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          disabled={!allowTopRated}
          onClick={() => handleChangeList('/?sort_by=vote_average.desc')}
        >
          Top Rated
        </button>
      </div>
    </div>
  </div>
);

Sort.propTypes = {
  handleChangeList: PropTypes.func.isRequired,
  allowNowPlaying: PropTypes.bool.isRequired,
  allowPopular: PropTypes.bool.isRequired,
  allowTopRated: PropTypes.bool.isRequired,
  heading: PropTypes.string.isRequired,
};

export default Sort;
