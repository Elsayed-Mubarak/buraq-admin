"use client";
import React, { useState } from "react";
import SettingsSidebar from "../../SettingsSidebar";
import { settingsNavigation } from "../../commonSettings/Common";
import Layout from "@/components/layout/Layout";
import Link from "next/link";

// dummy articles wait to make call with elsayed show this section again
function Articles() {
  const [articlesData, setArticlesData] = useState({
    title: "My Article Title",
    content: "This is the content of my article.",
  });

  return (
    <div className="m-4">
      <div className="flex h-full">
        <Layout>
          <SettingsSidebar settingsNavigation={settingsNavigation} />
        </Layout>
        <div className="ml-4 flex-1">
          <div className=" rounded-lg p-6 shadow-sm max-w-2xl border-gray-200">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900">
                Help Center Articles
              </h2>
            </div>
            <div className="border-b border-gray-200 pb-2 mb-4">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <Link
                  href={"/settings/help-center/config"} // Corrected path
                  className="border-transparent text-gray-500 hover:text-gray-700 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                >
                  Config
                </Link>
                <button
                  className="border-blue-500 text-blue-500 whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm"
                  aria-current="page"
                  onChange={() => {
                    setArticlesData((prev) => ({
                      ...prev
                    }))
                  }}
                >
                  Articles
                </button>
              </nav>
            </div>

            <div>
              <p>This is the articles section.</p>
              {/* Example Usage of state. You'd replace this with actual article rendering logic */}
              <p>
                <b>Title:</b> {articlesData.title}
              </p>
              <p>{articlesData.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Articles;
