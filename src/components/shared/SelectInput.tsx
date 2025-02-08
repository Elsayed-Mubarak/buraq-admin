// components/shared/SelectInput.tsx
"use client";
interface SelectInputProps {
    id: string;
    label?: string; // Make label optional
    options: string[];
    disabled?: boolean;
    defaultValue?: string; // Add defaultValue prop
  }

  export function SelectInput({
    id,
    label,
    options,
    disabled = false,
    defaultValue = options[0], // Default to the first option
  }: SelectInputProps) {
    return (
      <div>
        {label && ( // Conditionally render the label
          <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <select
          disabled={disabled}
          id={id}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          defaultValue={defaultValue} // Use defaultValue to set the initially selected option
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  }