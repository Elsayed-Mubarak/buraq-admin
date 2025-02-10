import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { AddSuperAdminModalProps } from "@/app/types/super-admins/SuperAminds";


const AddSuperAdminModal: React.FC<AddSuperAdminModalProps> = ({
  isOpen,
  onClose,
  onAddAdmin,
}) => {
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    onAddAdmin(newAdminEmail);
    onClose();
    setNewAdminEmail("");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white shadow-xl">
          <div className="p-6">
            <Dialog.Title className="text-lg font-bold text-gray-900 mb-4">
              Add Super Admin
            </Dialog.Title>

            <form onSubmit={handleAddAdmin}>
              <div>
                <label className="block text-sm font-bold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  placeholder="Enter email address"
                />
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
                >
                  Add Super Admin
                </button>
              </div>
            </form>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddSuperAdminModal;
