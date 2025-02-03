export interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  status: string;
  users: number | string;
  bots: number | string;
  conversations: number | string;
  features: string[];
}

export interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

export interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
}
