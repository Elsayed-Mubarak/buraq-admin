"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Layout from "@/components/layout/Layout";
import axios from "axios";
import { TableWrapper } from "@/components/analytics/TableWrapper/TableWrapper";
import {
  TableData,
  AccountCountPerPlan,
} from "@/app/types/analytics-types/AnlyticsTypes";
import { DatePickerWithRange } from "@/components/common/DatePickerWithRange";

const AnalyticsPage = () => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const dateInputRef = useRef<HTMLDivElement>(null);

  const [totalAccountsData, setTotalAccountsData] = useState<TableData[]>([]);
  const [activatedAccountsData, setActivatedAccountsData] = useState<
    TableData[]
  >([]);
  const [conversationsData, setConversationsData] = useState<TableData[]>([]);
  const [contactsData, setContactsData] = useState<TableData[]>([]);
  //const [outboundSendsData, setOutboundSendsData] = useState<TableData[]>([]); // not come from backend
  //const [aimodalsData, setAimodalsData] = useState<TableData[]>([]); // not come from backend
  const [totalAccountsNumber, setTotalAccountsNumber] = useState<number>(0);
  const [totalConversationsNumber, setTotalConversationsNumber] =
    useState<number>(0);
  //const [totalClientsNumber, setTotalClientsNumber] = useState<number>(0);
  const [liveAccounts, setLiveAccounts] = useState<number>(0); // not come from backend
  const [newAccounts, setNewAccounts] = useState<number>(0); // not come from backend

  const handleDateChange = (dateRange: { from: string; to: string }) => {
    setStartDate(dateRange.from);
    setEndDate(dateRange.to);
  };

  // Helper function to convert object to array for rendering
  const convertObjectToArray = (obj: {
    [key: string]: number;
  }): { month: string; count: number }[] => {
    if (!obj || typeof obj !== "object") return [];
    return Object.entries(obj).map(([month, count]) => ({
      month,
      count: Number(count) || 0,
    }));
  };

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const getAnalytics = useCallback(async () => {
    if (!startDate || !endDate) {
      console.log("Start date or end date is missing.");
      return;
    }
    try {
      const res = await axios.get(
        `${BASE_URL}/api/dashboard/analytics?startDate=${startDate}&endDate=${endDate}`,
        { withCredentials: true }
      );
      const data = res?.data?.data;
      // Set total accounts data

      console.log(data);
      setTotalAccountsData(
        (data.numberOfAccountsPerPlan ?? []).map(
          (item: AccountCountPerPlan) => ({
            Plans: item.plan?.planName ?? "N/A",
            Accounts: item.accountCount,
          })
        )
      );

      // Set activated accounts data (convert object to array)
      setActivatedAccountsData(
        convertObjectToArray(data.numberOfAccountsPerMonth ?? {}).map(
          (item) => ({
            Month: item.month,
            Accounts: item.count,
          })
        )
      );

      // Set conversations data (convert object to array)
      // [ jan-2025 :  0 ]
      setConversationsData(
        convertObjectToArray(data.conversationsInformation ?? {}).map(
          (item) => ({
            Month: item.month,
            Chats: item.count,
          })
        )
      );

      // Set contacts data (convert object to array)
      setContactsData(
        convertObjectToArray(data.numberOfClientsPerMonth ?? {}).map(
          (item) => ({
            Month: item.month,
            Contacts: item.count,
          })
        )
      );

      // Set totals
      setTotalAccountsNumber(data.totalAccountsNumber ?? 0);
      setTotalConversationsNumber(data.totalConversationsNumber ?? 0);
      //setTotalClientsNumber(data.totalClientsNumber ?? 0);
      setLiveAccounts(data.liveAccounts ?? 0);
      setNewAccounts(data.newAccounts ?? 0);
    } catch (error) {
      console.log("Failed to fetch analytics:", error);
    }
  }, [startDate, endDate, BASE_URL]);

  useEffect(() => {
    (async () => {
      await getAnalytics();
    })();
  }, [getAnalytics]);

  return (
    <Layout>
      <div className="p-4 font-sans">
        <div className="mb-8 flex flex-col sm:flex-row items-start justify-between">
          <div>
            <h1 className="text-2xl mb-6 font-semibold">Instance Analytics</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-gray-100 border border-gray-300 p-4 text-center w-full sm:w-40 rounded-md">
                Total accounts
                <span className="block text-3xl font-bold mt-1">
                  {totalAccountsNumber}
                </span>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center w-full sm:w-40 rounded-md">
                Live accounts
                <span className="block text-3xl font-bold mt-1">
                  {liveAccounts}
                </span>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center w-full sm:w-40 rounded-md">
                New accounts
                <span className="block text-3xl font-bold mt-1">
                  {newAccounts}
                </span>
              </div>
            </div>
          </div>

          <div className="relative inline-block" ref={dateInputRef}>
            <DatePickerWithRange onDateChange={handleDateChange} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="flex flex-wrap gap-4 w-full">
            <TableWrapper
              title="Total Accounts"
              data={totalAccountsData}
              dataKey1="Plans"
              dataKey2="Accounts"
              description={`${totalAccountsData.length} Accounts`}
              header1="Plans"
              header2="Accounts"
            />
            <TableWrapper
              title="Activated Accounts"
              data={activatedAccountsData}
              dataKey1="Month"
              dataKey2="Accounts"
              description={`${activatedAccountsData.length} Accounts`}
              header1="Month"
              header2="Accounts"
            />
            <TableWrapper
              title="Conversations"
              data={conversationsData}
              dataKey1="Month"
              dataKey2="Chats"
              description={`${
                totalConversationsNumber.toString().length
              } Conversations`}
              header1="Month"
              header2="Chats"
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full">
            <TableWrapper
              title="Contacts"
              data={contactsData}
              dataKey1="Month"
              dataKey2="Contacts"
              description={`${contactsData.length} Contacts`}
              header1="Month"
              header2="Contacts"
            />
            {/*<TableWrapper
              title="Outbound Sends"
              data={outboundSendsData}
              dataKey1="Month"
              dataKey2="Campaigns"
              description="370 Campaigns"
              header1="Month"
              header2="Campaigns"
            />*/}
            {/*<TableWrapper
              title="AI modal usage"
              data={aimodalsData}
              dataKey1="Month"
              dataKey2="Requests"
              description="339 Request"
              header1="Month"
              header2="Requests"
            />*/}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AnalyticsPage;
