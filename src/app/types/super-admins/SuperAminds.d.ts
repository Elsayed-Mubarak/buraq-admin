export interface AddSuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAdmin: (email: string, name: string) => void;
}
