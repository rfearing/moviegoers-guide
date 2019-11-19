import React from 'react';
import css from './style.scss';

const currentYear = new Date().getFullYear();

/**
 * The Footer for the default Layout
 */
export default () => (
  <footer className={`blue-background ${css.pageFooter}`}>
    <div className="container py-2">
      <div className="d-flex justify-content-between">
        <p className="m-0 text-light">You should hire Ricardo in <b>{currentYear}</b>!</p>
        <p className="m-0 text-light">
          <span role="img" aria-label="Metal hand emoji">🤘</span>&nbsp;
          <a href="https://ricardofearing.com" target="_blank" rel="noopener noreferrer">
            ricardofearing.com
          </a>
        </p>
      </div>
    </div>
  </footer>
);
