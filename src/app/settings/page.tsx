'use client';

import { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Dialog } from '@headlessui/react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const settingsNavigation = [
  { name: 'Branding', href: '#branding' },
  { name: 'General', href: '#general' },
  { name: 'Links', href: '#links' },
  { name: 'Colors', href: '#colors' },
  { name: 'Typography', href: '#typography' },
  { name: 'Illustration', href: '#illustration' },
  { name: 'Super Admins', href: '#super-admins' },
  { name: 'Help Center', href: '#help-center' },
  { name: 'Events', href: '#events' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Defaults', href: '#defaults' },
  { name: 'Free Trial', href: '#free-trial' },
];

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('branding');
  const [isAddAdminModalOpen, setIsAddAdminModalOpen] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');

  const [brandingData, setBrandingData] = useState({
    productName: 'Buraq',
    fullLogo: null as File | null,
    logoWithoutWordmark: null as File | null,
    favicon: null as File | null,
  });

  const [eventsData, setEventsData] = useState({
    enabled: true,
    webhookEndpoint: 'https://hook.eu2.make.com/tGet54wr563hijelogicn2l2tIvsani7',
    token: 'e6QYYurRRNWJB0N3la0kbVSyh',
    events: {
      user: true,
      integration: false,
      channelConfiguration: false,
      feature: false,
      conversation: false,
      teammates: false,
      bot: false,
      subscription: false,
      account: true,
    },
  });

  const superAdmins = [
    { name: 'Customer Service', email: 'selfservice@buraq.ai' },
    { name: 'Dev Field', email: 'devfield@buraq.ai' },
    { name: 'abdullah', email: 'abdullah@buraq.ai' },
  ];

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle adding new admin
    console.log('Adding admin:', newAdminEmail);
    setIsAddAdminModalOpen(false);
    setNewAdminEmail('');
  };

  return (
    <Layout>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <nav className="space-y-1 p-4">
            {settingsNavigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  block px-4 py-2 text-sm rounded-md
                  ${activeSection === item.name.toLowerCase()
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                  }
                `}
                onClick={() => setActiveSection(item.name.toLowerCase())}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeSection === 'branding' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">General</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Product Name</label>
                  <p className="text-sm text-gray-500">This name will be used across all areas of the whitelabel where product name is needed.</p>
                  <input
                    type="text"
                    value={brandingData.productName}
                    onChange={(e) => setBrandingData({ ...brandingData, productName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Logo (with Wordmark)</label>
                  <p className="text-sm text-gray-500">This logo will appear on the login and signup pages. Upload an SVG file.</p>
                  <input
                    type="file"
                    accept=".svg"
                    onChange={(e) => setBrandingData({ ...brandingData, fullLogo: e.target.files?.[0] || null })}
                    className="mt-1 block w-full"
                  />
                </div>

                {/* Add more branding fields */}
              </div>
            </div>
          )}

          {activeSection === 'events' && (
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-6">Events</h2>
              <p className="text-sm text-gray-500 mb-4">We attempt to send the list of events to your webhook endpoints.</p>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-700 mr-4">Enable events</label>
                  <button
                    type="button"
                    onClick={() => setEventsData({ ...eventsData, enabled: !eventsData.enabled })}
                    className={`
                      relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                      ${eventsData.enabled ? 'bg-blue-600' : 'bg-gray-200'}
                    `}
                  >
                    <span className={`
                      pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                      ${eventsData.enabled ? 'translate-x-5' : 'translate-x-0'}
                    `} />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Webhook Endpoint</label>
                  <input
                    type="text"
                    value={eventsData.webhookEndpoint}
                    onChange={(e) => setEventsData({ ...eventsData, webhookEndpoint: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Token</label>
                  <input
                    type="text"
                    value={eventsData.token}
                    onChange={(e) => setEventsData({ ...eventsData, token: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                {/* Event checkboxes */}
                <div className="space-y-4">
                  {Object.entries(eventsData.events).map(([key, value]) => (
                    <div key={key} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setEventsData({
                          ...eventsData,
                          events: { ...eventsData.events, [key]: e.target.checked }
                        })}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label className="ml-2 text-sm text-gray-700 capitalize">{key}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'super admins' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">Super Admins</h2>
                <button
                  onClick={() => setIsAddAdminModalOpen(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Add Super Admin
                </button>
              </div>

              <div className="bg-white shadow rounded-lg">
                <ul className="divide-y divide-gray-200">
                  {superAdmins.map((admin) => (
                    <li key={admin.email} className="px-6 py-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                          <p className="text-sm text-gray-500">{admin.email}</p>
                        </div>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-800">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Super Admin Modal */}
      <Dialog
        open={isAddAdminModalOpen}
        onClose={() => setIsAddAdminModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white shadow-xl">
            <div className="p-6">
              <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                Add Super Admin
              </Dialog.Title>

              <form onSubmit={handleAddAdmin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={newAdminEmail}
                    onChange={(e) => setNewAdminEmail(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter email address"
                  />
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsAddAdminModalOpen(false)}
                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                  >
                    Add Super Admin
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Layout>
  );
}
