import React from "react";

interface HeaderProps {
  admin: string; // Admin name passed as a prop
}

const Header: React.FC<HeaderProps> = ({ admin }) => {
  return (
    <header className="flex items-center justify-between p-2 bg-white">
      {/* Left Section: Admin Name */}
      <div className="text-lg pl-20 font-semibold text-gray-800">{admin}</div>

      {/* Center Section: Search Input */}
      <div className="flex-grow flex items-center justify-center mx-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search"
            className="pl-8 pr-3 py-1 border bg-[#C8CAD0] border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm w-full"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-2">
            <svg
              className="w-4 h-4 text-black-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>
      </div>

      {/* Right Section: Create Account Button */}
      <div className="flex items-center space-x-2">
        <button className="bg-blue-500 mr-20 h-8 hover:bg-blue-600 text-white text-sm font-medium px-4 py-1 rounded-md transition-colors duration-200">
          Create Account
        </button>
      </div>
    </header>
  );
};

export default Header;
