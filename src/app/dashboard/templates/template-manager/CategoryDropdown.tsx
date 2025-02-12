"use client";

import React, { useState, useMemo } from "react";
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { CategoryDropdownProps } from "@/app/types/templateManager-types/TemplateManagerTypes";

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  formData,
  setFormData,
  categories,
  setCategories,
}) => {
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editedCategoryName, setEditedCategoryName] = useState("");

  const filteredCategories = useMemo(() => {
    const lowerSearchTerm = categorySearchTerm.toLowerCase();
    return categories.filter((category) =>
      category.toLowerCase().includes(lowerSearchTerm)
    );
  }, [categorySearchTerm, categories]);

  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category });
    setIsCategoryListOpen(false);
  };

  const handleCreateCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleStartEditingCategory = (category: string) => {
    setEditingCategory(category);
    setEditedCategoryName(category);
    setIsCategoryListOpen(false);
  };

  const handleSaveEditedCategory = (originalCategory: string) => {
    if (editedCategoryName.trim()) {
      const updatedCategories = categories.map((cat) =>
        cat === originalCategory ? editedCategoryName.trim() : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setEditedCategoryName("");
      setIsCategoryListOpen(true);
    }
  };

  const handleCancelEditingCategory = () => {
    setEditingCategory(null);
    setEditedCategoryName("");
    setIsCategoryListOpen(true);
  };

  const handleDeleteCategory = (categoryToDelete: string) => {
    const updatedCategories = categories.filter(
      (cat) => cat !== categoryToDelete
    );
    setCategories(updatedCategories);
    setIsCategoryListOpen(true);
  };

  return (
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
                onChange={(e) => setCategorySearchTerm(e.target.value)}
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
                          onClick={() => handleSaveEditedCategory(category)}
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
                          onClick={() => handleStartEditingCategory(category)}
                        >
                          <PencilIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                        </button>
                        <button onClick={() => handleDeleteCategory(category)}>
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
  );
};

export default CategoryDropdown;
