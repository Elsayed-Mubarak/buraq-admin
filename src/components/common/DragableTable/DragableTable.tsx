import DraggingIcon from "@/components/shared/DragginIcon";
import React, { useState } from "react";

// Define the type for a table row
interface TableRow {
  id: number;
  title: string;
  botName: string;
  category: string;
}

const DraggableTable: React.FC = () => {
  // State to manage table rows
  const [rows, setRows] = useState<TableRow[]>([
    {
      id: 1,
      title: "Pizza Restaurant Chatbot",
      botName: "WEB - Pizza Restaurant Chatbot",
      category: "Hospitality",
    },
    {
      id: 2,
      title: "Scheduling Site Visit for Real Estate",
      botName: "WEB - Scheduling Site Visit for Real Estate",
      category: "Real Estate",
    },
    {
      id: 3,
      title: "Branding for Real Estate",
      botName: "WEB - Branding for Real Estate",
      category: "Real Estate",
    },
    {
      id: 4,
      title: "Lead Generation for Real Estate",
      botName: "WEB - Lead Generation for Real Estate",
      category: "Real Estate",
    },
    {
      id: 5,
      title: "Property Showcasing",
      botName: "WEB - Property Showcasing",
      category: "Real Estate",
    },
  ]);

  // Handle drag start event
  const handleDragStart = (
    e: React.DragEvent<HTMLTableRowElement>,
    index: number
  ) => {
    e.dataTransfer.setData("text/plain", index.toString());
    e.currentTarget.classList.add("opacity-50");
  };

  // Handle drag over event
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  // Handle drop event
  const handleDrop = (
    e: React.DragEvent<HTMLTableRowElement>,
    targetIndex: number
  ) => {
    e.preventDefault();
    const draggedIndex = Number(e.dataTransfer.getData("text/plain"));
    const newRows = [...rows];
    const [draggedRow] = newRows.splice(draggedIndex, 1);
    newRows.splice(targetIndex, 0, draggedRow);
    setRows(newRows);
  };

  // Handle drag end event
  const handleDragEnd = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.currentTarget.classList.remove("opacity-50");
  };

  return (
    <div className="p-6">
      <table className="w-full rounded-xl border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 pt-5">
            <th className='pt-3 pb-3'></th>
            <th className='pt-3 pb-3'>Title</th>
            <th className='pt-3 pb-3'>Bot Name</th>
            <th className='pt-3 pb-3'>Category</th>
            <th className='pt-3 pb-3'></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
              onDragEnd={handleDragEnd}
              className="cursor-move hover:bg-gray-50"
            >
              <td className="p-3 border-b border-gray-300">
                <span className="cursor-grab"><DraggingIcon /></span>
              </td>
              <td className="p-3 border-b border-gray-300">{row.title}</td>
              <td className="p-3 border-b border-gray-300">{row.botName}</td>
              <td className="p-3 border-b border-gray-300">{row.category}</td>
              <td className="p-3 border-b border-gray-300">
                <button className="text-blue-500 hover:text-blue-700">
                  Edit
                </button>
                <button className="text-red-500 hover:text-red-700 ml-2">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DraggableTable;
