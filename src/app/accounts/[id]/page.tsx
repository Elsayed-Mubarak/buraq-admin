'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Layout from '@/components/layout/Layout';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface AccountDetailsProps {
  params: {
    id: string;
  };
}

export default function AccountDetails({ params }: AccountDetailsProps) {
  const [selectedTab, setSelectedTab] = useState(0);

  const accountData = {
    id: params.id,
    name: 'Slle',
    status: 'Active',
    websiteUrl: '',
    codeSnippet: '<script src="https://app.buraq.ai/chat-widget/58w7rt4XZfx714305029350HHW2Q/UPk.js" defer></script>',
    users: 1,
    subscription: {
      renewalDate: '28-Jan-04',
      conversations: '0/1,000',
      plan: 'Free',
      outboundSends: 0
    },
    channels: {
      web: false,
      whatsApp: false
    },
    owner: {
      name: 'LAMA Abdullah',
      phone: '+966593637494'
    },
    activity: {
      created: '28-Jan-25 02:30 PM',
      lastDeployed: '28-Jan-25 02:31 PM'
    }
  };

  return (
    <Layout>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/accounts" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Slle ({params.id})</h1>
          <div className="space-x-4">
            <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
              Impersonate
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
              Delete Account
            </button>
          </div>
        </div>

        <Tab.Group onChange={setSelectedTab}>
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1 border-b">
            {['Account', 'Branding', 'Features', 'Bots', 'Users'].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    'w-full py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 focus:outline-none',
                    selected
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            <Tab.Panel>
              {/* Account Info */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Account ID</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accountData.id}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Status</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accountData.status}</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Code snippet</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <code className="bg-gray-100 p-2 rounded block">{accountData.codeSnippet}</code>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500"># of users</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accountData.users}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Subscription */}
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription</h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Renewal Date</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accountData.subscription.renewalDate}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Plan</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accountData.subscription.plan}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Conversations</dt>
                      <dd className="mt-1 text-sm text-gray-900">{accountData.subscription.conversations}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Additional sections */}
            </Tab.Panel>

            {/* Other tab panels will be implemented similarly */}
            <Tab.Panel>Branding Content</Tab.Panel>
            <Tab.Panel>Features Content</Tab.Panel>
            <Tab.Panel>Bots Content</Tab.Panel>
            <Tab.Panel>Users Content</Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
}
