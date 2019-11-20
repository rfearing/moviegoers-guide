import cx from 'classnames';
import PropTypes from 'prop-types';

const Pagination = ({
  handlePagination,
  page,
  totalPages,
}) => {
  const previous = page > 1;
  const next = page < totalPages && totalPages > 0;

  return (
    <nav aria-label="Pagination">
      <ul className="pagination justify-content-end">
        <li className={cx('page-item', { disabled: !previous })}>
          <button
            type="button"
            className="page-link"
            onClick={() => previous && handlePagination(page - 1)}
          >
            Previous
          </button>
        </li>
        <li className={cx('page-item', { disabled: !next })}>
          <button
            type="button"
            className="page-link"
            onClick={() => next && handlePagination(page + 1)}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  handlePagination: PropTypes.func.isRequired,
  page: PropTypes.number,
  totalPages: PropTypes.number,
};

Pagination.defaultProps = {
  page: 1,
  totalPages: 0,
};

export default Pagination;
