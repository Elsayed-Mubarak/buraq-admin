"use client";

import React, { useState, useMemo, useRef } from "react";
import Layout from "@/components/layout/Layout";

import TemplateManagerHeader from "./TemplateManagerHeader";
import TemplateSearch from "./TemplateSearch";
import TemplateCount from "./TemplateCount";
import TemplateTable from "./TemplateTable";
import TemplateCreateModal from "./TemplateCreateModal";
import TemplateEditModal from "./TemplateEditModal";

import { v4 as uuidv4 } from "uuid";

interface TemplateFormData {
  id: string;
  title: string;
  botName: string;
  category: string;
  description: string;
  image?: File | null;
  imageUrl?: string | null;
}

interface TemplateManagerLayoutProps {
  activeTab: string;
}

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

const columns = [
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
  const [formData, setFormData] = useState<Omit<TemplateFormData, "id">>({
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
  // Dummy Tempaltes to display i will be removed
  const [templates, setTemplates] = useState<TemplateFormData[]>([
    {
      id: uuidv4(), // we should replace it using josn file
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
              ...t, // Keep existing properties
              ...restFormData, // Override with form data
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

  const handleSimulateBackend = (templateData: any) => {
    console.log("Simulating Backend Send - Template Data:", templateData);
    // api send to backend here
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

  const handleEdit = (id: string) => {
    const templateToEdit = templates.find((t) => t.id === id);
    if (templateToEdit) {
      const { id: omittedId, ...formValues } = templateToEdit;
      setFormData(formValues);
      setSelectedTemplateId(id);
      setIsEditModalOpen(true);
    }
  };

  const handleRemove = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    handleSimulateBackend({ id, action: "delete" });
  };

  const renderActions = (id: string) => {
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
  };

  const enhancedFilteredData = useMemo(() => {
    return filteredData.map((item) => ({
      ...item,
      actions: renderActions(item.id),
    }));
  }, [filteredData]);

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
        {/* Use the new Header Component */}
        <TemplateManagerHeader
          activeTab={activeTab}
          onCreateTemplate={() => setIsCreateModalOpen(true)}
        />

        {/* Use the new Search Component */}
        <TemplateSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Use the new Template Count Component */}
        <TemplateCount count={templateCount} />

        {/* Use the new Table Component */}
        <TemplateTable columns={columns} data={enhancedFilteredData} />

        {/* Use the new Create Modal Component */}
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

        {/* Use the new Edit Modal Component */}
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
