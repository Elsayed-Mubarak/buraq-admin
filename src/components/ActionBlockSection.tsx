//components/ActionBlockSection.tsx
"use client";
import { CheckboxInput } from "./shared/CheckboxInput";

const actionItems = [
  "Airtable",
  "Calendly",
  "Google Dialogflow",
  "Dynamic Data",
  "Freshdesk",
  "Google Analytics",
  "Google Calendar",
  "Google Sheets",
  "HubSpot",
  "Human Handover",
  "Slack",
  "HTTP request (Streaming)",
  "Webhook",
  "Whatsapp catalog",
  "Zapier",
  "Zoho CRM",
  "Codeblock",
];
export function ActionBlockSection() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
        {actionItems.map((item) => (
          <CheckboxInput key={item} label={item} disabled />
        ))}
      </div>
    </div>
  );
}
