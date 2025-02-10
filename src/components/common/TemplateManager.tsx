"use client";


export interface Column<T> {
  key: keyof T | string; 
  header: string;
  render?: (item: T) => React.ReactNode; 
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
}
export default function TableManger<T extends Record<string,any>>({
  columns,
  data,
  onRowClick,
}: TableProps<T>) {
  const getCellValue = (
    row: T,
    key: keyof T | string
  ): string | React.ReactNode => {
    try {
      if (typeof key === "string" && key.includes(".")) {
        const keys = key.split(".");
        let value = row; 
        for (const k of keys) {
          value = value[k];
          if (value === undefined || value === null) return ""; 
        }
        return value?.toString() || "";
      }

      const value = row[key as keyof T]; 
      return value?.toString() || "";
    } catch (error) {
      console.error(`Error getting cell value for key ${String(key)}:`, error);
      return "";
    }
  };

  const renderCell = (row: T, column: Column<T>) => {
    if (column.render) {
      return column.render(row); 
    }

    const value = getCellValue(row, column.key);

    if (column.key === "createdUTC" && typeof value === "string") {
      return value;
    }
    if (column.key === "status" && typeof value === "string") {
      return (
        <span
          className={`capitalize ${
            value === "Active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {value}
        </span>
      );
    }
    return value;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-b border-gray-200">
            {columns.map((column) => (
              <th
                key={String(column.key)} 
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-sm font-bold text-gray-900"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="py-4 text-center text-sm text-gray-500"
              >
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr
                key={row.id || rowIdx} 
                onClick={() => onRowClick?.(row)}
                className={`${
                  onRowClick ? "cursor-pointer hover:bg-gray-50" : ""
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={String(column.key)} 
                    className={`whitespace-nowrap py-3 pl-4 pr-3 font-semibold text-sm text-gray-600`}
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
