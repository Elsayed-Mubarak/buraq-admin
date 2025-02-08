// components/PlanDetailsModal.tsx (Revised)
"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import TransitionChild from "./TransitionRoot/TransitionChild"; // Import TransitionChild
import { PlanDetailsContent } from "./PlanDetailsContent"; // Import PlanDetailsContent
import { PlanDetailsModalProps } from "@/app/types/Types";
import { ModalButtons } from "./shared/ModalButtons";

export function PlanDetailsModal({
  isOpen,
  onClose,
  plan,
}: PlanDetailsModalProps) {


  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <TransitionChild />
        <div className="fixed inset-0 z-10 overflow-y-hidden">
          <div className="flex min-h-full justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 overflow-y-auto max-h-[90vh]">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      {plan?.name} - Plan details
                    </Dialog.Title>
                    <PlanDetailsContent plan={plan} />
                  </div>
                </div>
               <ModalButtons onCancel={onClose} onSave={onClose}/>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}