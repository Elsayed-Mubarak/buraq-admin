import { TableProps } from "../types/AnlyticsTypes";


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
    <div className="flex-1 overflow-auto min-w-[300px] bg-white border border-gray-300 rounded-md shadow-sm p-4">
      <h2 className="font-semibold mb-2">
        {title} <span className="text-gray-500 cursor-pointer">ⓘ</span>
      </h2>
      <p className="text-sm text-gray-600">{description}</p>
      <table className="w-full mt-2 border-collapse">
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
        <tbody>
          {data.map((item, index: number) => (
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
  );
};