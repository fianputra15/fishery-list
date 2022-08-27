import React from 'react';
import PaginationButton from './PaginationButton';

const Pagination: React.FC<any> = (props) => {
  const {
    gotoPage,
    pageCount,
    canNextPage,
    pageSize,
    canPreviousPage,
    setPageSize,
    pageIndex,
    pageOptions,
    previousPage,
    nextPage,
  } = props;
  return (
    <div className="pagination">
      <div className="pagination-group-button">
        <PaginationButton
          additionalValue={0}
          isClick={gotoPage}
          status={!canPreviousPage}
        >
          <span className="material-icons">keyboard_double_arrow_left</span>
        </PaginationButton>
        <PaginationButton isClick={previousPage} status={!canPreviousPage}>
          <span className="material-icons">keyboard_arrow_left</span>
        </PaginationButton>
        <PaginationButton isClick={nextPage} status={!canNextPage}>
          <span className="material-icons">keyboard_arrow_right</span>
        </PaginationButton>
        <PaginationButton
          additionalValue={pageCount - 1}
          isClick={gotoPage}
          status={!canNextPage}
        >
          <span className="material-icons">keyboard_double_arrow_right</span>
        </PaginationButton>
        {/* <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          style={{
            opacity: !canPreviousPage ? '.5' : '100',
          }}
        >
          <span className="material-icons">keyboard_double_arrow_left</span>
        </button>{' '}
        <button
          style={{
            opacity: !canPreviousPage ? '.5' : '100',
          }}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <span className="material-icons">keyboard_arrow_left</span>
        </button>{' '}
        <button
          style={{
            opacity: !canNextPage ? '.5' : '100',
          }}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <span className="material-icons">keyboard_arrow_right</span>
        </button>{' '}
        <button
          style={{
            opacity: !canNextPage ? '.5' : '100',
          }}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <span className="material-icons">keyboard_double_arrow_right</span>
        </button>{' '} */}
      </div>
      <div className="pagination-info">
        <span>
          Page{' '}
          <strong>
            {parseInt(pageIndex, 10) + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>| Go to page:</span>
        <input
          type="number"
          defaultValue={parseInt(pageIndex, 10) + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '100px' }}
        />
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Pagination;
