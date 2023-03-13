import React from "react";
import { usePagination, DOTS } from "./hook/UsePagination";

import styles from "./Pagination.module.scss";
function Pagination(props) {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  console.log("lastpage", lastPage, currentPage);
  return (
    <ul className={styles.paginationContainer}>
      <li
        className={
          currentPage === 1
            ? styles.paginationItemDisabled
            : styles.paginationItem
        }
        onClick={onPrevious}
      >
        <div className={styles.arrowLeft} />
      </li>
      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={styles.paginationItem}>
              &#8230;
            </li>
          );
        }
        return (
          <li
            key={pageNumber}
            className={
              pageNumber === currentPage
                ? styles.paginationItemSelected
                : styles.paginationItem
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
          currentPage === lastPage
            ? styles.paginationItemDisabled
            : styles.paginationItem
        }
        onClick={onNext}
      >
        <div
          className={
            currentPage === lastPage ? styles.arrowDisabled : styles.arrowRight
          }
        />
      </li>
    </ul>
  );
}

export default Pagination;
