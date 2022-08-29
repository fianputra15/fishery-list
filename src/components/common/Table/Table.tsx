/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useTable, usePagination, useSortBy, useFilters } from 'react-table';
import { isEmpty } from 'lodash';
import { matchSorter } from 'match-sorter';
import { formatRupiah } from '../../../libs/formatingCurrency';
import moment from 'moment';
import SortButton from './SortButton';
import Pagination from './Pagination';

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
        e.preventDefault();
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}
export default function Table(props: any) {
  const { tableData, tableHeader, loading, handleDeleteFishery } = props;

  const data = React.useMemo(() => tableData ?? [], [tableData]);
  const columns = React.useMemo(() => tableHeader ?? [], [tableHeader]);
  const [stateSortIcon, setStateSortIcon]: any = useState({
    heading: '',
    type: '',
  });

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
      <div style={{ overflowX: 'auto' }}>
        <table {...getTableProps()} className="table-list" cellPadding={10}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column: any) => {
                  if (column.id === 'action') {
                    return (
                      <th width="20">
                        <div>
                          <div {...column.getHeaderProps()}>
                            <span> {column.render('Header')}</span>
                          </div>
                        </div>
                      </th>
                    );
                  }
                  return (
                    <th width="20">
                      <div>
                        <SortButton
                          column={column}
                          setStateSortIcon={setStateSortIcon}
                          stateSortIcon={stateSortIcon}
                          title={column.render('Header')}
                        />
                      </div>

                      <div>
                        {column.canFilter ? column.render('Filter') : null}
                      </div>
                      <br />
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
                    className="table-list-data p-4"
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
                      if (cell.column.id === 'price') {
                        return (
                          <td {...cell.getCellProps()}>
                            {isEmpty(cell?.value)
                              ? '-'
                              : formatRupiah(cell.value, 'Rp.')}
                          </td>
                        );
                      }
                      if (cell.column.id === 'action') {
                        return (
                          <td align="center">
                            <button
                              onClick={() => handleDeleteFishery(row.original)}
                              className="btn btn-danger btn-sm"
                              type="button"
                            >
                              <span className="material-icons">delete</span>
                            </button>
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
        </table>
      </div>
      {!loading && (
        <Pagination
          gotoPage={gotoPage}
          pageCount={pageCount}
          canNextPage={canNextPage}
          pageSize={pageSize}
          canPreviousPage={canPreviousPage}
          setPageSize={setPageSize}
          pageIndex={pageIndex}
          pageOptions={pageOptions}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </>
  );
}
