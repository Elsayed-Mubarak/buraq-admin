"use client";

import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Layout from "@/components/layout/Layout";
import {
  aimodalsDate,
  totalAccountsData,
} from "./DummyAnlyticsDate/AnlyticsDate";
import { activatedAccountsData } from "./DummyAnlyticsDate/AnlyticsDate";
import { conversationsData } from "./DummyAnlyticsDate/AnlyticsDate";
import { contactsData } from "./DummyAnlyticsDate/AnlyticsDate";
import { outboundSendsData } from "./DummyAnlyticsDate/AnlyticsDate";
import axios, { AxiosError } from "axios";
const AnalyticsPage = () => {
  const [startDate, setStartDate] = useState(new Date("02/02/2024"));
  const [endDate, setEndDate] = useState(new Date("01/31/2025"));
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const dateInputRef = useRef<HTMLDivElement>(null);


  const loginUser = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true } // Ensure cookies (auth_token) are stored
      );
  
      console.log("Login successful:", response.data);
      return response.data;
    } catch (error:any) {
      console.error("Login failed:", error.response?.data || error.message);
      return null;
    }
  };


  useEffect(()=>{
    loginUser("admin@gmail.com" , "Aa_123456");
  })


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Layout>
      <div className="p-4 font-sans">
        <div className="mb-8 flex flex-col sm:flex-row items-start justify-between">
          <div>
            <h1 className="text-2xl mb-6 font-semibold">Instance Analytics</h1>
            <div className="flex flex-wrap gap-4 mb-4">
              <div className="bg-gray-100 border border-gray-300 p-4 text-center w-full sm:w-40 rounded-md">
                Total accounts
                <span className="block text-3xl font-bold mt-1">305</span>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center w-full sm:w-40 rounded-md">
                Live accounts
                <span className="block text-3xl font-bold mt-1">24</span>
              </div>
              <div className="bg-gray-100 border border-gray-300 p-4 text-center w-full sm:w-40 rounded-md">
                New accounts
                <span className="block text-3xl font-bold mt-1">305</span>
              </div>
            </div>
          </div>

          <div className="relative inline-block" ref={dateInputRef}>
            <div
              className="inline-flex items-center border border-gray-300 rounded-md px-3 py-2 cursor-pointer"
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.75 2a.75.75 0 01.75.75V4.5h7V2.75a.75.75 0 011.5 0V4.5h.75a1.5 1.5 0 011.5 1.5v10.5a1.5 1.5 0 01-1.5 1.5H4.25a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5H5V2.75a.75.75 0 01.75-.75zM5 6.75a.75.75 0 01.75-.75h7a.75.75 0 01.75.75v7.5a.75.75 0 01-.75.75h-7a.75.75 0 01-.75-.75v-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>

            {isCalendarOpen && (
              <div className="absolute right-0 z-10 mt-2 bg-white rounded-md shadow-lg border border-gray-200">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    if (start) setStartDate(start);
                    if (end) setEndDate(end);
                  }}
                  inline
                />
              </div>
            )}
          </div>
        </div>

        {/* Table Grouping */}
        <div className="flex flex-wrap gap-4">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-4 w-full">
            <TableWrapper
              title="Total Accounts"
              data={totalAccountsData}
              dataKey1="Plans"
              dataKey2="Accounts"
              description="305 Accounts"
              header1="Plans"
              header2="Accounts"
            />
            <TableWrapper
              title="Activated Accounts"
              data={activatedAccountsData}
              dataKey1="Month"
              dataKey2="Accounts"
              description="156 Accounts"
              header1="Month"
              header2="Accounts"
            />
            <TableWrapper
              title="Conversations"
              data={conversationsData}
              dataKey1="Month"
              dataKey2="Chats"
              description="68,432 Conversations"
              header1="Month"
              header2="Chats"
            />
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap gap-4 w-full">
            <TableWrapper
              title="Contacts"
              data={contactsData}
              dataKey1="Month"
              dataKey2="Contacts"
              description="588,867 Contacts"
              header1="Month"
              header2="Contacts"
            />
            <TableWrapper
              title="Outbound Sends"
              data={outboundSendsData}
              dataKey1="Month"
              dataKey2="Campaigns"
              description="370 Campaigns"
              header1="Month"
              header2="Campaigns"
            />
            <TableWrapper
              title="AI modal usage"
              data={aimodalsDate}
              dataKey1="Month"
              dataKey2="Requests"
              description="339 Request"
              header1="Month"
              header2="Requests"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface TableProps {
  title: string;
  data: any[];
  dataKey1: string;
  dataKey2: string;
  description: string;
  header1: string;
  header2: string;
}

const TableWrapper: React.FC<TableProps> = ({
  title,
  data,
  dataKey1,
  dataKey2,
  description,
  header1,
  header2,
}) => {
  return (
    <div className="flex-1 min-w-[300px] bg-white border border-gray-300 rounded-md shadow-sm p-4">
      <h2 className="font-semibold mb-2">
        {title} <span className="text-gray-500 cursor-pointer">ⓘ</span>
      </h2>
      <p className="text-sm text-gray-600">{description}</p>
      <table className="w-full mt-2 border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left py-2 px-3 border border-gray-300">
              {header1}
            </th>
            <th className="text-left py-2 px-3 border border-gray-300">
              {header2}
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index: number) => (
            <tr key={index}>
              <td className="py-2 px-3 border border-gray-300">
                {item[dataKey1]}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {item[dataKey2]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnalyticsPage;
