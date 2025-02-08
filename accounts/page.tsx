//'use client';

//import React, { useState, useEffect } from 'react';
//import { useRouter } from 'next/navigation';
//import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
//import dynamic from 'next/dynamic';
//import Layout from '@/components/layout/Layout';
//import Table from '@/components/common/Table';
//import { accountService, Account } from '@/services/accountService';
//import Header from '@/components/layout/Header';
//import adminPortalData from '@/components/DummyData/dummyUsers';

//const CreateAccountModal = dynamic(
//  () => import('@/components/accounts/CreateAccountModal'),
//  { ssr: false }
//);

//const columns = [
//  { key: '_id', header: 'Account ID' },
//  { key: 'settings.name', header: 'Account Name' },
//  { key: 'owner.name', header: 'Owner' },
//  { key: 'status', header: 'Status' },
//  { key: 'createdAt', header: 'Created (UTC)' },
//];

//function AccountsContent() {
//  const router = useRouter();
//  const [accounts, setAccounts] = useState<Account[]>([]);
//  const [loading, setLoading] = useState(true);
//  const [error, setError] = useState<string | null>(null);
//  const [showCreateModal, setShowCreateModal] = useState(false);
//  const [searchTerm, setSearchTerm] = useState('');

//  const fetchAccounts = async () => {
//    try {
//      setLoading(true);
//      setError(null);
//      console.log('Fetching accounts...');
//      const data = await accountService.getAccounts(); // first error
//      console.log('Fetched accounts:', data);
//      setAccounts(data);
//    } catch (err: any) {
//      console.error('Error in fetchAccounts:', err);
//      setError(err.response?.data?.message || 'Failed to fetch accounts');
//    } finally {
//      setLoading(false);
//    }
//  };

//  useEffect(() => {
//    fetchAccounts();
//  }, []);

//  const handleRowClick = (row: Account) => {
//    router.push(`/accounts/${row._id}`);
//  };

//  const handleCreateSuccess = () => {
//    fetchAccounts();
//  };

//  const filteredAccounts = accounts.filter(account =>
//    account.settings?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//    account.owner?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//    account._id.includes(searchTerm)
//  );

//  if (loading) {
//    return (
//      <div className="flex items-center justify-center min-h-screen">
//        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//      </div>
//    );
//  }

//  if (error) {
//    return (
//      <div className="flex flex-col items-center justify-center min-h-screen">
//        <div className="text-red-600 mb-4">{error}</div>
//        <button
//          onClick={fetchAccounts}
//          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//        >
//          Retry
//        </button>
//      </div>
//    );
//  }

//  return (
//    <>
//      <div className="px-4 sm:px-6 lg:px-8">
//        <div className="flex items-center justify-between">
//          <h1 className="text-xl font-semibold text-gray-900">ADMIN PORTAL</h1>
//          <button
//            type="button"
//            onClick={() => setShowCreateModal(true)}
//            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//          >
//            Create Account
//          </button>
//        </div>

//        <div className="mt-6">
//          <div className="relative">
//            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
//            </div>
//            <input
//              type="text"
//              name="search"
//              id="search"
//              value={searchTerm}
//              onChange={(e) => setSearchTerm(e.target.value)}
//              className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//              placeholder="Search"
//            />
//          </div>
//        </div>

//        <div className="mt-6 bg-white rounded-lg">
//          <Table
//            columns={columns}
//            data={filteredAccounts}
//            onRowClick={handleRowClick}
//          />
//        </div>
//      </div>

//      {showCreateModal && (
//        <CreateAccountModal
//          onClose={() => setShowCreateModal(false)}
//          onSuccess={handleCreateSuccess}
//        />
//      )}
//    </>
//  );
//}

//export default function AccountsPage() {
//  return (
//    <Layout>
//      <Header admin='ADMIN PORTAL'/>
//      <AccountsContent />
//    </Layout>
//  );
//}
//////////////////////////////////////////////////////////
// AccountsContent.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Table, { Column } from "@/components/common/Table";
//import { accountService } from "@/services/accountService"; // Import accountService for real API only.
//import Header from "@/components/layout/Header";
import adminPortalData, {
  AdminPortalData,
} from "@/components/DummyData/dummyUsers";

const CreateAccountModal = dynamic(
  () => import("@/components/accounts/CreateAccountModal"),
  { ssr: false }
);

const columns:Column[] = [
  { key: "accountID", header: "Account ID" },
  { key: "accountName", header: "Account Name" },
  { key: "owner", header: "Owner" },
  { key: "status", header: "Status" },
  { key: "createdUTC", header: "Created (UTC)" },
];

async function  AccountsContent() {

  const router = useRouter();
  const [accounts, setAccounts] = useState<AdminPortalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchAccounts = () => {
    try {
      setLoading(true);
      setError(null);

      // Loading local dummy data instead
      setAccounts(adminPortalData);
    } catch (error: unknown) {
      console.error("Error fetching data: ", error);
      setError("Failed to load accounts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // send id
  const handleRowClick = (row: AdminPortalData) => {
      router.push(`/accounts/${row.accountID}`);
  };

  const handleCreateSuccess = () => {
    fetchAccounts(); //refresh page to display new account added
  };

  const filteredAccounts = accounts.filter(
    (account) =>
      account.accountName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.accountID.toString().includes(searchTerm)
  );

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
          onClick={fetchAccounts}
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
        {/* Flex container to align items horizontally */}
        <div className="mt-2 flex items-center justify-between">
          {/* Admin Portal Title */}
          <h1 className="text-xl font-semibold text-gray-900">ADMIN PORTAL</h1>

          {/* Search Input */}
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-4 w-5 text-black-500"
                aria-hidden="true"
              />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block h-8 w-80 rounded-md border border-gray-300 bg-gray-300 py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none  "
              placeholder="Search"
            />
          </div>

          {/* Create Account Button */}
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Account
          </button>
        </div>

        <div className="mt-6 bg-white rounded-lg">
          <Table
            columns={columns}
            data={filteredAccounts}
            onRowClick={handleRowClick}
          />
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

export default function Page() {
  return (
    <Layout>
      <AccountsContent />
    </Layout>
  );
}