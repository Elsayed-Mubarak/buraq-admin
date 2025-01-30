'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan 2024', accounts: 15, conversations: 0, contacts: 0, campaigns: 0 },
  { month: 'Feb 2024', accounts: 25, conversations: 0, contacts: 0, campaigns: 2 },
  { month: 'Mar 2024', accounts: 27, conversations: 0, contacts: 3, campaigns: 2 },
  { month: 'Apr 2024', accounts: 35, conversations: 56, contacts: 0, campaigns: 2 },
  { month: 'May 2024', accounts: 42, conversations: 86, contacts: 30, campaigns: 0 },
  { month: 'Jun 2024', accounts: 45, conversations: 201, contacts: 0, campaigns: 0 },
  { month: 'Jul 2024', accounts: 52, conversations: 1236, contacts: 1569, campaigns: 0 },
];

const stats = [
  { name: 'Total accounts', value: '300' },
  { name: 'Live accounts', value: '28' },
  { name: 'New accounts', value: '300' },
];

export default function Home() {
  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold text-gray-900">Instance analytics</h1>
        
        {/* Stats */}
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-blue-500 p-3">
                  <div className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </dd>
            </div>
          ))}
        </dl>

        {/* Charts */}
        <div className="mt-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Activity Overview</h3>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="accounts" stackId="1" stroke="#8884d8" fill="#8884d8" />
                  <Area type="monotone" dataKey="conversations" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                  <Area type="monotone" dataKey="contacts" stackId="1" stroke="#ffc658" fill="#ffc658" />
                  <Area type="monotone" dataKey="campaigns" stackId="1" stroke="#ff7300" fill="#ff7300" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
