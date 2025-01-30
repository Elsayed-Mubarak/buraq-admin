'use client';

import React from 'react';

interface Column {
  key: string;
  header: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function Table({ columns, data, onRowClick }: TableProps) {
  const getCellValue = (row: any, key: string) => {
    try {
      if (key.includes('.')) {
        return key.split('.').reduce((obj, k) => obj?.[k], row) || '';
      }
      return row[key] || '';
    } catch (error) {
      console.error(`Error getting cell value for key ${key}:`, error);
      return '';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      if (!dateString) return '';
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        day: '2-digit',
        month: 'short',
        year: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const renderCell = (row: any, column: Column) => {
    const value = getCellValue(row, column.key);
    if (column.key === 'createdAt') {
      return formatDate(value);
    }
    if (column.key === 'status') {
      return (
        <span className={`capitalize ${value === 'active' ? 'text-green-600' : 'text-red-600'}`}>
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
                key={column.key}
                scope="col"
                className="py-3 pl-4 pr-3 text-left text-sm font-medium text-gray-900"
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
                key={row._id || rowIdx}
                onClick={() => onRowClick?.(row)}
                className={`${
                  onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
                }`}
              >
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className={`whitespace-nowrap py-3 pl-4 pr-3 text-sm ${
                      column.key === 'status' || column.key === '_id'
                        ? 'text-gray-900'
                        : 'text-gray-600'
                    }`}
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
