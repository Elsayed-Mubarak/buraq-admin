// components/CustomIntegrationSection.tsx
"use client"
import { CheckboxInput } from "./shared/CheckboxInput"

export function CustomIntegrationSection() {
    return (
        <div className="mt-6">
            <div className="grid grid-cols-1 gap-y-4 mt-2">
                <CheckboxInput label="outbound" disabled />
            </div>
        </div>
    )
}