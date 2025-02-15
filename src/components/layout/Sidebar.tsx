import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
//import { useRouter } from "next/navigation"; // Import useRouter

import { GrUserSettings } from "react-icons/gr";
import { BiBarChartSquare } from "react-icons/bi";
import { HiOutlineTemplate } from "react-icons/hi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const navigation = [
  { name: "Accounts", href: "/dashboard/accounts", icon: GrUserSettings },
  { name: "Analytics", href: "/dashboard/analytics", icon: BiBarChartSquare },
  {
    name: "Template Manager",
    href: "/dashboard/templates",
    icon: HiOutlineTemplate,
  },
];

const bottomNavigation = [
  {
    name: "Questions",
    href: "/dashboard/questions",
    icon: FaRegQuestionCircle,
  },
  { name: "Settings", href: "/dashboard/settings", icon: IoMdSettings },
];

export default function Sidebar() {

  const router = useRouter(); // Uncomment this line

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  
  const handleLogout = async () => {
    const toastId = toast.loading("Logging out ...");
    setLoading(true);

  
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
  
      if (res.status === 200) {
  
        // Clear cookies on the client side
        document.cookie.split(";").forEach((c) => {
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
        });
  
        toast.success("Logged out successfully!", { id: toastId });

        router.push("/"); // Redirect to login page


      } 
    } catch (err: unknown) {
     console.log("Error: ", err)
     toast.error("Something went wrong", { id: toastId });

    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col w-12 border-r border-gray-200 h-screen fixed left-0 top-0 bg-[#EEEEEE] sidebar-overflow">
      <div className="flex-1 flex flex-col pt-4 pb-4 overflow-y-auto dropdown-overflow">
        <div className="flex-shrink-0 flex items-center justify-center mb-8 cursor-pointer">
          <Link href={"/dashboard"}>
            <Image width={30} height={30} src="/logo.png" alt="Buraq" />
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

          {/* Admin Photo with Dropdown */}
          <div className="relative">
            <div
              className="group flex items-center justify-center p-2 rounded-full cursor-pointer hover:bg-gray-50"
              onClick={toggleDropdown}
            >
              <Image
                src="/admin-photo.jpg"
                width={30}
                height={30}
                alt="Admin Photo"
                className="rounded-full object-cover h-8 w-8"
              />
            </div>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute left-full -top-4 ml-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4">
                  {/*Wait arab to give me cookies to add */}
                  <p className="text-sm font-extrabold text-gray-800">
                    Username
                  </p>
    
                  <button
                    onClick={handleLogout}
                    disabled={loading} 
                    className="mt-2 w-full text-left text-sm text-red-600 hover:text-red-800"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
