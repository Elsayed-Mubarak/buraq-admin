'use client'
import Image from "next/image";
import { useState } from "react";

export default function GeneralSettings() {
  const [generalData, setGeneralData] = useState({
    productName: "Buraq",
    fullLogo: null as File | null,
    logoWithoutWordmark: null as File | null,
    favicon: null as File | null,
  });

  // Handle file selection
  const handleFileChange = (
    field: keyof typeof generalData,
    file: File | null
  ) => {
    if (file) {
      setGeneralData({
        ...generalData,
        [field]: file,
      });
    }
  };

  // Remove selected file
  const removeFile = (field: keyof typeof generalData) => {
    setGeneralData({
      ...generalData,
      [field]: null,
    });
  };

  return (
    <div className=" border-gray-200 px-4 py-5 sm:px-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">General</h2>
      <div className="space-y-6">
        {/* Product Name */}
        <div className="flex flex-col max-w-lg">
          <label className="block text-sm font-bold text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            value={generalData.productName}
            onChange={(e) =>
              setGeneralData({
                ...generalData,
                productName: e.target.value,
              })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <p className="text-sm text-gray-500">
            This name will be used across all areas of the whitelabel where
            product name is needed.
          </p>
        </div>

        {/* Full Logo (with Wordmark) */}
        <div className="flex flex-col max-w-lg">
          <label className="block text-sm font-bold text-gray-700">
            Full Logo (with Wordmark)
          </label>
          <p className="text-sm text-gray-500">
            This logo will appear on the login and signup pages. Upload an SVG
            file.
          </p>
          <div className="mt-1 flex items-center space-x-4">
            {generalData.fullLogo ? (
              <div className="flex items-center">
                <Image
                  src={URL.createObjectURL(generalData.fullLogo)} // Dynamically display the selected file
                  alt="Full Logo"
                  width={100}
                  height={50}
                  className="mr-4"
                />
                <span className="text-gray-700">
                  {generalData.fullLogo.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile("fullLogo")}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/svg+xml" // Use MIME type for SVG files
                onChange={(e) =>
                  handleFileChange("fullLogo", e.target.files?.[0] || null)
                }
                className="mt-1 max-w-lg"
              />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a SVG file.</p>
        </div>

        {/* Full Logo (without Wordmark) */}
        <div className="flex flex-col max-w-lg">
          <label className="block text-sm font-bold text-gray-700">
            Full Logo (without Wordmark)
          </label>
          <p className="text-sm text-gray-500">
            This logo will appear on the navigation bar. Upload an SVG file.
          </p>
          <div className="mt-1 flex items-center space-x-4">
            {generalData.logoWithoutWordmark ? (
              <div className="flex items-center">
                <Image
                  src={URL.createObjectURL(generalData.logoWithoutWordmark)} // Dynamically display the selected file
                  alt="Logo without Wordmark"
                  width={50}
                  height={50}
                  className="mr-4"
                />
                <span className="text-gray-700">
                  {generalData.logoWithoutWordmark.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile("logoWithoutWordmark")}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/svg+xml" // Use MIME type for SVG files
                onChange={(e) =>
                  handleFileChange(
                    "logoWithoutWordmark",
                    e.target.files?.[0] || null
                  )
                }
                className="mt-1 max-w-lg"
              />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a SVG file.</p>
        </div>

        {/* Fav Icon */}
        <div className="flex flex-col max-w-lg">
          <label className="block text-sm font-bold text-gray-700">
            Fav Icon
          </label>
          <p className="text-sm text-gray-500">
            This logo will appear on the browser tab. Upload an SVG file.
          </p>
          <div className="mt-1 flex items-center space-x-4">
            {generalData.favicon ? (
              <>
                <span className="text-gray-700">
                  {generalData.favicon.name}
                </span>
                <button
                  type="button"
                  onClick={() => removeFile("favicon")}
                  className="text-red-600 hover:text-red-800 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <input
                type="file"
                accept="image/svg+xml" // Use MIME type for SVG files
                onChange={(e) =>
                  handleFileChange("favicon", e.target.files?.[0] || null)
                }
                className="mt-1 max-w-lg"
              />
            )}
          </div>
          <p className="text-sm text-gray-500 mt-2">Upload a SVG file.</p>
        </div>

        {/* Save Button */}
        <div className="flex justify-start">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
