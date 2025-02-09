import React from "react";
import TableManger from "@/components/common/TemplateManager";
import { Column } from "@/components/common/Table";

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
