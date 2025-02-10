"use client";
import React, { useState } from "react";
import Link from "next/link";

function HelpCenterConfig() {
  const [config, setConfig] = useState({
    readHelpArticles: true,
    title: "Help Articles",
    url: "https://help.buraq.ai/",
    createDesk: false,
    watchTutorialVideos: false,
    requestFeature: false,
    roadmap: false,
    whatsNew: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setConfig((prevConfig) => ({
      ...prevConfig,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = () => {
    // Here you would handle the save logic, sending data to backend etc.
  };

  return (
    <div className="m-4">
      <div className="flex h-full">

        <div className="ml-4 flex-1">
          <div className=" rounded-lg p-6 shadow-sm max-w-2xl border-gray-200">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Help Center</h2>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-4">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  className=" border-blue-500 text-blue-500 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                  aria-current="page"
                >
                  Config
                </button>
                <Link
                  href={"help-center/articles"}
                  className="border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Articles
                </Link>
              </nav>
            </div>

            <div>
              <div className="mb-4 flex items-center">
                <input
                  id="read-help-articles"
                  name="readHelpArticles"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={config.readHelpArticles}
                  onChange={handleChange}
                />
                <label
                  htmlFor="read-help-articles"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Read help articles
                </label>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="Help Articles"
                  value={config.title}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  URL
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  placeholder="https://help.buraq.ai/"
                  value={config.url}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="create-desk"
                    name="createDesk"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={config.createDesk}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="create-desk"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Create a desk
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="watch-tutorial-videos"
                    name="watchTutorialVideos"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={config.watchTutorialVideos}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="watch-tutorial-videos"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Watch tutorial videos
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="request-feature"
                    name="requestFeature"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={config.requestFeature}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="request-feature"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Request feature
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="roadmap"
                    name="roadmap"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={config.roadmap}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="roadmap"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Roadmap
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="whats-new"
                    name="whatsNew"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={config.whatsNew}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="whats-new"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    What&apos;s new
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenterConfig;
