import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import style from './style.scss';

/**
 * The Header for the default Layout
 */
const Header = ({
  search,
  handleSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState(decodeURI(search));
  const handleUpdateSearch = (ev) => {
    const { value } = ev.target;
    setSearchTerm(value);
  };

  return (
    <header className={`blue-background ${style.pageHeader}`}>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4">
            <Link href="/">
              <a>
                <span hidden>Moviegoers Home</span>
                <img
                  alt="Logo for Ultimate Moviegoers Guide"
                  src="/logo.png"
                />
              </a>
            </Link>
          </div>

          <div className="col-md d-flex justify-content-between align-items-center">
            <input
              className={style.search}
              type="text"
              value={searchTerm}
              placeholder="Search Movies"
              onChange={(ev) => handleUpdateSearch(ev)}
            />
            <button
              type="button"
              onClick={() => handleSearch(searchTerm)}
              className={`btn ${style.searchBtn}`}
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  search: PropTypes.string,
  handleSearch: PropTypes.func.isRequired,
};

Header.defaultProps = { search: '' };

export default Header;
