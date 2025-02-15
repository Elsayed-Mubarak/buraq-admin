"use client";
import { useState, useEffect, useCallback } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import AddSuperAdminModal from "./AddSuperAdminModal";
import { SuperAdmin } from "@/app/types/super-admins/SuperAminds";
import { SuperAdminsResponse } from "@/app/types/super-admins/SuperAminds";


export default function SuperAdminsSettings() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [superAdmins, setSuperAdmins] = useState<SuperAdmin[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch Data
  const fetchSuperAdmins = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get<SuperAdminsResponse>(
        `${BASE_URL}/api/dashboard/settings/super-admins`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setSuperAdmins(response.data.data);
      }
    } catch (error) {
      setError("Failed to fetch admin data. Please try again later.");
      console.log("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [BASE_URL]); // make sure from this

  useEffect(() => {
    fetchSuperAdmins();
  }, [fetchSuperAdmins]);

  const filteredAdmins = superAdmins.filter((admin) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveAdmin = async (id: string) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/dashboard/settings/super-admins/${id}`,
        { withCredentials: true }
      );
      // Update local state to remove the deleted admin
      setSuperAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin._id !== id)
      );
    } catch (error) {
      console.error("Error removing admin:", error);
      setError("Failed to remove admin. Please try again.");
    }
  };

  const handleAddAdmin = async (newAdminEmail: string) => {
    try {
      const response = await axios.post<SuperAdminsResponse>(
        `${BASE_URL}/api/dashboard/settings/super-admins`,
        { email: newAdminEmail },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setSuperAdmins((prevAdmins) => [...prevAdmins, ...response.data.data]);
      }
    } catch (error) {
      console.log("Error adding admin:", error);
      setError("Failed to add admin. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="m-4 w-full flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  return (
    <div className="m-4 w-full">
      <div className="flex-1">
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

          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <div className="relative rounded-md shadow-sm mb-4 w-64">
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
              className="block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 py-2"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <p className="text-sm font-bold text-gray-600 mb-4">
            {filteredAdmins.length}{" "}
            {filteredAdmins.length === 1 ? "User" : "Users"}
          </p>

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
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredAdmins.map((admin) => (
                  <tr key={admin._id}>
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
                        onClick={() => handleRemoveAdmin(admin._id)}
                        className="text-blue-600 hover:text-red-900"
                        aria-label={`Remove ${admin.name}`}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <AddSuperAdminModal
            isOpen={isAddAdminModalOpen}
            onClose={() => setIsAddAdminModalOpen(false)}
            onAddAdmin={handleAddAdmin}
          />
        </div>
      </div>
    </div>
  );
}
