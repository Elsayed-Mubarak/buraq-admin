"use client";

import React, { useState, useMemo, useRef } from "react";
import Link from "next/link";
import Table from "@/components/common/Table";
import Modal from "@/components/common/Modal"; // Import Modal component
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import Layout from "@/components/layout/Layout";
import { FaLongArrowAltUp } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const columns = [
  { key: "title", header: "Title" },
  { key: "botName", header: "Bot Name" },
  { key: "category", header: "Category" },
  { key: "actions", header: "" },
];

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
  children?: ReactNode;
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

export default function TemplateManagerLayout({
  activeTab,
  children,
}: TemplateManagerLayoutProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  const [templates, setTemplates] = useState<TemplateFormData[]>([
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
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [categories, setCategories] = useState(initialCategories); // Manage categories
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");
  const tabs = ["Web", "Facebook", "WhatsApp", "SMS", "Instagram"];
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { image, ...restFormData } = formData;
    const templateData = { ...restFormData, image }; // Prepare data for backend simulation
    if (selectedTemplateId) {
      // Editing existing template
      setTemplates(
        templates.map((t) =>
          t.id === selectedTemplateId
            ? ({
                ...restFormData,
                id: selectedTemplateId,
                imageUrl: formData.imageUrl || t.imageUrl,
              } as TemplateFormData)
            : t
        )
      );
      handleSimulateBackend({
        ...templateData,
        id: selectedTemplateId,
        action: "edit",
      }); // Simulate backend edit
    } else {
      // Creating a new template
      const newId = uuidv4();
      setTemplates([
        ...templates,
        {
          ...restFormData,
          id: newId,
          imageUrl: null,
        } as TemplateFormData,
      ]);
      handleSimulateBackend({ ...templateData, id: newId, action: "create" }); // Simulate backend create
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
    setCategorySearchTerm("");
    setIsCategoryListOpen(false);
  };

  const handleSimulateBackend = (templateData: any) => {
    console.log("Simulating Backend Send - Template Data:", templateData);
    // Example: fetch('/api/templates', { method: 'POST', body: JSON.stringify(templateData) });
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
      setCategorySearchTerm(formValues.category);
      setIsCategoryListOpen(false); // Ensure category list is closed when editing
    }
  };

  const handleRemove = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    handleSimulateBackend({ id, action: "delete" }); // Simulate backend delete
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

  const enhancedFilteredData = filteredData.map((item) => ({
    ...item,
    actions: renderActions(item.id),
  }));

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

  const filteredCategories = useMemo(() => {
    const lowerSearchTerm = categorySearchTerm.toLowerCase();
    return categories.filter((category) =>
      category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [categorySearchTerm, categories]);

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
    setIsCategoryListOpen(false); // Close list after selection
  };

  const handleCreateCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory(""); // Clear input
    }
  };

  const handleStartEditingCategory = (category: string) => {
    setEditingCategory(category);
    setEditedCategoryName(category);
    setIsCategoryListOpen(false); // Close list
  };

  const handleSaveEditedCategory = (originalCategory: string) => {
    if (editedCategoryName.trim()) {
      const updatedCategories = categories.map((cat) =>
        cat === originalCategory ? editedCategoryName.trim() : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setEditedCategoryName("");
      setIsCategoryListOpen(true); // Re-open list after editing
    }
  };

  const handleCancelEditingCategory = () => {
    setEditingCategory(null);
    setEditedCategoryName("");
    setIsCategoryListOpen(true); // Re-open list after cancel
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    const updatedCategories = categories.filter(
      (cat) => cat !== categoryToDelete
    );
    setCategories(updatedCategories);
    setIsCategoryListOpen(true); // Re-open list after delete
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">
            Template Manager
          </h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mt-4 sm:mt-0 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Create Template
          </button>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => (
              <Link
                key={tab}
                href={`/templates/${tab.toLowerCase()}`}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${
                    activeTab && activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }
                `}
              >
                {tab}
              </Link>
            ))}
          </nav>
        </div>

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
          <div className="mt-2 text-sm font-semibold text-black-500">
            {templateCount} Templates
          </div>
        </div>

        <div className="mt-6 bg-white shadow rounded-lg">
          {children ? (
            children
          ) : (
            <Table columns={columns} data={enhancedFilteredData} />
          )}
        </div>

        {/* Create Modal */}
        <Modal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          title="Create Template"
          buttonTitle="Create Template"
          onClick={handleSubmit}
          isCloseButton={true}
        >
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Image Upload */}
              <div className="mb-4">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="mx-auto h-24 w-24 object-cover rounded-full"
                      />
                    ) : (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Bot Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Bot Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.botName}
                  onChange={(e) =>
                    setFormData({ ...formData, botName: e.target.value })
                  }
                />
              </div>

              {/* Category */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    className="relative block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isCategoryListOpen}
                  >
                    <span className="block truncate">
                      {formData.category || "Select"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>

                  {isCategoryListOpen && (
                    <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="relative p-2">
                        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search category"
                          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={categorySearchTerm}
                          onChange={(e) =>
                            setCategorySearchTerm(e.target.value)
                          }
                        />
                      </div>
                      <ul className="divide-y divide-gray-200" role="listbox">
                        {filteredCategories.map((category) => (
                          <li
                            key={category}
                            className="relative cursor-pointer select-none px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleCategorySelect(category)}
                          >
                            <span className="block truncate">{category}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              {editingCategory === category ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleSaveEditedCategory(category)
                                    }
                                  >
                                    <svg
                                      className="h-5 w-5 text-green-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </button>
                                  <button onClick={handleCancelEditingCategory}>
                                    <svg
                                      className="h-5 w-5 text-red-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleStartEditingCategory(category)
                                    }
                                  >
                                    <PencilIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteCategory(category)
                                    }
                                  >
                                    <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700" />
                                  </button>
                                </div>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-200">
                        <div className="relative p-4 flex items-center space-x-3">
                          <input
                            type="text"
                            placeholder="Create Category"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" ? handleCreateCategory() : null
                            }
                          />
                          <button
                            onClick={handleCreateCategory}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
        </Modal>

        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title="Edit Template"
          buttonTitle="Save Template"
          onClick={handleSubmit}
          isCloseButton={true}
        >
          <div className="p-6">
            <form onSubmit={handleSubmit} className="mt-4">
              {/* Image Upload */}
              <div className="mb-4">
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {formData.imageUrl ? (
                      <img
                        src={formData.imageUrl}
                        alt="Preview"
                        className="mx-auto h-24 w-24 object-cover rounded-full"
                      />
                    ) : (
                      <PhotoIcon
                        className="mx-auto h-12 w-12 text-gray-300"
                        aria-hidden="true"
                      />
                    )}

                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="edit-file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="edit-file-upload"
                          name="edit-file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImageChange}
                          ref={fileInputRef}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              {/* Bot Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Bot Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.botName}
                  onChange={(e) =>
                    setFormData({ ...formData, botName: e.target.value })
                  }
                />
              </div>

              {/* Category - Reusing the same Category UI as Create Modal */}
              <div className="mb-4 relative">
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <div className="mt-1 relative">
                  <button
                    type="button"
                    className="relative block w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                    onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
                    aria-haspopup="listbox"
                    aria-expanded={isCategoryListOpen}
                  >
                    <span className="block truncate">
                      {formData.category || "Select"}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>

                  {isCategoryListOpen && (
                    <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="relative p-2">
                        <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search category"
                          className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          value={categorySearchTerm}
                          onChange={(e) =>
                            setCategorySearchTerm(e.target.value)
                          }
                        />
                      </div>
                      <ul className="divide-y divide-gray-200" role="listbox">
                        {filteredCategories.map((category) => (
                          <li
                            key={category}
                            className="relative cursor-pointer select-none px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={() => handleCategorySelect(category)}
                          >
                            <span className="block truncate">{category}</span>
                            <span className="absolute inset-y-0 right-0 flex items-center pr-4">
                              {editingCategory === category ? (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleSaveEditedCategory(category)
                                    }
                                  >
                                    <svg
                                      className="h-5 w-5 text-green-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </button>
                                  <button onClick={handleCancelEditingCategory}>
                                    <svg
                                      className="h-5 w-5 text-red-500"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              ) : (
                                <div className="flex space-x-2">
                                  <button
                                    onClick={() =>
                                      handleStartEditingCategory(category)
                                    }
                                  >
                                    <PencilIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteCategory(category)
                                    }
                                  >
                                    <TrashIcon className="h-4 w-4 text-red-500 hover:text-red-700" />
                                  </button>
                                </div>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t border-gray-200">
                        <div className="relative p-4 flex items-center space-x-3">
                          <input
                            type="text"
                            placeholder="Create Category"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onKeyDown={(e) =>
                              e.key === "Enter" ? handleCreateCategory() : null
                            }
                          />
                          <button
                            onClick={handleCreateCategory}
                            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          >
                            Create
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </form>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
