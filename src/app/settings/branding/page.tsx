'use client'

import Layout from "@/components/layout/Layout";
import SettingsSidebar from "../SettingsSidebar";
import { useState } from "react";
// Need to solve this useying commonLayout || sharedStatearouund app
const settingsNavigation = [
  { name: "Branding", href: "branding" },
  { name: "General", href: "general" },
  { name: "Links", href: "links" },
  { name: "Colors", href: "colors" },
  { name: "Typography", href: "typography" },
  { name: "Illustration", href: "illustration" },
  { name: "Super Admins", href: "super-admins" },
  { name: "Help Center", href: "help-center" },
  { name: "Events", href: "events" },
  { name: "Pricing", href: "pricing" },
  { name: "Defaults", href: "defaults" },
  { name: "Free Trial", href: "free-trial" },
];

export default function BrandingSettings() {
    const [activeSection, setActiveSection] = useState("");
  
  return (
    <Layout>
      <div className="flex h-full">
        <SettingsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          settingsNavigation={settingsNavigation}
        />
        <div className="border-b border-gray-200 px-4 py-5 sm:px-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Branding</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Manage Branding
          </button>
        </div>
      </div>
    </Layout>
  );
}
