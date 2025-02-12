"use client";

import React, { useEffect, useState } from "react";
import { TemplateTableProps } from "@/app/types/templateManager-types/TemplateManagerTypes";
import DraggableTable from "@/components/common/DragableTable/DragableTable";
import axios from "axios";

// Define the type for template data
interface TemplateData {
  id: number;
  title: string;
  botName: string;
  category: {
    title: string;
  };
}

const TemplateTable: React.FC<TemplateTableProps> = ({ activeTab }) => {
  const [data, setData] = useState<TemplateData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchTemplate = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const res = await axios.get(
        `${BASE_URL}/api/dashboard/all-standard-templates/${activeTab.toLowerCase()}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        const data = res.data.data.data as TemplateData[];
        setData(data);
      }
    } catch (err: unknown) {
      console.error("Error Fetching Data:", err);
      setError("Failed to fetch data. Please try again later.");
    } finally {
      setLoading(false); // Ensure loading is set to false
    }
  };

  useEffect(() => {
    fetchTemplate();
  }, [activeTab]);

  return (
    <div className="mt-6 bg-white shadow rounded-lg">
      {error ? (
        <div className="p-6 text-red-500 text-center">{error}</div>
      ) : (
        <DraggableTable data={data} loading={loading} />
      )}
      
    </div>
  );
};

export default TemplateTable;