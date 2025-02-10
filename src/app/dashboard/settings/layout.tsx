import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { settingsNavigation } from "./commonSettings/Common";
import Layout from "@/components/layout/Layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="m-4">
        <Layout>
          <div className="flex h-full">
            <SettingsSidebar settingsNavigation={settingsNavigation} />
            {children}
          </div>
        </Layout>
      </div>
  );
}
