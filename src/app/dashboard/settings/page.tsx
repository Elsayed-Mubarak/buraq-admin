"use client";

import Layout from "@/components/layout/Layout";
import { settingsNavigation } from "./commonSettings/Common";
import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { redirect } from "next/navigation";



export default function Page() {

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
