"use client";
import { useState } from "react";


export default function EventsSettings() {
  const eventDescriptions = {
    user: "When the user updates their user details from the customer portal.",
    integration: "When we add/remove an account from an integration.",
    channelConfiguration:
      "When we add/update/delete a channel's configuration.",
    feature:
      "When we add/remove/update a feature from the account on the admin portal.",
    conversation:
      "When the conversation limit is fully utilized in an account.",
    teammates: "When we add/remove/update teammates from an account.",
    bot: "When we create/update/delete a bot.",
    subscription: "When we purchase/upgrade/downgrade the plan in an account.",
    account: "When we create/update an account from the customer/admin portal.",
  };

  const [eventsData, setEventsData] = useState({
    enabled: true,
    webhookEndpoint:
      "https://hook.eu2.make.com/tGet54wr563hijelogicn2l2tIvsani7",
    token: "e6QYYurRRNWJB0N3la0kbVSyh",
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

  //  save backend
  const handleSaveDate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //try {
    //  const res = await fetch("myapihere", {
    //    method: "POST",
    //    headers: {
    //      "Content-Type": "application/json",
    //    },
    //    body: JSON.stringify(eventsData),
    //  });
    //  if (res.ok) {
    //    console.log("Events settings saved successfully!");
    //  } else {
    //    console.error("Failed to save events settings:", res.status);
    //  }
    //} catch (e) {
    //  console.error("Error saving events settings:", e);
    //}
  };
  return (
    <div className="m-4">
      <div className="flex h-full">

        <div className="ml-4 flex-1">
          <div className="border-gray-200 rounded-lg shadow-sm max-w-xl px-4 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Events</h2>
            <p className="text-sm text-gray-500 mb-4">
              We attempt to send the list of events to your webhook endpoints.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <label className="text-sm font-bold text-gray-700 mr-4">
                  Enable events
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setEventsData({
                      ...eventsData,
                      enabled: !eventsData.enabled,
                    })
                  }
                  className={`
              relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              ${eventsData.enabled ? "bg-green-600" : "bg-gray-200"}
            `}
                >
                  <span
                    className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
              ${eventsData.enabled ? "translate-x-5" : "translate-x-0"}
            `}
                  />
                </button>
              </div>

              <div className="max-w-lg">
                <label className="block text-sm font-bold text-gray-700">
                  Webhook Endpoint
                </label>
                <input
                  type="text"
                  value={eventsData.webhookEndpoint}
                  onChange={(e) =>
                    setEventsData({
                      ...eventsData,
                      webhookEndpoint: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  The endpoint to which event data will be sent.
                </p>
              </div>

              <div className="max-w-lg">
                <label className="block text-sm font-bold text-gray-700">
                  Token
                </label>
                <input
                  type="text"
                  value={eventsData.token}
                  onChange={(e) =>
                    setEventsData({ ...eventsData, token: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
                <p className="text-sm text-gray-500 mt-2">
                  As soon as you enter the webhook URL, we will send a HTTP POST
                  request with the above token, and your endpoint must respond
                  with the token value.
                </p>
              </div>

              {/* Event checkboxes */}
              <div className="space-y-4">
                {Object.entries(eventsData.events).map(([key, value]) => (
                  <div key={key} className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setEventsData({
                            ...eventsData,
                            events: {
                              ...eventsData.events,
                              [key]: e.target.checked,
                            },
                          })
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-bold text-gray-700 capitalize">
                        {key}
                      </label>
                      <p className="text-gray-500">
                        {
                          eventDescriptions[
                            key as keyof typeof eventDescriptions
                          ]
                        }
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Save button for events section */}
              <div className="flex justify-start mt-6">
                <button onClick={handleSaveDate } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
