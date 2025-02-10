"use client";

import React, { useState, useMemo, useRef, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import TemplateManagerHeader from "./TemplateManagerHeader";
import TemplateSearch from "./TemplateSearch";
import TemplateCount from "./TemplateCount";
import TemplateTable from "./TemplateTable";
import TemplateCreateModal from "./TemplateCreateModal";
import TemplateEditModal from "./TemplateEditModal";
import { v4 as uuidv4 } from "uuid";
import { Column, TemplateData } from "@/app/types/TemplateTypes";
import { FormData } from "@/app/types/TemplateTypes";
import { TemplateManagerLayoutProps } from "@/app/types/templateManager-types/TemplateManagerTypes";


const initialCategories = [
  "Healthcare",
  "Hospitality",
  "Insurance",
  "Lead Generation",
  "Real Estate",
  "Engagement",
  "Welcome",
  "Customer Service",
  "Marketing",
  "Sales",
  "Education",
  "Technology",
];

const columns:Column[] = [
  { key: "title", header: "Title" },
  { key: "botName", header: "Bot Name" },
  { key: "category", header: "Category" },
  { key: "actions", header: "" },
];

export default function TemplateManagerLayout({
  activeTab,
}: TemplateManagerLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Omit<FormData, "id">>({
    title: "",
    botName: "",
    category: "",
    description: "",
    image: null,
    imageUrl: null,
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  );
  const [templates, setTemplates] = useState<FormData[]>([
    {
      id: uuidv4(),
      title: "Pizza Restaurant Chatbot",
      botName: "WEB - Pizza Restaurant Chatbot",
      category: "Hospitality",
      description: "",
      image: null,
      imageUrl: null,
    },
    {
      id: uuidv4(),
      title: "Scheduling Site Visit for Real Estate",
      botName: "WEB - Scheduling Site Visit for Real Estate",
      category: "Real Estate",
      description: "",
      image: null,
      imageUrl: null,
    },
    {
      id: uuidv4(),
      title: "Facebook Post Template 2",
      botName: "FB - Post Template 2",
      category: "Engagement",
      description: "",
      image: null,
      imageUrl: null,
    },
    {
      id: uuidv4(),
      title: "SMS Welcome Message",
      botName: "SMS - Welcome",
      category: "Welcome",
      description: "",
      image: null,
      imageUrl: null,
    },
    {
      id: uuidv4(),
      title: "Web Restaurant Chatbot",
      botName: "WEB - Restaurant",
      category: "Hospitality",
      description: "",
      image: null,
      imageUrl: null,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { image, ...restFormData } = formData;
    const templateData = { ...restFormData, image };

    if (selectedTemplateId) {
      // EDIT CASE
      const updatedTemplates = templates.map((t) =>
        t.id === selectedTemplateId
          ? {
              ...t,
              ...restFormData,
              imageUrl: formData.imageUrl || t.imageUrl,
            }
          : t
      );
      setTemplates(updatedTemplates);

      handleSimulateBackend({
        ...templateData,
        id: selectedTemplateId,
        action: "edit",
      });
    } else {
      // CREATE CASE
      const newId = uuidv4();
      const newTemplate = {
        ...restFormData,
        id: newId,
        imageUrl: null,
      };
      setTemplates([...templates, newTemplate]);
      handleSimulateBackend({ ...templateData, id: newId, action: "create" });
    }

    setFormData({
      title: "",
      botName: "",
      category: "",
      description: "",
      image: null,
      imageUrl: null,
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedTemplateId(null);
  };

  const handleSimulateBackend = (templateData: Partial<TemplateData>) => {
    console.log("Simulating Backend Send - Template Data:", templateData);
    // API send to backend here
  };

  const filteredData = useMemo(() => {
    if (!searchTerm) {
      return templates;
    }
    const lowerSearchTerm = searchTerm.toLowerCase();
    return templates.filter((template) => {
      return (
        template.title.toLowerCase().includes(lowerSearchTerm) ||
        template.botName.toLowerCase().includes(lowerSearchTerm) ||
        template.category.toLowerCase().includes(lowerSearchTerm)
      );
    });
  }, [searchTerm, templates]);

  const templateCount = filteredData.length;

  const handleEdit = useCallback(
    (id: string) => {
      const templateToEdit = templates.find((t) => t.id === id);
      if (templateToEdit) {
        const { id, ...formValues } = templateToEdit;
        setFormData(formValues);
        setSelectedTemplateId(id);
        setIsEditModalOpen(true);
      }
    },
    [templates]
  );

  const handleRemove = useCallback((id: string) => {
    setTemplates((prevTemplates) => prevTemplates.filter((t) => t.id !== id));
    handleSimulateBackend({ id, action: "delete" });
  }, []);

  const renderActions = useCallback(
    (id: string) => {
      return (
        <div className="flex space-x-2">
          <button
            className="text-blue-600 hover:text-blue-800"
            onClick={() => handleEdit(id)}
          >
            Edit
          </button>
          <button
            className="text-red-600 hover:text-red-800"
            onClick={() => handleRemove(id)}
          >
            Remove
          </button>
        </div>
      );
    },
    [handleEdit, handleRemove]
  );

  const enhancedFilteredData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      actions: renderActions(item.id),
    }));
  }, [filteredData, renderActions]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imageUrl: URL.createObjectURL(file),
      });
    } else {
      setFormData({ ...formData, image: null, imageUrl: null });
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <TemplateManagerHeader
          activeTab={activeTab}
          onCreateTemplate={() => setIsCreateModalOpen(true)}
        />
        <TemplateSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <TemplateCount count={templateCount} />
        <TemplateTable columns={columns} data={enhancedFilteredData} />
        <TemplateCreateModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          fileInputRef={fileInputRef}
          categories={categories}
          setCategories={setCategories}
          handleImageChange={handleImageChange}
        />
        <TemplateEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          fileInputRef={fileInputRef}
          categories={categories}
          setCategories={setCategories}
          handleImageChange={handleImageChange}
        />
      </div>
    </Layout>
  );
}
