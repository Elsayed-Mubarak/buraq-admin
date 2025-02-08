"use client";

import React, { useState, ChangeEvent } from "react";

interface ColorsState {
  accentPrimary: string;
  accentSecondary: string;
  accentDark: string;
  textPrimary: string;
  successPrimary: string;
  successSecondary: string;
  failurePrimary: string;
  failureSecondary: string;
  warningPrimary: string;
  warningSecondary: string;
}

export default function Colors() {
  const [colors, setColors] = useState<ColorsState>({
    accentPrimary: "#343DE6",
    accentSecondary: "#E9E9FD",
    accentDark: "#040ecc",
    textPrimary: "#092445",
    successPrimary: "#13be66",
    successSecondary: "#13be66",
    failurePrimary: "#ff0000",
    failureSecondary: "#ff0000",
    warningPrimary: "#f1b000",
    warningSecondary: "#f1b000",
  });

  const handleColorPickerChange = (
    e: ChangeEvent<HTMLInputElement>,
    colorName: keyof ColorsState
  ) => {
    setColors({ ...colors, [colorName]: e.target.value });
  };

  const handleCodeInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    colorName: keyof ColorsState
  ) => {
    let hexCode = e.target.value;

    if (hexCode.startsWith("#")) {
      const hexValue = hexCode.substring(1); 
      if (hexValue.length > 6) {
        hexCode = "#" + hexValue.substring(0, 6); 
      }
    } else {
      if (hexCode.length > 6) {
        hexCode = "#" + hexCode.substring(0, 6); // Truncate to 6 digits and add '#'
      } else if (hexCode.length > 0) {
        hexCode = "#" + hexCode; 
      }
    }
    setColors({ ...colors, [colorName]: hexCode });
  };
  // Transform the colors state into the required format
  const transformColorsForBackend = () => {
    return {
      accent: {
        primary: colors.accentPrimary,
        secondary: colors.accentSecondary,
        dark: colors.accentDark,
      },
      text: {
        primary: colors.textPrimary,
      },
      success: {
        primary: colors.successPrimary,
        secondary: colors.successSecondary,
      },
      failure: {
        primary: colors.failurePrimary,
        secondary: colors.failureSecondary,
      },
      warning: {
        primary: colors.warningPrimary,
        secondary: colors.warningSecondary,
      },
    };
  };

  // Handle saving colors to the backend
  const handleSaveColors = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formattedColors = transformColorsForBackend();
    console.log(formattedColors);
    //try {
    //  const response = await fetch("/api/save-colors", {
    //    method: "POST",
    //    headers: {
    //      "Content-Type": "application/json",
    //    },
    //    body: JSON.stringify(formattedColors),
    //  });

    //  if (response.ok) {
    //    console.log("Colors saved successfully!");
    //  } else {
    //    console.error("Failed to save colors.");
    //  }
    //} catch (error) {
    //  console.error("Error saving colors:", error);
    //}
  };

  return (
    <div className="m-4">
      <div className="flex h-4">
        <div className="flex justify-start">
        
          <div className=" border-gray-200 px-4 py-5 sm:px-6 rounded-md max-w-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Colors</h2>

            {/* Accent Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Accent
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-x-4">
                {" "}
                {/* Added mt-4 here */}
                {/* Primary Accent */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Primary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="accentPrimary"
                        value={colors.accentPrimary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "accentPrimary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.accentPrimary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "accentPrimary")
                      }
                    />
                  </div>
                </div>
                {/* Secondary Accent */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Secondary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="accentSecondary"
                        value={colors.accentSecondary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "accentSecondary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.accentSecondary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "accentSecondary")
                      }
                    />
                  </div>
                </div>
                {/* Dark Accent */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Dark
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="accentDark"
                        value={colors.accentDark}
                        onChange={(e) =>
                          handleColorPickerChange(e, "accentDark")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.accentDark}
                      onChange={(e) => handleCodeInputChange(e, "accentDark")}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Text Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Text</h3>
              <div className="mt-4 grid grid-cols-3 gap-x-4">
                {" "}
                {/* Added mt-4 here */}
                {/* Primary Text */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Primary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="textPrimary"
                        value={colors.textPrimary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "textPrimary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.textPrimary}
                      onChange={(e) => handleCodeInputChange(e, "textPrimary")}
                    />
                  </div>
                </div>
                <div></div>
                <div></div>
              </div>
            </div>

            {/* Success Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Success
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-x-4">
                {" "}
                {/* Added mt-4 here */}
                {/* Primary Success */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Primary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="successPrimary"
                        value={colors.successPrimary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "successPrimary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.successPrimary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "successPrimary")
                      }
                    />
                  </div>
                </div>
                {/* Secondary Success */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Secondary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="successSecondary"
                        value={colors.successSecondary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "successSecondary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.successSecondary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "successSecondary")
                      }
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            {/* Failure Colors */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Failure
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-x-4">
                {" "}
                {/* Added mt-4 here */}
                {/* Primary Failure */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Primary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="failurePrimary"
                        value={colors.failurePrimary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "failurePrimary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.failurePrimary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "failurePrimary")
                      }
                    />
                  </div>
                </div>
                {/* Secondary Failure */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Secondary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="failureSecondary"
                        value={colors.failureSecondary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "failureSecondary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.failureSecondary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "failureSecondary")
                      }
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            {/* Warning Colors */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Warning
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-x-4">
                {" "}
                {/* Added mt-4 here */}
                {/* Primary Warning */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Primary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="warningPrimary"
                        value={colors.warningPrimary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "warningPrimary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.warningPrimary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "warningPrimary")
                      }
                    />
                  </div>
                </div>
                {/* Secondary Warning */}
                <div>
                  <h4 className="text-sm font-bold text-gray-700 mb-1 text-center">
                    Secondary
                  </h4>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-md border border-gray-300 cursor-pointer flex items-center justify-center">
                      <input
                        type="color"
                        name="warningSecondary"
                        value={colors.warningSecondary}
                        onChange={(e) =>
                          handleColorPickerChange(e, "warningSecondary")
                        }
                        className="w-full h-full rounded-md cursor-pointer appearance-none border-none p-0"
                      />
                    </div>
                    <input
                      type="text"
                      className="shadow appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm w-24 text-center mt-1"
                      value={colors.warningSecondary}
                      onChange={(e) =>
                        handleCodeInputChange(e, "warningSecondary")
                      }
                    />
                  </div>
                </div>
                <div></div>
              </div>
            </div>

            <div className="mt-6 flex justify-start">
              <button
                onClick={handleSaveColors}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
