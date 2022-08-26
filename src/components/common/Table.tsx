/* eslint-disable */
// @ts-nocheck
import React, { Key, useEffect } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { isEmpty } from 'lodash';
import { matchSorter } from 'match-sorter';
import moment from 'moment';

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}
// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
export default function Table(props: any) {
  const { tableData, tableHeader, loading } = props;

  const data = React.useMemo(() => tableData ?? [], [tableData]);
  const columns = React.useMemo(() => tableHeader ?? [], [tableHeader]);

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
      // And also our default editable cell
      // Cell: EditableCell,
    }),
    [],
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // rows,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, filters },
  } = useTable(
    { columns, data, filterTypes, defaultColumn },

    useFilters,
    useSortBy,
    usePagination,
  );

  return (
    <>
      {/* <div className="filter-wrapper">
        <div className="sort-box">
          <div>
            <select>
              <option value="">Filter By</option>
            </select>
          </div>
          <div>
            <select placeholder="Sort By">
              <option value="">Filter By</option>
            </select>
          </div>
        </div>
      </div> */}

      <div style={{ overflowX: 'auto' }}>
        <table {...getTableProps()} className="table-list" cellPadding={10}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => {
                  return (
                    <th
                      width="20"
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      <div>
                        <button type="button">
                          {' '}
                          <span className="material-icons">filter_list</span>
                        </button>
                        <span> {column.render('Header')}</span>
                      </div>

                      {/* Render the columns filter UI */}
                      <div>
                        {column.canFilter ? column.render('Filter') : null}
                      </div>
                      <br />
                      {/* <input
                        value={filterValue || ''}
                        onChange={(e) => {
                          setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
                        }}
                        type="text"
                        placeholder={`Search by ${column?.Header}`}
                      /> */}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          {!loading && (
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr
                    style={{
                      background: i % 2 == 0 ? '#f7f8fc' : 'white',
                    }}
                    {...row.getRowProps()}
                    className="table-list-data"
                  >
                    {row.cells.map((cell) => {
                      if (cell.column.id === 'tgl_parsed') {
                        return (
                          <td {...cell.getCellProps()}>
                            {isEmpty(cell?.value)
                              ? '-'
                              : moment(cell.value).format(
                                  'DD/MM/YYYY hh:mm:ss',
                                )}
                          </td>
                        );
                      }
                      return (
                        <td {...cell.getCellProps()}>
                          {isEmpty(cell?.value) ? '-' : cell.render('Cell')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
          {loading && (
            <tbody>
              <tr>
                <td
                  colSpan={tableHeader.length}
                  style={{ height: '100px', textAlign: 'center' }}
                >
                  Please Wait....
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      {!loading && (
        <div className="pagination">
          <div className="pagination-group-button">
            <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
              {'<<'}
            </button>{' '}
            <button onClick={() => previousPage()} disabled={!canPreviousPage}>
              {'<'}
            </button>{' '}
            <button onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </button>{' '}
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </button>{' '}
          </div>
          <div className="pagination-info">
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            <span>| Go to page:</span>
            <input
              type="number"
              defaultValue={pageIndex + 1}
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
      )}
    </>
  );
}
