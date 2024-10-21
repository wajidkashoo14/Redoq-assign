import React, { useMemo } from "react";
import { TbArrowsSort } from "react-icons/tb";

const DataTable = ({
  data,
  columns,
  globalSearchValue,
  setGlobalSearchValue,
  columnSearchValues,
  setColumnSearchValues,
  sortConfig,
  setSortConfig,
}) => {
  // Memoize filtered and sorted data to prevent unnecessary re-renders
  const filteredAndSortedData = useMemo(() => {
    let filteredData = [...data];

    // Global search logic
    if (globalSearchValue) {
      filteredData = filteredData.filter((row) =>
        columns.some((column) =>
          column.searchable
            ? String(row[column.accessor])
                .toLowerCase()
                .includes(globalSearchValue.toLowerCase())
            : false
        )
      );
    }

    // Column-specific search logic
    Object.keys(columnSearchValues).forEach((accessor) => {
      const searchValue = columnSearchValues[accessor];
      if (searchValue) {
        filteredData = filteredData.filter((row) =>
          String(row[accessor])
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      }
    });

    // Sorting logic
    if (sortConfig.accessor) {
      filteredData.sort((a, b) => {
        const aValue = a[sortConfig.accessor];
        const bValue = b[sortConfig.accessor];
        if (sortConfig.direction === "asc") {
          return aValue > bValue ? 1 : -1;
        }
        if (sortConfig.direction === "desc") {
          return aValue < bValue ? 1 : -1;
        }
        return 0;
      });
    }

    return filteredData;
  }, [data, columns, globalSearchValue, columnSearchValues, sortConfig]);

  // Handle sorting
  const handleSort = (accessor) => {
    if (sortConfig.accessor === accessor) {
      const direction =
        sortConfig.direction === "asc"
          ? "desc"
          : sortConfig.direction === "desc"
          ? null
          : "asc";
      setSortConfig({ accessor, direction });
    } else {
      setSortConfig({ accessor, direction: "asc" });
    }
  };

  return (
    <div className="data-table p-6 bg-white rounded-lg shadow-lg">
      {/* Global Search */}
      <input
        type="text"
        value={globalSearchValue}
        onChange={(e) => setGlobalSearchValue(e.target.value)}
        placeholder="Search all columns..."
        className="mb-4 w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
      />

      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="p-3 text-left text-sm font-semibold text-gray-600 uppercase border-b"
              >
                {column.searchable && (
                  <input
                    type="text"
                    value={columnSearchValues[column.accessor] || ""}
                    onChange={(e) =>
                      setColumnSearchValues({
                        ...columnSearchValues,
                        [column.accessor]: e.target.value,
                      })
                    }
                    placeholder={`Search ${column.Header}`}
                    className="my-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                )}
                <span
                  className={`cursor-pointer flex items-center space-x-2 ${
                    column.sortable ? "hover:text-blue-500" : ""
                  }`}
                  onClick={() => column.sortable && handleSort(column.accessor)}
                >
                  {column.Header}
                  {column.sortable && (
                    <span className="text-lg">
                      {sortConfig.accessor === column.accessor ? (
                        sortConfig.direction === "asc" ? (
                          "▲"
                        ) : sortConfig.direction === "desc" ? (
                          "▼"
                        ) : (
                          <TbArrowsSort />
                        )
                      ) : (
                        <TbArrowsSort />
                      )}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {filteredAndSortedData.length > 0 ? (
            filteredAndSortedData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className="p-3 text-sm text-gray-700"
                  >
                    {row[column.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="p-3 text-center text-sm text-gray-500"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
