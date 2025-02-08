// components/shared/NumberInput.tsx
"use client";
import React from "react";

interface NumberInputProps {
  label?: string; // Optional label, for cases where the label is separate
  value?: number | string;
  disabled?: boolean;
  placeholder?: string;
  id?: string; // Add id prop for label association
}

export function NumberInput({
  label,
  value,
  disabled = false,
  placeholder,
  id,
}: NumberInputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        type="number"
        id={id}
        value={value}
        disabled={disabled}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 text-right"
        placeholder={placeholder}
      />
    </div>
  );
}