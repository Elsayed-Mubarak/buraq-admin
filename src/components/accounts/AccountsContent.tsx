"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Table from "@/components/common/Table";
import { AccountColumn } from "@/components/common/Table";
import axios from "axios";
import { AdminPortalData } from "@/app/types/account-types/AccountTypes";
import { ApiResponse } from "@/app/types/account-types/AccountTypes";
const CreateAccountModal = dynamic(
  () => import("@/components/accounts/CreateAccountModal"),
  { ssr: false }
);

const columns: AccountColumn[] = [
  { key: "accountID", header: "Account ID" },
  { key: "accountName", header: "Account Name" },
  { key: "owner", header: "Owner" },
  { key: "status", header: "Status" },
  { key: "createdUTC", header: "Created (UTC)" },
];

const ITEMS_PER_PAGE = 10;

export default function AccountsContent() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AdminPortalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL 

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/api/dashboard/admin-portal?limit=10&page=1`,
        { withCredentials: true }
      );
      const apiData: ApiResponse[] = response.data.data.results;

      const mappedData: AdminPortalData[] = apiData.map((item, index) => ({
        accountID: index.toString(), // item._id
        accountName: item.settings?.name || "N/A",
        owner: item?.owner?.userName || "",
        status: item.status,
        createdUTC: item.createdAt,
      }));

      setAccounts(mappedData);
      setError(null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [BASE_URL]); 

  useEffect(() => {
    fetchData();
  }, [fetchData]); 

  const handleRowClick = (row: AdminPortalData) => {
    router.push(`/dashboard/accounts/${row.accountID}`);
  };

  const handleCreateSuccess = () => {
    fetchData();
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountID.toString().includes(searchTerm)
  );

  const totalPages = Math.ceil(filteredAccounts.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedAccounts = filteredAccounts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-600 mb-4">{error}</div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-2 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">ADMIN PORTAL</h1>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-4 w-5 text-black-500"
                aria-hidden="true"
                aria-label="Search"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block h-8 w-80 rounded-md border border-gray-300 bg-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none"
              placeholder="Search"
              aria-label="Search accounts"
            />
          </div>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Create account"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 bg-white rounded-lg">
          <Table
            columns={columns}
            data={paginatedAccounts}
            onRowClick={handleRowClick}
          />
        </div>

        <div className="fixed bottom-4 right-11 mt-4 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>

      {showCreateModal && (
        <CreateAccountModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={handleCreateSuccess}
        />
      )}
    </>
  );
}
