import cx from 'classnames';
import PropTypes from 'prop-types';

const Pagination = ({
  handlePagination,
  next,
  previous,
}) => (
  <nav aria-label="Pagination">
    <ul className="pagination justify-content-end">
      <li className={cx('page-item', { disabled: !previous })}>
        <button
          type="button"
          className="page-link"
          onClick={() => previous && handlePagination(previous)}
        >
          Previous
        </button>
      </li>
      <li className={cx('page-item', { disabled: !next })}>
        <button
          type="button"
          className="page-link"
          onClick={() => next && handlePagination(next)}
        >
          Next
        </button>
      </li>
    </ul>
  </nav>
);

Pagination.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  next: PropTypes.string,
  previous: PropTypes.string,
};

Pagination.defaultProps = {
  next: null,
  previous: null,
};

export default Pagination;
