"use client";

import React from "react";
import { TemplateCountProps } from "@/app/types/templateManager-types/TemplateManagerTypes";

const TemplateCount: React.FC<TemplateCountProps> = ({ count }) => {
  return (
    <div className="mb-4">
      <span className="text-sm text-gray-600">{count} templates found</span>
    </div>
  );
};

export default TemplateCount;
