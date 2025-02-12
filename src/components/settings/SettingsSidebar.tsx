"use client";

import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname

interface SettingsSidebarProps {
  settingsNavigation: { name: string; href: string }[];
  basePath?: string; // Optional base path
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({
  settingsNavigation,
  basePath = "/dashboard/settings", // Default base path
}) => {
  const pathname = usePathname();

  // Determine active section based on the current pathname
  const getActiveSection = (href: string) => {
      const fullHref = `${basePath}/${href}`;
        // Check if the pathname starts with the fullHref
      return pathname.startsWith(fullHref) ? href : null;

  };

  return (
    <div className="w-64 bg-white border-r">
      <nav className="space-y-1 p-4">
        <h2 className="text-xl p-4 font-semibold mb-4">Settings</h2>
        {settingsNavigation.map((item) => {
          const activeSection = getActiveSection(item.href);
          const isActive = activeSection === item.href;

          return (
            <Link
              key={item.name}
              href={`${basePath}/${item.href}`} // Use basePath
              className={`
                block px-4 py-2 text-sm rounded-md
                ${
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold" // Consistent font weight
                    : "text-gray-700 hover:bg-gray-50 font-semibold"
                }
              `}
              aria-current={isActive ? "page" : undefined} // Add aria-current
            >
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default SettingsSidebar;