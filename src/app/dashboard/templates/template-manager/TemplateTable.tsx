import React from "react";
import TableManger from "@/components/common/TemplateManager";
import { TemplateTableProps } from "@/app/types/templateManager-types/TemplateManagerTypes";




const TemplateTable: React.FC<TemplateTableProps> = ({ columns, data }) => {
  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <TableManger columns={columns} data={data} />
    </div>
  );
};

export default TemplateTable;
