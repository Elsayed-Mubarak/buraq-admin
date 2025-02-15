"use client";
import React, { useState } from "react";
import { TypographySettings } from "@/app/types/Typography-types/TypographyTypes";
import axios from "axios";

const Typography: React.FC = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const [typographySettings, setTypographySettings] =
    useState<TypographySettings>({
      //buraqSettingsId:  "67a3506f4f9b9f1b523ee827",
      heading1: { fontStyle: "Barlow", size: 24 },
      heading2: { fontStyle: "Nunito", size: 20 },
      heading3: { fontStyle: "Nunito", size: 18 },
      heading4: { fontStyle: "Nunito", size: 16 },
      body1: { fontStyle: "Nunito", size: 14 },
      body2: { fontStyle: "Nunito", size: 13 },
      body3: { fontStyle: "Nunito", size: 11 },
      body4: { fontStyle: "Nunito", size: 9 },
    });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFontStyleChange = (
    type: keyof TypographySettings,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTypographySettings((prevSettings) => ({
      ...prevSettings,
      [type]: { ...prevSettings[type], fontStyle: event.target.value },
    }));
  };

  const handleFontSizeChange = (
    type: keyof TypographySettings,
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTypographySettings((prevSettings) => ({
      ...prevSettings,
      [type]: { ...prevSettings[type], size: parseInt(event.target.value, 10) },
    }));
  };

  const handleSaveSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null); // Clear any previous errors
    setSuccessMessage(null);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/dashboard/settings/typography`,
        { typographySettings, buraqSettingsId: "67a3506f4f9b9f1b523ee827" },
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        setSuccessMessage("Typography settings saved successfully!");
      } else {
        setError(`Server responded with status: ${res.status}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data.message ||
            error.message ||
            "An Axios error occurred"
        );
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading......</div>;
  return (
    <div className="m-4">
      {error && <div className="text-red-500">{error}</div>}{" "}
      {/* Display error message */}
      {successMessage && (
        <div className="text-green-500">{successMessage}</div>
      )}{" "}
      {/* Display success message */}
      <div className="flex h-full">
        <div className="ml-4 flex-1">
          <div className="border-gray-200 px-4 py-5 sm:px-6 rounded-md shadow-sm max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Typography
            </h2>
            <div className="grid grid-cols-2 gap-x-8">
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Heading 1
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="heading1-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="heading1-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading1.fontStyle}
                          onChange={(e) => handleFontStyleChange("heading1", e)}
                        >
                          <option value="Barlow">Barlow</option>{" "}
                          {/* Added value attributes */}
                          <option value="Robot">Robot</option>
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="heading1-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="heading1-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading1.size}
                          onChange={(e) => handleFontSizeChange("heading1", e)}
                        >
                          <option value="24">24</option>{" "}
                          {/* Added value attributes, consistent typing */}
                          <option value="28">28</option>
                          <option value="32">32</option>
                          <option value="36">36</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Heading 2
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="heading2-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="heading2-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading2.fontStyle}
                          onChange={(e) => handleFontStyleChange("heading2", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Open Sans">Open Sans</option>
                          <option value="Lato">Lato</option>
                          <option value="Slabo">Slabo</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="heading2-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="heading2-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading2.size}
                          onChange={(e) => handleFontSizeChange("heading2", e)}
                        >
                          <option value="20">20</option>
                          <option value="22">22</option>
                          <option value="24">24</option>
                          <option value="26">26</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Heading 3
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="heading3-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="heading3-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading3.fontStyle}
                          onChange={(e) => handleFontStyleChange("heading3", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Roboto Slab">Roboto Slab</option>
                          <option value="Merriweather">Merriweather</option>
                          <option value="Playfair Display">
                            Playfair Display
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="heading3-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="heading3-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading3.size}
                          onChange={(e) => handleFontSizeChange("heading3", e)}
                        >
                          <option value="18">18</option>
                          <option value="20">20</option>
                          <option value="22">22</option>
                          <option value="24">24</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Heading 4
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="heading4-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="heading4-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading4.fontStyle}
                          onChange={(e) => handleFontStyleChange("heading4", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Raleway">Raleway</option>
                          <option value="Poppins">Poppins</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="heading4-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="heading4-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.heading4.size}
                          onChange={(e) => handleFontSizeChange("heading4", e)}
                        >
                          <option value="16">16</option>
                          <option value="18">18</option>
                          <option value="20">20</option>
                          <option value="22">22</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Body 1
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="body1-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="body1-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body1.fontStyle}
                          onChange={(e) => handleFontStyleChange("body1", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Roboto">Roboto</option>
                          <option value="Lato">Lato</option>
                          <option value="Open Sans">Open Sans</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="body1-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="body1-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body1.size}
                          onChange={(e) => handleFontSizeChange("body1", e)}
                        >
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Body 2
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="body2-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="body2-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body2.fontStyle}
                          onChange={(e) => handleFontStyleChange("body2", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Merriweather Sans">
                            Merriweather Sans
                          </option>
                          <option value="Cabin">Cabin</option>
                          <option value="Assistant">Assistant</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="body2-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="body2-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body2.size}
                          onChange={(e) => handleFontSizeChange("body2", e)}
                        >
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Body 3
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="body3-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="body3-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body3.fontStyle}
                          onChange={(e) => handleFontStyleChange("body3", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Exo 2">Exo 2</option>
                          <option value="Fira Sans">Fira Sans</option>
                          <option value="Ubuntu">Ubuntu</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="body3-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="body3-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body3.size}
                          onChange={(e) => handleFontSizeChange("body3", e)}
                        >
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Body 4
                  </h3>
                  <div className="flex space-x-4">
                    <div>
                      <label
                        htmlFor="body4-font-style"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Font Style
                      </label>
                      <div className="relative">
                        <select
                          id="body4-font-style"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body4.fontStyle}
                          onChange={(e) => handleFontStyleChange("body4", e)}
                        >
                          <option value="Nunito">Nunito</option>
                          <option value="Overpass">Overpass</option>
                          <option value="PT Sans">PT Sans</option>
                          <option value="Karla">Karla</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="body4-size"
                        className="block text-gray-700 text-sm font-bold mb-1"
                      >
                        Size
                      </label>
                      <div className="relative">
                        <select
                          id="body4-size"
                          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                          value={typographySettings.body4.size}
                          onChange={(e) => handleFontSizeChange("body4", e)}
                        >
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-start">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleSaveSettings}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Typography;
