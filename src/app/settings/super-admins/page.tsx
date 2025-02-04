"use client";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import AddSuperAdminModal from "./AddSuperAdminModal";
import SettingsSidebar from "../SettingsSidebar";
import { settingsNavigation } from "../commonSettings/Common";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Layout from "@/components/layout/Layout";

export default function SuperAdminsSettings() {
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [superAdmins, setSuperAdmins] = useState([
    { name: "Customer Service", email: "selfservice@buraq.ai" },
    { name: "Dev Field", email: "devfield@buraq.ai" },
    { name: "abdullah", email: "abdullah@buraq.ai" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAdmins, setFilteredAdmins] = useState([...superAdmins]);

  useEffect(() => {
    // Update filtered admins whenever superAdmins or searchTerm changes
    const results = superAdmins.filter((admin) =>
      admin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAdmins(results);
  }, [searchTerm, superAdmins]);

  const handleRemoveAdmin = (email: string) => {
    setSuperAdmins((prevAdmins) =>
      prevAdmins.filter((admin) => admin.email !== email)
    );
  };

  const handleAddAdmin = (newAdminEmail: string, newAdminName: string) => {
    const newAdmin = { name: newAdminName, email: newAdminEmail };
    setSuperAdmins((prevAdmins) => [...prevAdmins, newAdmin]);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="m-4">
      <div className="flex h-full">
        <Layout>
          <SettingsSidebar settingsNavigation={settingsNavigation} />
        </Layout>
        <div className="ml-4 flex-1">
          <div className="border-gray-200 px-4 py-5 sm:px-6 rounded-md shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900">Super Admins</h2>
              <button
                onClick={() => setIsAddAdminModalOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-bold rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Super Admin
              </button>
            </div>

            {/* Search Input */}
            <div className="relative rounded-md shadow-sm mb-4 w-64">
              {" "}
              {/* Added w-64 to control width */}
              <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                name="search"
                id="search"
                className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-3"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            {/* Number of users */}
            <p className="text-sm font-bold text-black-500  mb-4">
              {filteredAdmins.length} Users
            </p>

            <div className="w-full">
              <div className="px-4 sm:px-6">
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Email
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Remove</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {filteredAdmins.map((admin) => (
                              <tr key={admin.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <UserCircleIcon className="h-10 w-10 text-gray-400" />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                        {admin.name}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {admin.email}
                                </td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <button
                                    onClick={() =>
                                      handleRemoveAdmin(admin.email)
                                    }
                                    className="text-blue-600 hover:text-red-900"
                                  >
                                    Remove
                                    <span className="sr-only">
                                      , {admin.name}
                                    </span>
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AddSuperAdminModal
              isOpen={isAddAdminModalOpen}
              onClose={() => setIsAddAdminModalOpen(false)}
              onAddAdmin={handleAddAdmin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
