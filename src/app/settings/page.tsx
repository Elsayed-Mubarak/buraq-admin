"use client";

import Layout from "@/components/layout/Layout";
import SettingsSidebar from "@/app/settings/SettingsSidebar";
import { settingsNavigation } from "./commonSettings/Common";

export default function SettingsPage() {

  return (
    <div className="m-4">
      <div className="flex h-4">
        <Layout>
          <div className="flex h-full">
            <SettingsSidebar settingsNavigation={settingsNavigation} />
          </div>
        </Layout>
      </div>
    </div>
  );
}
