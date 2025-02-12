"use client";

import React from "react";
import { TemplateSearchProps } from "@/app/types/templateManager-types/TemplateManagerTypes";

const TemplateSearch: React.FC<TemplateSearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search templates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default TemplateSearch;
