"use client";

import React from "react";
import { TemplateManagerHeaderProps } from "@/app/types/templateManager-types/TemplateManagerTypes";

const TemplateManagerHeader: React.FC<TemplateManagerHeaderProps> = ({
  //activeTab,
  onCreateTemplate,
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Template Manager</h1>
      <button
        onClick={onCreateTemplate}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Create Template
      </button>
    </div>
  );
};

export default TemplateManagerHeader;
