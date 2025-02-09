import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TemplateSearchProps } from "@/app/types/templateManager-types/TemplateManagerTypes";



const TemplateSearch: React.FC<TemplateSearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="mt-6">
      <div className="relative inline-block w-64">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
        <input
          type="text"
          placeholder="Search Templates"
          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TemplateSearch;
