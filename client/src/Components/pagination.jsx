import React from "react";
import _ from "lodash";

export const Pagination = ({
  itemCount,
  pageSize,
  currentPage,
  onPageChange,
  onlyNextPrevious,
  NextPrevious,
}) => {
  const pagesCount = Math.ceil(itemCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">
        {onlyNextPrevious && pagesCount !== 1 && (
          <>
            <Previous currentPage={currentPage} onPageChange={onPageChange} />
            <Next
              pagesCount={pagesCount}
              currentPage={currentPage}
              onPageChange={onPageChange}
            />
          </>
        )}
        {NextPrevious && (
          <Previous currentPage={currentPage} onPageChange={onPageChange} />
        )}
        {!onlyNextPrevious &&
          pages.map((page) => (
            <li
              key={page}
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <button
                id={`btn_${page}`}
                className="page-link pagebtn"
                onClick={() => onPageChange(page)}
                {...(page === currentPage ? { disabled: true } : {})}
              >
                {page}
              </button>
            </li>
          ))}
        {NextPrevious && (
          <Next
            pagesCount={pagesCount}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
      </ul>
    </nav>
  );
};

export const Paginate = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
};

const Next = ({ pagesCount, currentPage, onPageChange }) => {
  return (
    <li
      className={
        currentPage === pagesCount ? "page-item disabled" : "page-item"
      }
    >
      <button
        className="page-link next"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </li>
  );
};

const Previous = ({ currentPage, onPageChange }) => {
  return (
    <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
      <button
        className="page-link previous"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>
    </li>
  );
};
