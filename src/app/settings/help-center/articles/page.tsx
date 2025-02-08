"use client";
import React, { useState, Fragment } from "react";
import SettingsSidebar from "../../SettingsSidebar";
import { settingsNavigation } from "../../commonSettings/Common";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import {
  FaChevronLeft,
  FaChevronRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaSearch,
  FaArrowUp,
} from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";

interface Article {
  id: number;
  useCase: string;
  helpArticlesURL: string;
}

const initialDummyData: Article[] = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  useCase: `Use Case ${i + 1}`,
  helpArticlesURL: "",
}));

function Articles() {
  const [articles, setArticles] = useState<Article[]>(initialDummyData);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter((article) =>
    article.useCase.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredArticles.length / rowsPerPage);
  const indexOfLastArticle = currentPage * rowsPerPage;
  const indexOfFirstArticle = indexOfLastArticle - rowsPerPage;
  const currentArticles = filteredArticles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.max(1, Math.min(newPage, totalPages)));
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const handleEditClick = (article: Article) => {
    setEditingArticle(article);
    setIsDialogOpen(true);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editingArticle) {
      setEditingArticle({
        ...editingArticle,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSaveClick = async () => {
    if (!editingArticle) return;

    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedArticles = articles.map((article) =>
        article.id === editingArticle.id ? editingArticle : article
      );
      setArticles(updatedArticles);
      closeDialog();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingArticle(null);
  };

  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (loading) return <div className="text-blue-500">Loading...</div>;

  return (
    <div className="m-4">
      <div className="flex h-full">
        <Layout>
          <SettingsSidebar settingsNavigation={settingsNavigation} />
        </Layout>
        <div className="ml-4 flex-1">
          <div className="rounded-lg p-6 shadow-sm border-gray-200">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Help Center</h2>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-4">
              <nav className="-mb-px flex space-x-8">
                <Link
                  href={"/settings/help-center"}
                  className="border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Config
                </Link>
                <button className="border-blue-500 text-blue-500 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm">
                  Articles
                </button>
              </nav>
            </div>

            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Search help articles"
                className="w-50 pl-10 pr-4 py-2 border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            </div>

            <p className="mb-4 text-gray-700">
              {filteredArticles.length} Help articles
            </p>

            <div className="overflow-x-auto overflow-y-auto max-h-[400px]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Use Case <FaArrowUp className="inline-block ml-1" />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Help Articles URL
                    </th>
                    <th className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentArticles.map((article) => (
                    <tr key={article.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {article.useCase}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {article.helpArticlesURL || "-"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditClick(article)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{" "}
                    <span className="font-medium">
                      {indexOfFirstArticle + 1}
                    </span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastArticle, filteredArticles.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredArticles.length}
                    </span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <label htmlFor="rowsPerPage" className="mr-2">
                    Rows per page:
                  </label>
                  <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={handleRowsPerPageChange}
                    className="border rounded-md px-2 py-1"
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button
                      onClick={() => handlePageChange(1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">First</span>
                      <FaAngleDoubleLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Previous</span>
                      <FaChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Next</span>
                      <FaChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handlePageChange(totalPages)}
                      disabled={currentPage === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                      <span className="sr-only">Last</span>
                      <FaAngleDoubleRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>

            <Transition.Root show={isDialogOpen} as={Fragment}>
              <Dialog as="div" className="relative z-10" onClose={closeDialog}>
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                      enterTo="opacity-100 translate-y-0 sm:scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                      leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                      <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                        <div>
                          <Dialog.Title
                            as="h3"
                            className="text-lg font-semibold leading-6 text-gray-900"
                          >
                            Edit Article
                          </Dialog.Title>
                          <div className="mt-2">
                            <label
                              htmlFor="article-useCase"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Use Case:
                            </label>
                            {editingArticle && (
                              <input
                                type="text"
                                id="article-useCase"
                                name="useCase"
                                value={editingArticle.useCase}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            )}
                          </div>
                          <div className="mt-2">
                            <label
                              htmlFor="article-url"
                              className="block text-sm font-medium text-gray-700"
                            >
                              URL:
                            </label>
                            {editingArticle && (
                              <input
                                type="text"
                                id="article-url"
                                name="helpArticlesURL"
                                value={editingArticle.helpArticlesURL}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                              />
                            )}
                          </div>
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                            onClick={closeDialog}
                          >
                            Cancel
                          </button>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </Dialog>
            </Transition.Root>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
