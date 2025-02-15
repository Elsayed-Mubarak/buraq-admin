"use client";

import React, { useState, useMemo, useRef } from "react";
import Layout from "@/components/layout/Layout";

import TemplateManagerHeader from "./template-manager/TemplateManagerHeader";
import TemplateSearch from "./template-manager/TemplateSearch";
import TemplateCount from "./template-manager/TemplateCount";
import TemplateTable from "./template-manager/TemplateTable";
import TemplateCreateModal from "./template-manager/TemplateCreateModal";
import TemplateEditModal from "./template-manager/TemplateEditModal";
import { FormData } from "@/app/types/TemplateTypes";
import { v4 as uuidv4 } from "uuid";
import TemplateNav from "@/components/common/TemplateNav/TemplateNav";



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



export default function Page() {

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
  // Dummy Tempaltes to display i will be removed
  const [templates, setTemplates] = useState<FormData[]>([
    {
      id: uuidv4(), // we should replace it using josn file
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
    const templateData = { ...restFormData, image };
    if (selectedTemplateId) {
      setTemplates(
        templates.map((t) =>
          t.id === selectedTemplateId
            ? ({
                ...restFormData,
                id: selectedTemplateId,
                imageUrl: formData.imageUrl || t.imageUrl,
              } as FormData)
            : t
        )
      );
      // can be removed in the sprint
      handleSimulateBackend({
        ...templateData,
        id: selectedTemplateId,
        action: "edit",
      });
    } else {
      const newId = uuidv4();
      setTemplates([
        ...templates,
        {
          ...restFormData,
          id: newId,
          imageUrl: null,
        } as FormData,
      ]);
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

  const handleSimulateBackend = (templateData: unknown) => {
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


  
  const [activeTab, setActiveTab] = useState('Web');

  const handleTabChange = (tab : string) => {
    setActiveTab(tab);
  };



  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        {/* Use the new Header Component */}


        <TemplateManagerHeader
          activeTab={activeTab || "web"}
          onCreateTemplate={() => setIsCreateModalOpen(true)}
        />

        <TemplateSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <TemplateCount count={templateCount} />


        <TemplateNav activeTab={activeTab} onTabChange={handleTabChange} />


        <TemplateTable activeTab={activeTab} />


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
