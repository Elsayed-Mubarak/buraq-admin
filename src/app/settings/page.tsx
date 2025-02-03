"use client";

import Layout from "@/components/layout/Layout";
import SettingsSidebar from "@/app/settings/SettingsSidebar";
import { Suspense, useState } from "react";

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

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("");

  return (
    <Layout>
      <div className="flex h-full">
        <SettingsSidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
            settingsNavigation={settingsNavigation}
            />
      </div>
    </Layout>
  );
}
