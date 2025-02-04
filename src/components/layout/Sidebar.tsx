import Link from "next/link";
import Image from "next/image";


import { GrUserSettings } from "react-icons/gr";
import { BiBarChartSquare } from "react-icons/bi";
import { HiOutlineTemplate } from "react-icons/hi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const navigation = [
  { name: "Accounts", href: "/accounts", icon: GrUserSettings },
  { name: "Analytics", href: "/analytics", icon: BiBarChartSquare },
  { name: "Template Manget", href: "/templates", icon: HiOutlineTemplate }, // Update href as needed
];

const bottomNavigation = [
  { name: "Questions", href: "/questions", icon: FaRegQuestionCircle },
  { name: "Settings", href: "/settings", icon: IoMdSettings },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-12 border-r border-gray-200 h-screen fixed left-0 top-0 bg-[#EEEEEE]">
      <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
        {/* Logo with margin-bottom */}
        <div className="flex-shrink-0 flex items-center justify-center mb-8">
          <img className="h-8 w-auto" src="/logo.png" alt="Buraq" />
        </div>

        {/* Main Navigation Items */}
        <nav className="flex-1 space-y-2 px-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-center p-2 rounded-lg text-black hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom Navigation Items (Settings and Questions) */}
        <nav className="mt-auto space-y-2 px-2">
          {bottomNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group flex items-center justify-center p-2 rounded-lg text-black hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200"
            >
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <span className="sr-only">{item.name}</span>
            </Link>
          ))}

          {/* Admin Photo */}
          <div className="group flex items-center justify-center p-2 rounded-full hover:bg-gray-50 transition-colors duration-200">
            <Image
              src="/admin-photo.jpg"
              width={24}
              height={24}
              alt="Admin Photo"
              className="rounded-full object-cover h-6 w-6"
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
