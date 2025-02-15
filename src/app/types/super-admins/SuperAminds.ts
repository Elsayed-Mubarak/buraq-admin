export interface AddSuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAdmin: (email: string) => void;
}

// Define types
export type SuperAdmin = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export type SuperAdminsResponse = {
  data: SuperAdmin[];
  metadata: {
    totalResult: number;
    totalPages: number;
  };
};
