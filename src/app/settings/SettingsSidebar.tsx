"use client";
import Link from "next/link";
import { useState } from "react";

interface SettingsSidebarProps {
  settingsNavigation: { name: string; href: string }[];
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  settingsNavigation,
}) => {
  const [activeSection, setActiveSection] = useState("");

  return (
    <div className="w-64 bg-white border-r">
      <nav className="space-y-1 p-4">
        <h2 className="text-xl p-4 font-bold mb-4">Settings</h2>{" "}
        {settingsNavigation.map((item) => (
          <Link
            key={item.name}
            href={`/settings/${item.href}`}
            className={`
              block px-4 py-2 text-sm rounded-md
              ${
                activeSection === item.name.toLowerCase()
                  ? "bg-blue-50 text-blue-600"
                  : "text-black font-semibold hover:bg-gray-50"
              }
            `}
            onClick={() => setActiveSection(item.name.toLowerCase())}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default SettingsSidebar;
