"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Table from "@/components/common/Table";
import { Dialog } from "@headlessui/react";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Layout from "@/components/layout/Layout";
import { FaLongArrowAltUp } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid"; // Import uuid for generating unique IDs

const columns = [
  { key: "title", header: "Title" },
  { key: "botName", header: "Bot Name" },
  { key: "category", header: "Category" },
  { key: "actions", header: "" },
];

interface TemplateFormData {
  id: string; // Make ID required
  title: string;
  botName: string;
  category: string;
  description: string;
  image?: File;
}

interface TemplateManagerLayoutProps {
  activeTab: string;
  children?: ReactNode;
}

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
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(
    null
  ); // To store the ID of the template being edited

  const [templates, setTemplates] = useState<TemplateFormData[]>([
    {
      id: uuidv4(),
      title: "Pizza Restaurant Chatbot",
      botName: "WEB - Pizza Restaurant Chatbot",
      category: "Hospitality",
      description: "", 
    },
    {
      id: uuidv4(),
      title: "Scheduling Site Visit for Real Estate",
      botName: "WEB - Scheduling Site Visit for Real Estate",
      category: "Real Estate",
      description: "", 
    },
    {
      id: uuidv4(),
      title: "Facebook Post Template 2",
      botName: "FB - Post Template 2",
      category: "Engagement",
      description: "", 
    },
    {
      id: uuidv4(),
      title: "SMS Welcome Message",
      botName: "SMS - Welcome",
      category: "Welcome",
      description: "", 
    },
    {
      id: uuidv4(),
      title: "Web Restaurant Chatbot",
      botName: "WEB - Restaurant",
      category: "Hospitality",
      description: "", 
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const tabs = ["Web", "Facebook", "WhatsApp", "SMS", "Instagram"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplateId) {
      // Editing existing template
      setTemplates(
        templates.map((t) =>
          t.id === selectedTemplateId
            ? ({ ...formData, id: selectedTemplateId } as TemplateFormData)
            : t
        )
      );
    } else {
      // Creating a new template
      const newId = uuidv4();
      setTemplates([
        ...templates,
        { ...formData, id: newId } as TemplateFormData,
      ]);
    }

    setFormData({ title: "", botName: "", category: "", description: "" });
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedTemplateId(null);
  };
// prevent many rerenders
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
  return (
    <Layout>H
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
          {/* Search Input */}
          <div className="relative inline-block w-64">
            {" "}
            {/* Restrict width */}
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
            <input
              type="text"
              placeholder="Search Templates"
              className="block w-full pl-10 pr-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* Template Count */}
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
        <Dialog
          open={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-xl bg-white rounded-lg shadow-xl">
              <div className="p-6">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Create Template
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4">
                  {/* Image Upload */}
                  <div className="mb-4">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
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
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
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
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="">Select a category</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="lead-generation">Lead Generation</option>
                    </select>
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

                  {/* Actions */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsCreateModalOpen(false)}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                      Create Template
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Edit Modal */}
        <Dialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="mx-auto max-w-xl bg-white rounded-lg shadow-xl">
              <div className="p-6">
                <Dialog.Title className="text-lg font-medium text-gray-900">
                  Edit Template
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="mt-4">
                  {/* Image Upload */}
                  <div className="mb-4">
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                      <div className="text-center">
                        <PhotoIcon
                          className="mx-auto h-12 w-12 text-gray-300"
                          aria-hidden="true"
                        />
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
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">
                          PNG, JPG, GIF up to 10MB
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
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      <option value="">Select a category</option>
                      <option value="hospitality">Hospitality</option>
                      <option value="real-estate">Real Estate</option>
                      <option value="lead-generation">Lead Generation</option>
                    </select>
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

                  {/* Actions */}
                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </Layout>
  );
}
