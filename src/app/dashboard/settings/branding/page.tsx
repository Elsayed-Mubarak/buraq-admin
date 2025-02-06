'use client'

import Layout from "@/components/layout/Layout";
import SettingsSidebar from "../SettingsSidebar";
import { settingsNavigation } from "../commonSettings/Common";

export default function BrandingSettings() {
  
  return (
    <div className="m-4">
      <div className="flex h-full">
      <Layout>
        <div className="flex h-full">
          <SettingsSidebar settingsNavigation={settingsNavigation} />
          <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Branding</h2>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Manage Branding
            </button>
          </div>
        </div>
        </Layout>
        </div>
    </div>
  );
}
