const thPaddingBySize = {
  sm: "px-2 py-2 md:px-2 md:py-2",
  md: "px-2 py-2 md:px-6 md:py-3",
};

const tdPaddingBySize = {
  sm: "px-2 py-2 md:px-2 md:py-2",
  md: "px-2 py-2 md:px-6 md:py-4",
};

export default function Table({ table, onClick, size = "md" }) {
  return (
    <div className="overflow-x-auto">
      <table
        {...table.getTableProps()}
        className="min-w-full divide-y divide-gray-200 font-semibold dark:divide-gray-700"
      >
        <thead className="bg-gray-50 dark:bg-gray-800">
          {table.headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={`${thPaddingBySize[size]} text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 whitespace-nowrap`}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " ▼"
                        : " ▲"
                      : "\u00A0\u00A0"}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody
          {...table.getTableBodyProps()}
          className="divide-y bg-white divide-gray-200 dark:bg-gray-900 dark:divide-gray-700"
        >
          {table.rows.map((row) => {
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
                      className={`${tdPaddingBySize[size]} whitespace-nowrap w-[1%]`}
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
    </div>
  );
}
