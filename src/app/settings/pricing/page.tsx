"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import SettingsSidebar from "../SettingsSidebar";
import { settingsNavigation } from "../commonSettings/Common";
import Layout from "@/components/layout/Layout";

interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, id, placeholder }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1">
      <input
        type="text"
        name={id}
        id={id}
        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        placeholder={placeholder}
      />
    </div>
  </div>
);

function ConfigurationContent() {
  const inputFields: InputFieldProps[] = [
    {
      label: "Default pricing page URL",
      id: "default-pricing-page-url",
      placeholder: "Enter pricing plan url here",
    },
    {
      label: "Webhook key",
      id: "webhook-key",
      placeholder: "Enter extra chats plan id here",
    },
    {
      label: "Signing secret",
      id: "signing-secret",
      placeholder: "Enter signing secret here",
    },
    {
      label: "Plan ID for extra chats",
      id: "plan-id-extra-chats",
      placeholder: "Enter extra chat plan id here",
    },
    {
      label: "Plan ID for extra AI credits",
      id: "plan-id-extra-ai-credits",
      placeholder: "Enter extra AI credits plan id here",
    },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900">Stripe</h3>
      <p className="mt-1 text-sm text-gray-500">
        Set up your Stripe account to handle billing and payments. You can find
        this information in your Stripe account.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-1">
        {inputFields.map((field) => (
          <InputField key={field.id} {...field} />
        ))}
      </div>

      <div className="mt-6">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </div>
  );
}

function Pricing() {
  const pathname = usePathname();
  const plansHref = `${pathname}/plans`;

  return (
    <div className="m-4">
      <div className="flex h-full">
        <Layout>

        <SettingsSidebar settingsNavigation={settingsNavigation} />
        </Layout>
        <div className="ml-4 flex-1">
          <div className="rounded-lg p-6 shadow-sm max-w-2xl border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
            <p className="text-gray-500 mb-4">
              Configuration of pricing plans for your instance.
            </p>

            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <Link href={pathname} legacyBehavior>
                  <a
                    className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                    aria-current="page"
                  >
                    Configuration
                  </a>
                </Link>
                <Link href={plansHref} legacyBehavior>
                  <a className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm">
                    Plans
                  </a>
                </Link>
              </nav>
            </div>

            <div className="mt-6">
              <ConfigurationContent />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
