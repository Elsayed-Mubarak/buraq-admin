"use clinet";
import React from "react";
import SettingsSidebar from "../SettingsSidebar";
import { settingsNavigation } from "../commonSettings/Common";
import Layout from "@/components/layout/Layout";

function Illustration() {
  const htmlScript = `<html>
  <head>
    <style>
    </style>
  </head>
  <body style="height: 100vh; margin: 0;">
    <div style="height: 100%;text-align: center; background-color: #f5f5f5; position: relative;">
      <div>
        <a href="https://alkhalil-group.com/" target="_blank">
          <img style="max-width: 130px;" src="https://buraq-ai-assets.storage.googleapis.com/static/img/login/text-logo.svg" alt="logo" />
        </a>
      </div>
      <div style="display: flex; align-items: center; justify-content: center; ">
        <img src="https://buraq-bucket.s3.eu-west-2.amazonaws.com/images/Artboard+1.png" width="70%" />
      </div>
    </div>
  </body>
</html>`;

  return (
    <div className="m-4">
      <div className="flex h-full">
        <Layout>

        <SettingsSidebar settingsNavigation={settingsNavigation} />
        </Layout>
        <div className="ml-4 flex-1">
          <div className="border-gray-200 px-4 py-5 sm:px-6 rounded-md shadow-sm max-w-2xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Sign up illustration
            </h2>
            <p className="text-gray-700 text-sm mb-4">
              This HTML will be rendered on the left hand side section of the
              signup page. You can use it to show an image, testimonial, awards
              etc.
            </p>
            <div className="bg-gray-100 rounded-md p-4 font-mono text-sm text-gray-800 whitespace-pre-wrap break-words mb-4">
              <pre>
                <code className="whitespace-pre-wrap break-words">
                  {htmlScript}
                </code>
              </pre>
            </div>
            <div className="flex justify-start">
              <button
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

export default Illustration;
