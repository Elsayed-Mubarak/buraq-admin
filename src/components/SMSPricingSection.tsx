// components/SMSPricingSection.tsx
"use client";
import React from "react";
import { NumberInput } from "./shared/NumberInput";

export function SMSPricingSection() {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 gap-y-4 mt-2">
                <NumberInput
                    label="To send text message price (Used local number)"
                    id="to-send-price"
                    disabled
                    placeholder="0.0001"
                />
                <NumberInput
                    label="To receive text message price (Used local number)"
                    id="to-receive-price"
                    disabled
                    placeholder="0.0001"
                />
            </div>
        </div>
    );
}