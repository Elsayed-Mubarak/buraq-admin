"use client";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CreatePlanModalProps, PlanState,initialNewPlanState } from "../types/Types";

// Modal component for creating new plan
export function CreatePlanModal({
  isOpen,
  onClose,
  onCreatePlan,
}: CreatePlanModalProps) {

  // State 
  const [newPlan, setNewPlan] = useState<PlanState>(initialNewPlanState);

  const handleCreatePlan = async () => {
    const newAddedPlan: PlanState = {
      ...newPlan,
      name: newPlan.planName,
      monthlyPrice: newPlan.monthlyPrice,
      yearlyPrice: newPlan.yearlyPrice,
      bots: newPlan.botLimitChecked ? parseInt(newPlan.botLimit, 10) || 0 : 0,
      conversations: newPlan.conversationsChecked ? newPlan.conversations : 0,
      users: newPlan.usersChecked ? parseInt(newPlan.maxUsers, 10) || 0 : 0,
      toSendPrice: newPlan.toSendPrice || 0,
      toReceivePrice: newPlan.toReceivePrice || 0,
      status: newPlan.status,
      maxOutboundMessages: newPlan.maxOutboundMessages,
      maxOutboundContacts: newPlan.maxOutboundContacts,
      aiStudioKnowledgeBases: newPlan.aiStudioKnowledgeBases,
      dataSources: newPlan.dataSources,
      // i should add other fields
    };

    onCreatePlan(newAddedPlan);
    onClose();
  };


  // i avoided typescript error so is 
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setNewPlan((prevPlan) => ({
        ...prevPlan,
        [name]: checked,
      }));
    } else {
      const { value } = e.target;
      setNewPlan((prevPlan) => ({
        ...prevPlan,
        [name]: value,
      }));
    }
  };

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
                            value={newPlan.planName}
                            onChange={handleInputChange}
                            name="planName"
                            type="text"
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
                                  name="botLimitChecked"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.botLimitChecked}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Bot Limit
                                </span>
                              </label>
                              <input
                                type="number"
                                name="botLimit"
                                id="bot-limit"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="Max Bots Limit"
                                value={newPlan.botLimit}
                                onChange={handleInputChange}
                                disabled={!newPlan.botLimitChecked}
                              />
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="conversationsChecked"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.conversationsChecked}
                                  onChange={handleInputChange}
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
                                value={newPlan.conversations}
                                onChange={handleInputChange}
                                disabled={!newPlan.conversationsChecked}
                              />
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="extraChatChecked"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.extraChatChecked}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Extra Chat
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="usersChecked"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.usersChecked}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Users
                                </span>
                              </label>
                              <input
                                type="number"
                                name="maxUsers"
                                id="max-users"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="Max Users"
                                value={newPlan.maxUsers}
                                onChange={handleInputChange}
                                disabled={!newPlan.usersChecked}
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
                                name="toSendPrice"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0.0001"
                                value={newPlan.toSendPrice}
                                onChange={handleInputChange}
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
                                name="toReceivePrice"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0.0001"
                                value={newPlan.toReceivePrice}
                                onChange={handleInputChange}
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
                                  name="airtable"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.airtable}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Airtable
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="calendly"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.calendly}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Calendly
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="googleDialogflow"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.googleDialogflow}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Dialogflow
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="dynamicData"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.dynamicData}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Dynamic Data
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="freshdesk"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.freshdesk}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Freshdesk
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="googleAnalytics"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.googleAnalytics}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Analytics
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="googleCalendar"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.googleCalendar}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Calendar
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="googleSheets"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.googleSheets}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Google Sheets
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="hubSpot"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.hubSpot}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  HubSpot
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="humanHandover"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.humanHandover}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Human Handover
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="slack"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.slack}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Slack
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="httpRequest"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.httpRequest}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  HTTP request (Streaming)
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="webhook"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.webhook}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Webhook
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="whatsappCatalog"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.whatsappCatalog}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Whatsapp catalog
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="zapier"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.zapier}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Zapier
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="zohoCRM"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.zohoCRM}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Zoho CRM
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="codeblock"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.codeblock}
                                  onChange={handleInputChange}
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
                                  name="customCSS"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.customCSS}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Custom CSS
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="fireJavascripts"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.fireJavascripts}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Fire Javascripts
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="removeBranding"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.removeBranding}
                                  onChange={handleInputChange}
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
                                  name="retainButtonList"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.retainButtonList}
                                  onChange={handleInputChange}
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
                                  name="anonymizeFacebookVisitor"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.anonymizeFacebookVisitor}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Anonymize Facebook Visitor
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="auditLogs"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.auditLogs}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Audit logs
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="dataInjection"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.dataInjection}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Data Injection
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="disableDomainRestriction"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.disableDomainRestriction}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Disable Domain Restriction
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="enrichIPInformation"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.enrichIPInformation}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Enrich IP Information
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="events"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.events}
                                  onChange={handleInputChange}
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
                                    name="maxOutboundMessages"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                    placeholder="0"
                                    value={newPlan.maxOutboundMessages}
                                    onChange={handleInputChange}
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
                                    name="maxOutboundContacts"
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                    placeholder="0"
                                    value={newPlan.maxOutboundContacts}
                                    onChange={handleInputChange}
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
                                  name="customIntegrationOutbound"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.customIntegrationOutbound}
                                  onChange={handleInputChange}
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
                                  name="emailChannel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.emailChannel}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Email
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="facebookChannel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.facebookChannel}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Facebook
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="instagramChannel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.instagramChannel}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Instagram
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="smsChannel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.smsChannel}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  SMS
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="webChannel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.webChannel}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Web
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="whatsAppChannel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.whatsAppChannel}
                                  onChange={handleInputChange}
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
                                  name="customAnswerAI"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.customAnswerAI}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Custom Answer
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="functionCallAI"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.functionCallAI}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Function Call
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="generateAnswerAI"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.generateAnswerAI}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  Generate Answer
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="rewriteAnswerAI"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.rewriteAnswerAI}
                                  onChange={handleInputChange}
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
                                name="aiModel"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newPlan.aiModel}
                                onChange={handleInputChange}
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
                                name="aiStudioKnowledgeBases"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0"
                                value={newPlan.aiStudioKnowledgeBases}
                                onChange={handleInputChange}
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
                                name="aiModels"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                value={newPlan.aiModels}
                                onChange={handleInputChange}
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
                                name="dataSources"
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
                                placeholder="0"
                                value={newPlan.dataSources}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="reTrainAIModel"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.reTrainAIModel}
                                  onChange={handleInputChange}
                                />
                                <span className="ml-2 text-sm text-gray-900">
                                  ReTrain AI Model
                                </span>
                              </label>
                            </div>
                            <div>
                              <label className="inline-flex items-center">
                                <input
                                  name="sourceCitation"
                                  type="checkbox"
                                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
                                  checked={newPlan.sourceCitation}
                                  onChange={handleInputChange}
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
                    onClick={handleCreatePlan}
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