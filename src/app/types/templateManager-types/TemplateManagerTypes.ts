import { FormData } from "../TemplateTypes";
import { Column } from "../TemplateTypes";

export interface CategoryDropdownProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}
export interface TemplateCountProps {
  count: number;
}
export interface TemplateCreateModalProps {
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
export interface TemplateEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Omit<FormData, "id">; // we need to solve this
  setFormData: React.Dispatch<React.SetStateAction<Omit<FormData, "id">>>;
  handleSubmit: (e: React.FormEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export interface TemplateManagerHeaderProps {
  activeTab: string;
  onCreateTemplate: () => void;
}
export interface TemplateManagerLayoutProps {
  activeTab: string;
}
export interface TemplateSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
export interface TemplateTableProps {
  columns: Column[];
  data: FormData[];
}
export interface TemplateManagerLayoutProps {
  activeTab: string;
}