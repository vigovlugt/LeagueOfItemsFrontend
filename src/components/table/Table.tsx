import styles from "./Table.module.css";

const thPaddingBySize = {
  xs: "px-2 py-2 md:px-2 md:py-2",
  sm: "px-2 py-2 md:px-3 md:py-3",
  md: "px-2 py-2 md:px-6 md:py-3",
};

const tdPaddingBySize = {
  xs: "px-2 py-2 md:px-2 md:py-2",
  sm: "px-2 py-2 md:px-3 md:py-3",
  md: "px-2 py-2 md:px-6 md:py-4",
};

export default function Table({ table, onClick, size = "md" }) {
  const isPaginated = Boolean(table.page);

  const {
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = table;

  return (
    <div className="overflow-x-auto">
      <table
        {...table.getTableProps()}
        className={`min-w-full divide-y divide-gray-200 font-semibold dark:divide-gray-700`}
      >
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps?.())}
                  className={`${
                    thPaddingBySize[size]
                  } text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap ${
                    column.headerClass || ""
                  }`}
                >
                  {column.render("Header")}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? " ▼" : " ▲"}</span>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...table.getTableBodyProps()}
          className="divide-y bg-white divide-gray-200 dark:bg-gray-900 dark:divide-gray-700"
        >
          {(table.page || table.rows).map((row) => {
            table.prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                onClick={() => onClick(row)}
                className="cursor-pointer"
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={`${
                        tdPaddingBySize[size]
                      } whitespace-nowrap w-[1%] ${
                        cell.column.cellClass || ""
                      }`}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isPaginated && (
        <div className="flex justify-center mt-2">
          <nav
            className={`${styles.tablePagination} relative z-0 inline-flex shadow-sm -space-x-px`}
            aria-label="Pagination"
          >
            {pageIndex != 0 && (
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 dark:bg-dark dark:border-gray-600"
                onClick={() => gotoPage(0)}
              >
                <span className="sr-only">First</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
            {canPreviousPage && (
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 dark:bg-dark dark:border-gray-600"
                onClick={previousPage}
              >
                <span className="sr-only">Previous</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}

            {new Array(3)
              .fill(null)
              .map((_, i) => pageIndex - 3 + i)
              .filter((n) => n >= 0 && n < pageCount)
              .map((n) => (
                <a
                  key={n}
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-dark dark:border-gray-600"
                  onClick={() => gotoPage(n)}
                >
                  {n + 1}
                </a>
              ))}

            <a
              href="#"
              aria-current="page"
              className="bg-white border-gray-900 text-gray-900 relative inline-flex items-center px-4 py-2 border text-sm font-medium z-10 dark:bg-dark dark:border-gray-400 dark:text-gray-50"
            >
              {pageIndex + 1}
            </a>

            {new Array(3)
              .fill(null)
              .map((_, i) => pageIndex + 1 + i)
              .filter((n) => n >= 0 && n < pageCount)
              .map((n) => (
                <a
                  key={n}
                  href="#"
                  className="bg-white border-gray-300 text-gray-500 relative inline-flex items-center px-4 py-2 border text-sm font-medium dark:bg-dark dark:border-gray-600"
                  onClick={() => gotoPage(n)}
                >
                  {n + 1}
                </a>
              ))}
            {canNextPage && (
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 dark:bg-dark dark:border-gray-600"
                onClick={nextPage}
              >
                <span className="sr-only">Next</span>
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
            {pageIndex != pageCount - 1 && (
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 dark:bg-dark dark:border-gray-600"
                onClick={() => gotoPage(pageCount - 1)}
              >
                <span className="sr-only">Last</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
