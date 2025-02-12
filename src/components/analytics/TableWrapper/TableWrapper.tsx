// TableWrapper.tsx
import React from "react";
import { TableProps } from "@/app/types/analytics-types/AnlyticsTypes";

export const TableWrapper: React.FC<TableProps> = ({
  title,
  data,
  dataKey1,
  dataKey2,
  description,
  header1,
  header2,
}) => {
  return (
    <div className="flex-1 min-w-[300px] bg-white border border-gray-300 rounded-md shadow-sm p-4">
      {/* Title */}
      <h2 className="font-semibold mb-2">
        {title} <span className="text-gray-500 cursor-pointer">ⓘ</span>
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600">{description}</p>

      {/* Table Container with Scrollable Content */}
      <div
        className="mt-2 max-h-[300px] overflow-y-auto overflow-x-hidden"
        style={{ maxHeight: "300px" }} // Optional: Set a maximum height for the table container
      >
        <table className="w-full border-collapse">
          {/* Table Header */}
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-3 border border-gray-300">
                {header1}
              </th>
              <th className="text-left py-2 px-3 border border-gray-300">
                {header2}
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-3 border border-gray-300">
                  {item[dataKey1]}
                </td>
                <td className="py-2 px-3 border border-gray-300">
                  {item[dataKey2]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
