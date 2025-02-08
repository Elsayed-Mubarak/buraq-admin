import Modal from "@/components/common/Modal";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryDropdown from "./CategoryDropdown";
import Image from "next/image";
import { FormData } from "./templateTypes/TemplateTypes";


interface TemplateCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Omit<FormData, "id">;
  setFormData: React.Dispatch<React.SetStateAction<Omit<FormData, "id">>>;
  //setFormData: (data: FormData) => void;
  handleSubmit: (e: React.FormEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TemplateCreateModal: React.FC<TemplateCreateModalProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  handleSubmit,
  fileInputRef,
  categories,
  setCategories,
  handleImageChange,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Template"
      buttonTitle="Create Template"
      onClick={handleSubmit}
      isCloseButton={true}
    >
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Image Upload */}
          <div className="mb-4">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {formData.imageUrl ? (
                  <Image
                    src={formData.imageUrl}
                    width={24 }
                    height={24}
                    alt="Preview"
                    className="mx-auto h-24 w-24 object-cover rounded-full"
                    loading="lazy"
                  />
                ) : (
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                )}

                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      ref={fileInputRef}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 5MB
                </p>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>

          {/* Bot Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Bot Name
            </label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.botName}
              onChange={(e) =>
                setFormData({ ...formData, botName: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <CategoryDropdown
            formData={{ ...formData, id: "temp-id" }} // defult id should remove but i will think in next phase
            setFormData={setFormData}
            categories={categories}
            setCategories={setCategories}
          />

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TemplateCreateModal;
