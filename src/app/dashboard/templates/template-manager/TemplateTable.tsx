import React from "react";
import { FormData } from "@/app/types/TemplateTypes";
import { Column } from "@/components/common/TemplateManager";
import TableManger from "@/components/common/TemplateManager";

// column for 
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
