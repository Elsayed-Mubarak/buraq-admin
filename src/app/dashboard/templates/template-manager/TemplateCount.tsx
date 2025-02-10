import { TemplateCountProps } from "@/app/types/templateManager-types/TemplateManagerTypes";
import React from "react";



const TemplateCount: React.FC<TemplateCountProps> = ({ count }) => {
  return (
    <div className="mt-2 text-sm font-semibold text-black-500">
      {count} Templates
    </div>
  );
};

export default TemplateCount;
