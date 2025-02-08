// components/UtilitySection.tsx
"use client";
import { CheckboxInput } from "./shared/CheckboxInput";
import { NumberInput } from "./shared/NumberInput";

export function UtilitySection() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
        <CheckboxInput label="Anonymize Facebook Visitor" disabled />
        <CheckboxInput label="Audit logs" disabled />
        <CheckboxInput label="Data Injection" disabled />
        <CheckboxInput label="Disable Domain Restriction" disabled />
        <CheckboxInput label="Enrich IP Information" defaultChecked disabled />
        <CheckboxInput label="Events" disabled />

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Outbound
          </label>
          <div className="mt-1 grid grid-cols-2 gap-x-6 gap-y-2">
            <NumberInput
              label="Max outbound messages"
              id="max-outbound-messages"
              disabled
              placeholder="0"
            />
            <NumberInput
              label="Max outbound contacts per request"
              id="max-outbound-contacts"
              disabled
              placeholder="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}