import React from "react";
import { Column, FormData } from "./templateTypes/TemplateTypes";
import TableManger from "@/components/common/TemplateManager";

interface TemplateTableProps {
  columns: Column[];
  data: FormData[]; 
}



const TemplateTable: React.FC<TemplateTableProps> = ({ columns, data }) => {
  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <TableManger columns={columns} data={data} />
    </div>
  );
};

export default TemplateTable;
