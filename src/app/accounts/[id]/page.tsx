"use client";

//import { useState} from "react";
import { Tab } from "@headlessui/react";
import Layout from "@/components/layout/Layout";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
import adminPortalData from "@/components/DummyData/dummyUsers";
import { usePathname } from "next/navigation";
import Branding from "../branding/Branding";
import Features from "../features/Features";
import Bots from "../bots/Bots";
import Users from "../users/Users";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}


export default function AccountDetails() {
  const params = usePathname();
  //const [selectedTab, setSelectedTab] = useState(0);
  //const lastSlashIndex = params.lastIndexOf("/");
  const accountId = params.substring(10, params.length); // /accounts/328
  console.log("accountId" + accountId);
  const userInfo = adminPortalData.filter((user) => {
    return user.accountID.toString() === accountId;
  });


  //Dummy
  const accountData = {
    id: userInfo[0].accountID,
    name: userInfo[0].accountName,
    status: userInfo[0].status,
    websiteUrl: "",
    codeSnippet: '<script src="" defer></script>',
    users: 1,
    subscription: {
      renewalDate: "28-Jan-04",
      conversations: "0/1,000",
      plan: "Free",
      outboundSends: 0,
    },
    channels: {
      web: false,
      whatsApp: false,
      facebook: false,
      sms: false,
    },
    owner: {
      name: userInfo[0]?.owner || "N/A",
      phone: "+966593637494",
      email: userInfo[0]?.email || "N/A",
    },
    activity: {
      created: userInfo[0]?.createdUTC || "N/A",
      lastDeployed: "28-Jan-25 02:31 PM",
    },
  };

  // next phase i will split this to section [branding features .....]
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6 px-4 pt-4">
        <div className="flex items-center" style={{marginLeft:"50px"}}>
          {" "}
          <Link
            href="/accounts"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back
          </Link>
        </div>
        <div className="flex-grow flex justify-center">
          {" "}
          {/*Added flex-grow and justify-center */}
          <h1 className="text-2xl font-semibold text-gray-900">
            {userInfo[0].accountName} ({userInfo[0].accountID})
          </h1>
        </div>

        <div className="space-x-4">
          <button className="inline-flex items-center px-4 py-2 border border-blue-600 text-sm font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50">
            Impersonate
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-red-600 text-sm font-medium rounded-md text-red-600 bg-white hover:bg-red-50">
            Delete Account
          </button>
        </div>
      </div>
      <div className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto mt-8">
        <Tab.Group >
          <Tab.List className="flex space-x-1 rounded-xl bg-white p-1">
            {["Account", "Branding", "Features", "Bots", "Users"].map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "w-full py-2.5 text-sm rounded-md font-medium leading-5 border border-gray-200 bg-white",
                    "ring-white ring-opacity-60 ring-offset-2 focus:outline-none",
                    selected
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
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
                  <h3 className="text-lg font-extrabold text-gray-900 mb-4">
                    Account
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Account ID:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.id}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Status:{" "}
                        <span
                          className={`font-bold ${
                            accountData.status === "Active"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {accountData.status}
                        </span>
                      </dt>
                    </div>

                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        # of users:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.users}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Code snippet
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <code className="bg-gray-100 p-2 rounded block break-words">
                          {accountData.codeSnippet}
                        </code>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Subscription */}
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Subscription
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Renewal Date:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.subscription.renewalDate}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm text-gray-500">
                        Plan:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.subscription.plan}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Conversations:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.subscription.conversations}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm text-gray-500">
                        Outbound sends:{" "}
                        <span className="font-bold text-gray-900">
                          {/*{accountData}*/}0
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>
              {/* Channels */}
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Channels
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Web:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.channels.web ? "TRUE" : "FALSE"}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        WhatsApp:{" "}
                        <span className="font-bold text-gray-900">
                          {" "}
                          {accountData.channels.whatsApp ? "TRUE" : "FALSE"}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Facebook:{" "}
                        <span className="font-bold text-gray-900">
                          {" "}
                          {accountData.channels.facebook ? "TRUE" : "FALSE"}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        SMS:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.channels.sms ? "TRUE" : "FALSE"}
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>
              {/* Owner */}
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Owner
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Name:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.owner.name}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Phone:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.owner.phone}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Email:{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.owner.email}
                        </span>
                      </dt>
                    </div>
                  </dl>
                </div>
              </div>
              {/* Activity */}
              <div className="mt-6 bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Activity
                  </h3>
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        Created(UTC):{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.activity.created}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm  text-gray-500">
                        LastDeployed(UTC):{" "}
                        <span className="font-bold text-gray-900">
                          {accountData.activity.lastDeployed}
                        </span>
                      </dt>
                    </div>
                    <div className="sm:col-span-1"></div>
                  </dl>
                </div>
              </div>
              {/* Additional sections */}
            </Tab.Panel>

            {/* Other tab panels will be implemented similarly */}
            <Tab.Panel>
              <Branding />
            </Tab.Panel>
            <Tab.Panel>
              <Features />
            </Tab.Panel>
            <Tab.Panel>
              <Bots />
            </Tab.Panel>
            <Tab.Panel>
              <Users />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </Layout>
  );
}
