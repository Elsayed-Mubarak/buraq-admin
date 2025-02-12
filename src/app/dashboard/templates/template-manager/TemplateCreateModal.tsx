import Modal from "@/components/common/Modal";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryDropdown from "./CategoryDropdown";
import Image from "next/image";
import { TemplateCreateModalProps } from "@/app/types/templateManager-types/TemplateManagerTypes";
import { FormData } from "@/app/types/TemplateTypes";

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
  // Create a temporary full FormData object for CategoryDropdown
  const tempFormData: FormData = {
    id: 'temp-id',
    title: String(formData.title || ''),
    botName: String(formData.botName || ''),
    category: String(formData.category || ''),
    description: String(formData.description || ''),
    image: null,
    imageUrl: formData.imageUrl ? String(formData.imageUrl) : null
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Omit<FormData, 'id' | 'image' | 'imageUrl'>
  ) => {
    setFormData({
      ...formData,
      [field]: e.target.value
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Template"
      buttonTitle="Create Template"
      onClick={handleSubmit}
      isCloseButton={true}
    >
      {/*Need to remove image come from backend*/}
      <div className="p-6">
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Image Upload */}
          <div className="mb-4">
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                {formData.imageUrl && typeof formData.imageUrl === 'string' ? (
                  <Image
                    src={formData.imageUrl}
                    width={24}
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
              value={String(formData.title || '')}
              onChange={(e) => handleInputChange(e, 'title')}
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
              value={String(formData.botName || '')}
              onChange={(e) => handleInputChange(e, 'botName')}
            />
          </div>

          {/* Category */}
          <CategoryDropdown
            formData={tempFormData}
            setFormData={(data: FormData) => {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { id, ...rest } = data;
              setFormData(rest);
            }}
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
              value={String(formData.description || '')}
              onChange={(e) => handleInputChange(e, 'description')}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default TemplateCreateModal;
