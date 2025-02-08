// components/ModalButtons.tsx
"use client"
import React from "react";
interface ModalButtonsProps {
    onSave: () => void;
    onCancel: () => void;
}

export function ModalButtons({onSave, onCancel}: ModalButtonsProps) {
    return (
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
                onClick={onSave}
            >
                Save
            </button>
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onCancel}
            >
                Cancel
            </button>
        </div>
    )
}