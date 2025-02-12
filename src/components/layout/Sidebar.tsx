import Image from "next/image";
import Link from "next/link";

import { GrUserSettings } from "react-icons/gr";
import { BiBarChartSquare } from "react-icons/bi";
import { HiOutlineTemplate } from "react-icons/hi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";

const navigation = [
  { name: "Accounts", href: "/dashboard/accounts", icon: GrUserSettings },
  { name: "Analytics", href: "/dashboard/analytics", icon: BiBarChartSquare },
  { name: "Template Manget", href: "/dashboard/templates", icon: HiOutlineTemplate }, //dashboard/ Update href as needed
];

const bottomNavigation = [
  { name: "Questions", href: "/dashboard/questions", icon: FaRegQuestionCircle },
  { name: "Settings", href: "/dashboard/settings", icon: IoMdSettings },
];

export default function Sidebar() {
  return (
    <div className="flex flex-col w-12 border-r border-gray-200 h-screen fixed left-0 top-0 bg-[#EEEEEE]">
      <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto">
        {/* Logo with margin-bottom */}
        <div className="flex-shrink-0 flex items-center justify-center mb-8 cursor-pointer">
          <Link href={"/dashboard"}>
            <Image
              width={30}
              height={30}
              src="/logo.png"
              alt="Buraq"
            />
          </Link>
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
          <div className="group flex items-center justify-center p-2 rounded-full ">
            <Image
              src="/admin-photo.jpg"
              width={30}
              height={30}
              alt="Admin Photo"
              className="rounded-full object-cover h-8 w-8"
            />
          </div>
        </nav>
      </div>
    </div>
  );
}
