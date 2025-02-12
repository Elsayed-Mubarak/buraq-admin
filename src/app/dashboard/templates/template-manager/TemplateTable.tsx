"use client";

import React from "react";
import TableManger from "@/components/common/TemplateManager";
import { FormData } from "@/app/types/TemplateTypes";
import { TemplateTableProps } from "@/app/types/templateManager-types/TemplateManagerTypes";
//import DraggableTable from "@/components/common/DragableTable/DragableTable";


const TemplateTable: React.FC<TemplateTableProps> = ({
  columns,
  data,
  //activeTab,
}) => {
  //const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      <TableManger<FormData> columns={columns} data={data} />
      {/*<DraggableTable />*/}
    </div>
  );
};

export default TemplateTable;
