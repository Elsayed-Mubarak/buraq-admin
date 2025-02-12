"use client";

import { IllustrationResponse } from "@/app/types/illustraion-types/Illustration";
import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";


function Illustration() {
  const [editedCode, setEditedCode] = useState<string>(
    `<div class="default-illustration">
      <h1>Welcome to Our Platform</h1>
      <p>Join us and experience the best services we offer.</p>
      <img src="/default-illustration.png" alt="Default Illustration" />
    </div>`
  );

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const fetchIllustration = useCallback(async () => {
    try {
      const res = await axios.get<IllustrationResponse>(
        `${BASE_URL}/api/dashboard/settings/signup-illustration`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        setEditedCode(res.data.toString());
      }
    } catch (error: unknown) {
      console.log("Error fetching illustration:", error);
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchIllustration();
  }, [fetchIllustration]);

  return (
    <div className="m-4">
      <div className="flex h-full">
        <div className="ml-4 flex-1">
          <div className="border-gray-200 px-4 py-5 sm:px-6 rounded-md shadow-sm max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign up illustration
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              This HTML will be rendered on the left-hand side section of the
              signup page. You can use it to show an image, testimonial, awards,
              etc.
            </p>
            <div className="bg-gray-100 rounded-md p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap break-words mb-4">
              <textarea
                className="w-full h-64 p-2 bg-gray-100 rounded-md"
                value={editedCode}
                onChange={(e) => setEditedCode(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Illustration;
