// components/shared/CheckboxInput.tsx
"use client";
import React from "react";

interface CheckboxInputProps {
  label: string;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: () => void;  // Optional onChange handler
}

export function CheckboxInput({
  label,
  defaultChecked = false,
  disabled = false,
  onChange
}: CheckboxInputProps) {
  return (
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
        defaultChecked={defaultChecked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className="ml-2 text-sm text-gray-900">{label}</span>
    </label>
  );
}