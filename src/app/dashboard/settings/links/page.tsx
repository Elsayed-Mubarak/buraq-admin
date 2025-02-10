"use client";
import { LinksState } from "@/app/types/Links-types/LinksTypes";
import React, { useState, ChangeEvent, FormEvent } from "react";


export default function Links() {
  const [links, setLinks] = useState<LinksState>({
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
    youtube: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinks({ ...links, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // API call here
  };

  return (
    <div className="m-4">
      <div className="flex h-full">

        <div className="ml-4 flex-1">
          <div className="border-gray-200 px-4 py-5 sm:px-6 rounded-md shadow-sm max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="facebook"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Facebook Profile URL
                </label>
                <input
                  type="text"
                  id="facebook"
                  placeholder="https://"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={links.facebook}
                  onChange={handleChange}
                />
                <span className="block text-gray-500 text-xs normal-case font-normal">
                  (URL of your Facebook page)
                </span>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="twitter"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Twitter Profile URL
                </label>
                <input
                  type="text"
                  id="twitter"
                  placeholder="https://twitter.com/"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={links.twitter}
                  onChange={handleChange}
                />
                <span className="block text-gray-500 text-xs normal-case font-normal">
                  (URL of your Twitter account)
                </span>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="linkedin"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  LinkedIn Profile URL
                </label>
                <input
                  type="text"
                  id="linkedin"
                  placeholder="https://linkedin.com/in/"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={links.linkedin}
                  onChange={handleChange}
                />
                <span className="block text-gray-500 text-xs normal-case font-normal">
                  (URL of your LinkedIn profile)
                </span>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="instagram"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Instagram Profile URL
                </label>
                <input
                  type="text"
                  id="instagram"
                  placeholder="https://www.instagram.com/"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={links.instagram}
                  onChange={handleChange}
                />
                <span className="block text-gray-500 text-xs normal-case font-normal">
                  (URL of your Instagram profile)
                </span>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="youtube"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Youtube Profile URL
                </label>
                <input
                  type="text"
                  id="youtube"
                  placeholder="https://www.youtube.com/channel/"
                  className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={links.youtube}
                  onChange={handleChange}
                />
                <span className="block text-gray-500 text-xs normal-case font-normal">
                  (URL of your Youtube profile)
                </span>
              </div>

              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
