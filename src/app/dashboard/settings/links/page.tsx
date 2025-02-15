"use client";
import { LinksState } from "@/app/types/Links-types/LinksTypes";
import axios from "axios";
import React, { useState, ChangeEvent, FormEvent } from "react";

export default function Links() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [links, setLinks] = useState<LinksState>({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateUrl = (url: string): boolean => {
    if (!url) return true; // Empty URLs are allowed
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLinks((prev) => ({ ...prev, [id]: value }));
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Validate all URLs
    const invalidUrls = Object.entries(links)
      .filter(([, value]) => value && !validateUrl(value))
      .map(([key]) => key);

    if (invalidUrls.length > 0) {
      setError(`Please enter valid URLs for: ${invalidUrls.join(", ")}`);
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await axios.post(
        `${BASE_URL}/api/dashboard/settings/add-social-links`,
        {
          socialLinks: links,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSuccessMessage("Social links updated successfully");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Failed to update social links"
        );
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="m-4">
      <div className="flex h-full">
        <div className="ml-4 flex-1">
          <div className="border-gray-200 px-4 py-5 sm:px-6 rounded-md shadow-sm max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Social Media Links
            </h2>

            {error && (
              <div
                className="mb-4 p-4 text-red-700 bg-red-100 rounded-md"
                role="alert"
              >
                {error}
              </div>
            )}

            {successMessage && (
              <div
                className="mb-4 p-4 text-green-700 bg-green-100 rounded-md"
                role="alert"
              >
                {successMessage}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {Object.entries(links).map(([platform, value]) => (
                  <div key={platform} className="mb-4">
                    <label
                      htmlFor={platform}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}{" "}
                      Profile URL
                    </label>
                    <input
                      type="text"
                      id={platform}
                      placeholder={`https://${platform}.com/`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={value}
                      onChange={handleChange}
                    />
                    <span className="block text-gray-500 text-xs mt-1">
                      URL of your{" "}
                      {platform.charAt(0).toUpperCase() + platform.slice(1)}{" "}
                      profile
                    </span>
                  </div>
                ))}

                <div className="flex items-center justify-end">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
