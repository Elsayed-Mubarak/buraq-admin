"use client";
import React, { useState, ChangeEvent } from "react";
import SettingsSidebar from "../SettingsSidebar";
import { settingsNavigation } from "../commonSettings/Common";
import Layout from "@/components/layout/Layout";

interface FreeTrialProps {
  [key: string]: unknown;
}

const FreeTrial: React.FC<FreeTrialProps> = () => {
  const [enableFreeTrial, setEnableFreeTrial] = useState<boolean>(true);
  const [trialDays, setTrialDays] = useState<number>(7);
  const [trialAttempts, setTrialAttempts] = useState<number>(1);

  const handleEnableFreeTrialChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setEnableFreeTrial(event.target.checked);
  };

  const handleTrialDaysChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setTrialDays(isNaN(value) || value < 0 ? 0 : value);
  };

  const handleTrialAttemptsChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setTrialAttempts(isNaN(value) || value < 0 ? 0 : value);
  };

  const handleSave = async () => {
    try {
      // this the object to send to bacend
      const freeTrialSettings = {
        enableFreeTrial,
        trialDays,
        trialAttempts,
      };
      const response = await fetch("/api/free-trial-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(freeTrialSettings),
      });

      if (response.ok) {
        console.log("Free trial settings saved:", freeTrialSettings);
      } else {
        console.error(
          "Failed to save free trial settings:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error saving free trial settings:", error);
    }
  };

  return (
    <div className="m-4">
      <div className="flex h-full">
        <Layout>
          <SettingsSidebar settingsNavigation={settingsNavigation} />
        </Layout>
        <div className="ml-4 flex-1">
          <div className=" rounded-md p-6 border-gray-200 shadow-sm max-w-xl">
            <section className="mb-5">
              <h2 className="text-xl font-semibold text-gray-900">
                Free trial
              </h2>
              <p className="text-sm text-gray-500">
                Enables users to initiate a free trial of the platform with all
                features for a period of days.
              </p>
            </section>

            <div className="mb-4 flex items-center">
              <input
                id="enable-free-trial"
                name="enable-free-trial"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                checked={enableFreeTrial}
                onChange={handleEnableFreeTrialChange}
              />
              <label
                htmlFor="enable-free-trial"
                className="ml-2 block text-sm text-gray-900"
              >
                Enable free trial
              </label>
            </div>

            <div className="mb-3">
              <div className="flex items-center">
                <div className="relative rounded-md shadow-sm w-20 mr-2">
                  <input
                    type="number"
                    name="trial-days"
                    id="trial-days"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 text-right"
                    placeholder="0"
                    value={trialDays}
                    onChange={handleTrialDaysChange}
                  />
                </div>
                <label
                  htmlFor="trial-days"
                  className="block text-sm text-gray-700 whitespace-nowrap"
                >
                  number of days in a trial
                </label>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-center">
                <div className="relative rounded-md shadow-sm w-20 mr-2">
                  <input
                    type="number"
                    name="trial-attempts"
                    id="trial-attempts"
                    className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2 text-right"
                    placeholder="0"
                    value={trialAttempts}
                    onChange={handleTrialAttemptsChange}
                  />
                </div>
                <label
                  htmlFor="trial-attempts"
                  className="block text-sm text-gray-700 whitespace-nowrap"
                >
                  number of trial attempts allowed
                </label>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
