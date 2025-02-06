import React from "react";
import Table from "@/components/common/Table";

interface TemplateTableProps {
  columns: any[]; 
  data: any[]; 
}

const TemplateTable: React.FC<TemplateTableProps> = ({ columns, data }) => {
  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <Table columns={columns} data={data} />
    </div>
  );
};

export default TemplateTable;
