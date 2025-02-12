import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { AddSuperAdminModalProps } from "@/app/types/super-admins/SuperAminds";

const AddSuperAdminModal: React.FC<AddSuperAdminModalProps> = ({
  isOpen,
  onClose,
  onAddAdmin,
}) => {
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle response to backend
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!newAdminEmail.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(newAdminEmail)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      setIsSubmitting(true);
      await onAddAdmin(newAdminEmail);
      onClose();
      setNewAdminEmail("");
    } catch (error) {
      setError("Failed to add admin. Please try again.");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setError("");
    setNewAdminEmail("");
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      className="relative z-50"
      aria-labelledby="add-admin-modal-title"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded-lg bg-white shadow-xl">
          <div className="p-6">
            <Dialog.Title
              id="add-admin-modal-title"
              className="text-lg font-bold text-gray-900 mb-4"
            >
              Add Super Admin
            </Dialog.Title>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label
                  htmlFor="admin-email"
                  className="block text-sm font-bold text-gray-700"
                >
                  Email
                </label>
                <input
                  id="admin-email"
                  type="email"
                  value={newAdminEmail}
                  onChange={(e) => {
                    setNewAdminEmail(e.target.value);
                    setError("");
                  }}
                  className={`mt-1 block w-full rounded-md shadow-sm sm:text-sm
                    ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    }`}
                  placeholder="Enter email address"
                  aria-invalid={error ? "true" : "false"}
                  aria-describedby={error ? "email-error" : undefined}
                  disabled={isSubmitting}
                />
                {error && (
                  <p
                    id="email-error"
                    className="mt-2 text-sm text-red-600"
                    role="alert"
                  >
                    {error}
                  </p>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Super Admin"}
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
