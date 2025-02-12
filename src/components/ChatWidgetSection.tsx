// components/ChatWidgetSection.tsx
"use client";
import React from "react";
import { SelectInput } from "./shared/SelectInput";
import { CheckboxInput } from "./shared/CheckboxInput";

export function ChatWidgetSection() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-1 gap-y-4 mt-2">
        <CheckboxInput label="Custom CSS" disabled />
        <CheckboxInput label="Fire Javascripts" disabled />
        <CheckboxInput label="Remove Branding" disabled />
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Retain Button List
          </label>
          <div className="mt-1 flex items-center">
            <CheckboxInput label="" disabled />
            <SelectInput
              disabled
              options={["Clickable"]}
              id="retain-button-list"
            />
          </div>
        </div>
      </div>
    </div>
  );
}