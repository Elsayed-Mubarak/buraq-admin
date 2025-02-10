"use client";
import React from "react";
import { CheckboxInput } from "./shared/CheckboxInput";
import { NumberInput } from "./shared/NumberInput";
import { Plan } from "@/app/types/plans-types/PlansTypes";

interface UsageSectionProps {
  plan?: Plan | null;
}

export function UsageSection({ plan }: UsageSectionProps) {
  return (
    <div className="mt-4">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
        <div>
          <CheckboxInput
            label="Bot Limit"
            defaultChecked={plan?.bots !== undefined}
            disabled
          />
          <NumberInput value={plan?.bots} disabled placeholder="Max Bots Limit" />
        </div>
        <div>
          <CheckboxInput
            label="Conversations"
            defaultChecked={plan?.conversations !== undefined}
            disabled
          />
          <NumberInput
            value={plan?.conversations}
            disabled
            placeholder="Conversation Balance"
          />
        </div>
        <CheckboxInput label="Extra Chat" disabled />
        <div>
          <CheckboxInput
            label="Users"
            defaultChecked={plan?.users !== undefined}
            disabled
          />
          <NumberInput value={plan?.users} disabled placeholder="Max Users" />
        </div>
      </div>
    </div>
  );
}