"use client";
import React, { useState } from "react";
import { settingsNavigation } from "../commonSettings/Common";
import Layout from "@/components/layout/Layout";

export default function Defaults() {
  // State for Default Language Section
  const [customerPortalLanguage, setCustomerPortalLanguage] =
    useState<string>("English");
  const [chatWidgetLanguage, setChatWidgetLanguage] =
    useState<string>("English");

  // State for Default Bot Section
  const [defaultBot, setDefaultBot] = useState<string>("Untitled Bot");

  // State for Default Bot Logos Section
  const [widgetIcon, setWidgetIcon] = useState<string>("widget_icon-64px.png");
  const [headerLogo, setHeaderLogo] = useState<string>("header_logo-512px.png");
  const [botIcon, setBotIcon] = useState<string>("bot_icon-512px.png");

  // Mock function to simulate sending data to the backend
  const saveDefaults = async () => {
    const data = {
      customerPortalLanguage,
      chatWidgetLanguage,
      defaultBot,
      widgetIcon,
      headerLogo,
      botIcon,
    };

    // Simulate an API call
    console.log("Saving defaults...", data);
    try {
      // Here you would typically use fetch or axios to send the data to the backend
      // await fetch('/api/saveDefaults', { method: 'POST', body: JSON.stringify(data) });
      console.log("Defaults saved successfully!");
    } catch (error) {
      console.error("Failed to save defaults:", error);
    }
  };

  return (
    <div className="m-4 h-full">
      {" "}
      {/* Added h-full to the outer div */}
      <div className="flex h-full">
        {" "}
        {/* Keep h-full here as well */}
       
        {/* Defaults Content */}
        <div className="ml-4 flex-1">
          {" "}
          {/* Added ml-4 and flex-1 */}
          <div className="border-gray-200 rounded-lg shadow-sm max-w-xl">
            <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
              <h2 className="text-lg font-semibold text-gray-900">Defaults</h2>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {/* Default Language Section */}
              <section className="mb-8">
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Default Language
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  The default language which will be set for all new accounts
                  created on your instance.
                </p>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="customer-portal-language"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Customer portal
                    </label>
                    <select
                      id="customer-portal-language"
                      className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      value={customerPortalLanguage}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setCustomerPortalLanguage(e.target.value)
                      }
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="chat-widget-language"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Chat widget
                    </label>
                    <select
                      id="chat-widget-language"
                      className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      value={chatWidgetLanguage}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setChatWidgetLanguage(e.target.value)
                      }
                    >
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={saveDefaults}
                  >
                    Save
                  </button>
                </div>
              </section>

              {/* Default Bot Section */}
              <section className="mb-8">
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Default Bot
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  The default bot which will be added to all new accounts
                  created in this instance.
                </p>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="default-bot"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Bot
                    </label>
                    <select
                      id="default-bot"
                      className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      value={defaultBot}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setDefaultBot(e.target.value)
                      }
                    >
                      <option>Untitled Bot</option>
                      <option>Support Bot</option>
                      <option>Sales Bot</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={saveDefaults}
                  >
                    Save
                  </button>
                </div>
              </section>

              {/* Default Bot Logos Section */}
              <section>
                <h3 className="text-md font-semibold text-gray-900 mb-2">
                  Default Bot Logos
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  The default bot logos will be displayed on the chat widget
                  when deployed to a website.
                </p>

                <div className="space-y-6">
                  {/* Widget Icon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Widget Icon
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {widgetIcon}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        id="widget-icon-upload"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setWidgetIcon(
                            e.target.files && e.target.files[0]?.name
                              ? e.target.files[0].name
                              : widgetIcon
                          )
                        }
                      />
                      <label
                        htmlFor="widget-icon-upload"
                        className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        Upload
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a PNG, JPG, JPEG or GIF file of 64 x 64.
                    </p>
                  </div>

                  {/* Header Logo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Header Logo
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {headerLogo}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        id="header-logo-upload"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setHeaderLogo(
                            e.target.files && e.target.files[0]?.name
                              ? e.target.files[0].name
                              : headerLogo
                          )
                        }
                      />
                      <label
                        htmlFor="header-logo-upload"
                        className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        Upload
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a PNG, JPG, JPEG or GIF file of 512 x 80.
                    </p>
                  </div>

                  {/* Bot Icon */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bot Icon
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                        {botIcon}
                      </span>
                      <input
                        type="file"
                        className="hidden"
                        id="bot-icon-upload"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          setBotIcon(
                            e.target.files && e.target.files[0]?.name
                              ? e.target.files[0].name
                              : botIcon
                          )
                        }
                      />
                      <label
                        htmlFor="bot-icon-upload"
                        className="inline-flex items-center px-4 rounded-r-md border border-l-0 border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
                      >
                        Upload
                      </label>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Upload a PNG, JPG, JPEG or GIF file of 512 x 512.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={saveDefaults}
                  >
                    Save
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
