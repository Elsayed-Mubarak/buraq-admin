"use client";
import { PlanDetailsModalProps } from "@/app/types/plans-types/PlansTypes";
//import {
//  PlanDetailsModalProps,
//  //PlanState,
//  //initialNewPlanState,
//} from "../types/Types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import TransitionChild from "@/components/TransitionRoot/TransitionChild";

export function PlanDetailsModal({
  isOpen,
  onClose,
  plan,
  //onSave,
}: PlanDetailsModalProps) {
  // states
  //const [editedPlan, setEditedPlan] = useState<PlanState>(initialNewPlanState);

  // Initialize state when plan changes
  useEffect(() => {
    if (plan) {
      //setEditedPlan(plan);
    }
  }, [plan]);

  // Handle checkbox changes
  //const handleCheckBox = (field: keyof PlanState) => {
  //  setEditedPlan((prevPlan) => ({
  //    ...prevPlan,
  //    [field]: !prevPlan[field],
  //  }));
  //};

  // Handle save
  //const handleSave = () => {
  //  onSave(editedPlan);
  //  onClose();
  //};

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild />
        <div className="fixed inset-0 z-10 overflow-y-hidden">
          {" "}
          {/* Changed overflow-y-auto to overflow-y-hidden */}
          <div className="flex min-h-full justify-center p-4 text-center sm:p-0">
            {" "}
            {/* Removed items-end and sm:items-center */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 overflow-y-auto max-h-[90vh]">
                {" "}
                {/* Added overflow-y-auto and max-h-[90vh] to Dialog.Panel */}
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {plan?.name} - Plan details
                      {/*Dialog Title */}
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
