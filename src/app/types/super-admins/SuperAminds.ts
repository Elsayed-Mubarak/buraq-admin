export interface AddSuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAdmin: (email: string) => void;
}
