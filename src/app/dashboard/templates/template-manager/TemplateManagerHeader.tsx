import React from "react";
import Link from "next/link";

interface TemplateManagerHeaderProps {
  activeTab: string;
  onCreateTemplate: () => void;
}

const tabs = ["Web", "Facebook", "WhatsApp", "SMS", "Instagram"];

const TemplateManagerHeader: React.FC<TemplateManagerHeaderProps> = ({
  activeTab,
  onCreateTemplate,
}) => {
  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">
          Template Manager
        </h1>
        <button
          onClick={onCreateTemplate}
          className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          Create Template
        </button>
      </div>

      <div className="mt-4">
        {tabs.map((tab) => (
          <div key={tab} className="inline-block">
            {" "}
            <Link
              href={`/templates/${tab.toLowerCase()}`}
              className={`px-3 py-2 text-sm font-medium ${
                activeTab.toLowerCase() === tab.toLowerCase()
                  ? "text-blue-600 underline underline-offset-4" 
                  : "text-gray-600 hover:text-gray-800"
              } `}
            >
              {tab}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateManagerHeader;
