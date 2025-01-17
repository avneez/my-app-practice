import React from 'react';
import classnames from 'classnames';
import { usePagination, DOTS } from '../shared/UsePagination';
const Pagination = props => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }

    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange[paginationRange.length - 1];
    return (
        <ul
            className={classnames('pagination-container pagination justify-content-between alyya-pagination', { [className]: className })}
        >
            {/* Left navigation arrow */}
            {currentPage === 1 && <li className="page-item disabled" style={{display: 'none'}}><a className="page-link"><img src='/images/left.png' width="12px" alt="arrow" /> &nbsp; Previous</a></li>}
            {currentPage !== 1 && <li className="page-item" onClick={onPrevious} ><a className="page-link"><img src='/images/left.png' width="12px" alt="arrow" /> &nbsp; Previous</a></li>}
            {paginationRange.map(pageNumber => {

                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                    return <li className="pagination-item dots">&#8230;</li>;
                }

                // Render our Page Pills
                return (
                    (pageNumber === currentPage) ? <li className="page-item"><a className="page-link active">{pageNumber}</a></li> : <li className="page-item"><a className="page-link"  onClick={() => onPageChange(pageNumber)}>{pageNumber}</a></li>
                );
            })}
            {/*  Right Navigation arrow */}
            {currentPage === lastPage && <li className="page-item disabled" style={{display: 'none'}}><a className="page-link">Next &nbsp; <img src='/images/right.png' width="12px" alt="arrow" /></a></li> }
            {currentPage !== lastPage && <li className="page-item" onClick={onNext}><a className="page-link">Next &nbsp; <img src='/images/right.png' width="12px" alt="arrow" /></a></li> }
        </ul>
    );
};

export default Pagination;