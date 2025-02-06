import React from "react";

interface TemplateCountProps {
  count: number;
}

const TemplateCount: React.FC<TemplateCountProps> = ({ count }) => {
  return (
    <div className="mt-2 text-sm font-semibold text-black-500">
      {count} Templates
    </div>
  );
};

export default TemplateCount;
