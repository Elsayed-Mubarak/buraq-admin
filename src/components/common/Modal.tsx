import React, { useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  width?: string; // Optional width prop
  height?: string; // Optional height prop
  buttonTitle: string; // Button title (required)
  isCloseButton?: boolean; // Optional close button
  onClick: () => void; // Click handler for the primary button
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "1/2", // Default width
  height = "90vh", // Default height
  buttonTitle,
  isCloseButton = false,
  onClick,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        ref={modalRef}
        style={{ width: `calc(${width} - 2rem)`, height }} // Apply width and height dynamically
        className="relative rounded-lg shadow-lg p-6 bg-white "
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center pb-2 border-b-2 border-gray-200">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>

        {/* Modal Body */}
        <div
          className="mb-4 overflow-auto"
          style={{ height: `calc(${height} - 8rem)` }} // Adjust height dynamically
        >
          {children}
        </div>

        {/* Modal Footer */}

        <div
          className={` ${
            isCloseButton ? "justify-between space-x-3 " : "justify-end"
          } mt-6 flex`}
        >
          {isCloseButton && (
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className=" rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            Create Template
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
