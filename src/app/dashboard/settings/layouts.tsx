import SettingsSidebar from "@/components/settings/SettingsSidebar";
import { settingsNavigation } from "./commonSettings/Common";
import { redirect } from "next/navigation";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section>{children}</section>
    </>
  );
}
