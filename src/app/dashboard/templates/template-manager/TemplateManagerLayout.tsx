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
import { TemplateData } from "@/app/types/TemplateTypes";
import { FormData } from "@/app/types/TemplateTypes";
import { TemplateManagerLayoutProps } from "@/app/types/templateManager-types/TemplateManagerTypes";
//import axios from "axios";

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
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState(initialCategories);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { image, ...restFormData } = formData;

    if (selectedTemplateId) {
      // EDIT CASE
      const updatedTemplates = templates.map((t): FormData => {
        if (t.id === selectedTemplateId) {
          return {
            ...t,
            title: String(restFormData.title || ""),
            botName: String(restFormData.botName || ""),
            category: String(restFormData.category || ""),
            description: String(restFormData.description || ""),
            image: image as File | null,
            imageUrl:
              typeof formData.imageUrl === "string"
                ? formData.imageUrl
                : t.imageUrl,
          };
        }
        return t;
      });
      setTemplates(updatedTemplates);

      handleSimulateBackend({
        ...restFormData,
        id: selectedTemplateId,
        image: image as File | null,
        action: "edit",
      });
    } else {
      // CREATE CASE
      const newId = uuidv4();
      const newTemplate: FormData = {
        id: newId,
        title: String(restFormData.title || ""),
        botName: String(restFormData.botName || ""),
        category: String(restFormData.category || ""),
        description: String(restFormData.description || ""),
        image: image as File | null,
        imageUrl:
          typeof formData.imageUrl === "string" ? formData.imageUrl : null,
      };
      setTemplates([...templates, newTemplate]);
      handleSimulateBackend({
        ...newTemplate,
        action: "create",
      });
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

        <TemplateTable  activeTab={activeTab} />
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
