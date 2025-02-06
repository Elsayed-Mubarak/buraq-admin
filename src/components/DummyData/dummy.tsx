"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { clsx } from "clsx";

// Dummy Data (you'll likely fetch this from an API)
const plans = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    status: "Inactive",
    users: 1,
    bots: 10,
    conversations: 1000,
    features: ["Basic features"],
  },
  {
    name: "Free-Trial",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    status: "Active",
    users: 5,
    bots: 50,
    conversations: 5000,
    features: ["Basic features", "Trial of premium features"],
  },
  {
    name: "Pro",
    monthlyPrice: "$49",
    yearlyPrice: "$490",
    status: "Active",
    users: 10,
    bots: 100,
    conversations: 10000,
    features: ["Premium features", "Priority support"],
  },
  {
    name: "Growth",
    monthlyPrice: "$99",
    yearlyPrice: "$990",
    status: "Active",
    users: 20,
    bots: 200,
    conversations: 20000,
    features: [
      "Premium features",
      "Priority support",
      "Dedicated account manager",
    ],
  },
  {
    name: "Leadership",
    monthlyPrice: "$199",
    yearlyPrice: "$1990",
    status: "Active",
    users: 50,
    bots: 500,
    conversations: 50000,
    features: [
      "Premium features",
      "Priority support",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
  {
    name: "Custom",
    monthlyPrice: "Contact Us",
    yearlyPrice: "Contact Us",
    status: "Active",
    users: "Unlimited",
    bots: "Unlimited",
    conversations: "Unlimited",
    features: ["All features", "Custom solutions"],
  },
];

interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  status: string;
  users: number | string;
  bots: number | string;
  conversations: number | string;
  features: string[];
}

interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Modal component for plan details (Edit Modal)
export function PlanDetailsModal({
  isOpen,
  onClose,
  plan,
}: PlanDetailsModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {plan?.name} - Plan details
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="mt-4">
                        <h4 className="font-medium">Usage</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={plan?.bots !== undefined}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Bot Limit
                              </span>
                            </label>
                            <input
                              type="number"
                              value={plan?.bots}
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="Max Bots Limit"
                            />
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={
                                  plan?.conversations !== undefined
                                }
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Conversations
                              </span>
                            </label>
                            <input
                              type="number"
                              value={plan?.conversations}
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="Conversation Balance"
                            />
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Extra Chat
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={plan?.users !== undefined}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Users
                              </span>
                            </label>
                            <input
                              type="number"
                              value={plan?.users}
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="Max Users"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">SMS Pricing</h4>
                        <div className="grid grid-cols-1 gap-y-4 mt-2">
                          <div>
                            <label
                              htmlFor="to-send-price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              To send text message price (Used local number)
                            </label>
                            <input
                              type="number"
                              id="to-send-price"
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="0.0001"
                            />
                          </div>
                          <div>
                            <label
                              htmlFor="to-receive-price"
                              className="block text-sm font-medium text-gray-700"
                            >
                              To receive text message price (Used local number)
                            </label>
                            <input
                              type="number"
                              id="to-receive-price"
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="0.0001"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">Action block</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Airtable
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Calendly
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Google Dialogflow
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Dynamic Data
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Freshdesk
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Google Analytics
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Google Calendar
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Google Sheets
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                HubSpot
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Human Handover
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Slack
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                HTTP request (Streaming)
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Webhook
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Whatsapp catalog
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Zapier
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Zoho CRM
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Codeblock
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">Chat widget</h4>
                        <div className="grid grid-cols-1 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Custom CSS
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Fire Javascripts
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Remove Branding
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Retain Button List
                            </label>
                            <div className="mt-1 flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <select
                                disabled
                                className="ml-2 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option>Clickable</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">Utility</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Anonymize Facebook Visitor
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Audit logs
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Data Injection
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Disable Domain Restriction
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={true}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Enrich IP Information
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Events
                              </span>
                            </label>
                          </div>

                          <div className="col-span-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Outbound
                            </label>
                            <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
                              <div>
                                <label
                                  htmlFor="max-outbound-messages"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Max outbound messages
                                </label>
                                <input
                                  type="number"
                                  id="max-outbound-messages"
                                  disabled
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                  placeholder="0"
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="max-outbound-contacts"
                                  className="block text-sm font-medium text-gray-700"
                                >
                                  Max outbound contacts per request
                                </label>
                                <input
                                  type="number"
                                  id="max-outbound-contacts"
                                  disabled
                                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                  placeholder="0"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">Custom integration</h4>
                        <div className="grid grid-cols-1 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                outbound
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">Channels</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Email
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={true}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Facebook
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Instagram
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={true}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                SMS
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={true}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Web
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={true}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                WhatsApp
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-medium">AI Studio</h4>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Custom Answer
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Function Call
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Generate Answer
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Rewrite Answer
                              </span>
                            </label>
                          </div>

                          <div className="col-span-2">
                            <label
                              htmlFor="ai-model"
                              className="block text-sm font-medium text-gray-700"
                            >
                              AI model
                            </label>
                            <select
                              disabled
                              id="ai-model"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option>gpt-4o</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="ai-studio-knowledge"
                              className="block text-sm font-medium text-gray-700"
                            >
                              AI Studio Knowledge bases
                            </label>
                            <input
                              type="number"
                              id="ai-studio-knowledge"
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="0"
                            />
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="ai-models"
                              className="block text-sm font-medium text-gray-700"
                            >
                              AI Models
                            </label>
                            <select
                              disabled
                              id="ai-models"
                              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            >
                              <option>gpt-3.5-turbo-1106</option>
                            </select>
                          </div>
                          <div className="col-span-2">
                            <label
                              htmlFor="data-sources"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Data sources
                            </label>
                            <input
                              type="number"
                              id="data-sources"
                              disabled
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                              placeholder="0"
                            />
                          </div>

                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                ReTrain AI Model
                              </span>
                            </label>
                          </div>
                          <div>
                            <label className="inline-flex items-center">
                              <input
                                type="checkbox"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                defaultChecked={false}
                                disabled
                              />
                              <span className="ml-2 text-sm text-gray-900">
                                Source Citation
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                    onClick={onClose}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// Modal component for creating new plan
function CreatePlanModal({ isOpen, onClose }: CreatePlanModalProps) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Create New Plan
                    </Dialog.Title>
                    <div className="mt-2">
                      <div className="grid grid-cols-1 gap-y-4">
                        <div>
                          <label
                            htmlFor="plan-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Plan Name
                          </label>
                          <input
                            type="text"
                            name="plan-name"
                            id="plan-name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                            placeholder="Enter plan name"
                          />
                        </div>

                        <div className="mt-4">
                          <h4 className="font-medium">Usage</h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Bot Limit
                                </span>
                              </label>
                              <input
                                type="number"
                                name="bot-limit"
                                id="bot-limit"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="Max Bots Limit"
                              />
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Conversations
                                </span>
                              </label>
                              <input
                                type="number"
                                name="conversations"
                                id="conversations"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="Conversation Balance"
                              />
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Extra Chat
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Users
                                </span>
                              </label>
                              <input
                                type="number"
                                name="max-users"
                                id="max-users"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="Max Users"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">SMS Pricing</h4>
                          <div className="grid grid-cols-1 gap-y-4 mt-2">
                            <div>
                              <label
                                htmlFor="to-send-price-create"
                                className="block text-sm font-medium text-gray-700"
                              >
                                To send text message price (Used local number)
                              </label>
                              <input
                                type="number"
                                id="to-send-price-create"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0.0001"
                              />
                            </div>
                            <div>
                              <label
                                htmlFor="to-receive-price-create"
                                className="block text-sm font-medium text-gray-700"
                              >
                                To receive text message price (Used local
                                number)
                              </label>
                              <input
                                type="number"
                                id="to-receive-price-create"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0.0001"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">Action block</h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Airtable
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Calendly
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Dialogflow
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Dynamic Data
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Freshdesk
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Analytics
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Calendar
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Sheets
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  HubSpot
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Human Handover
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Slack
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  HTTP request (Streaming)
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Webhook
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Whatsapp catalog
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Zapier
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Zoho CRM
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Codeblock
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">Chat widget</h4>
                          <div className="grid grid-cols-1 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Custom CSS
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Fire Javascripts
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Remove Branding
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700">
                                Retain Button List
                              </label>
                              <div className="mt-1 flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <select className="ml-2 block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                  <option>Clickable</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">Utility</h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Anonymize Facebook Visitor
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Audit logs
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Data Injection
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Disable Domain Restriction
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Enrich IP Information
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Events
                                </span>
                              </label>
                            </div>

                            <div className="col-span-2">
                              <label className="block text-sm font-medium text-gray-700">
                                Outbound
                              </label>
                              <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
                                <div>
                                  <label
                                    htmlFor="max-outbound-messages-create"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Max outbound messages
                                  </label>
                                  <input
                                    type="number"
                                    id="max-outbound-messages-create"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                    placeholder="0"
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="max-outbound-contacts-create"
                                    className="block text-sm font-medium text-gray-700"
                                  >
                                    Max outbound contacts per request
                                  </label>
                                  <input
                                    type="number"
                                    id="max-outbound-contacts-create"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                    placeholder="0"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">Custom integration</h4>
                          <div className="grid grid-cols-1 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  outbound
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">Channels</h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Email
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Facebook
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Instagram
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  SMS
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Web
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  WhatsApp
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6">
                          <h4 className="font-medium">AI Studio</h4>
                          <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Custom Answer
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Function Call
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Generate Answer
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Rewrite Answer
                                </span>
                              </label>
                            </div>

                            <div className="col-span-2">
                              <label
                                htmlFor="ai-model-create"
                                className="block text-sm font-medium text-gray-700"
                              >
                                AI model
                              </label>
                              <select
                                id="ai-model-create"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option>gpt-4o</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="ai-studio-knowledge-create"
                                className="block text-sm font-medium text-gray-700"
                              >
                                AI Studio Knowledge bases
                              </label>
                              <input
                                type="number"
                                id="ai-studio-knowledge-create"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0"
                              />
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="ai-models-create"
                                className="block text-sm font-medium text-gray-700"
                              >
                                AI Models
                              </label>
                              <select
                                id="ai-models-create"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              >
                                <option>gpt-3.5-turbo-1106</option>
                              </select>
                            </div>
                            <div className="col-span-2">
                              <label
                                htmlFor="data-sources-create"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Data sources
                              </label>
                              <input
                                type="number"
                                id="data-sources-create"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0"
                              />
                            </div>

                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  ReTrain AI Model
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Source Citation
                                </span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                    onClick={onClose} // Replace with actual create logic
                  >
                    Create Plan
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

// Table component for plans
function PlanTable() {
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for Create Plan Modal

  const handleEditClick = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsEditModalOpen(true);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(true); // Open Create Plan Modal
  };

  return (
    <div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">Plans</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the plans including their name, price, and status.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              onClick={handleCreateClick} // Open Create Modal on click
            >
              Create Plan
            </button>
          </div>
        </div>
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Plan Name
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price Monthly
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Price Yearly
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                      >
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {plans.map((plan) => (
                      <tr key={plan.name}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {plan.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {plan.monthlyPrice}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {plan.yearlyPrice}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span
                            className={clsx(
                              "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                              plan.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            )}
                          >
                            {plan.status}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={() => handleEditClick(plan)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit<span className="sr-only">, {plan.name}</span>
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

        {/* Edit Modal for plan details */}
        <PlanDetailsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          plan={selectedPlan}
        />

        {/* Create Plan Modal */}
        <CreatePlanModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      </div>
    </div>
  );
}

export default PlanTable;
