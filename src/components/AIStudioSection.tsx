// components/AIStudioSection.tsx
"use client";
import { CheckboxInput } from "./shared/CheckboxInput";
import { NumberInput } from "./shared/NumberInput";
import { SelectInput } from "./shared/SelectInput";

export function AIStudioSection() {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-2">
        <CheckboxInput label="Custom Answer" disabled />
        <CheckboxInput label="Function Call" disabled />
        <CheckboxInput label="Generate Answer" disabled />
        <CheckboxInput label="Rewrite Answer" disabled />

        <SelectInput
          id="ai-model"
          label="AI model"
          options={["gpt-4o"]}
          disabled
        />

        <NumberInput
          label="AI Studio Knowledge bases"
          id="ai-studio-knowledge"
          disabled
          placeholder="0"
        />
        <SelectInput
          id="ai-models"
          label="AI Models"
          options={["gpt-3.5-turbo-1106"]}
          disabled
        />
        <NumberInput
          label="Data sources"
          id="data-sources"
          disabled
          placeholder="0"
        />
        <CheckboxInput label="ReTrain AI Model" disabled />
        <CheckboxInput label="Source Citation" disabled />
      </div>
    </div>
  );
}
