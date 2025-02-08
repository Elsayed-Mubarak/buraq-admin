// types/Types.ts
export interface Plan {
    name?: string;
    bots?: number;
    conversations?: number;
    users?: number;
    // Add other properties as needed, based on your actual data structure.
  }

  export interface PlanDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    plan?: Plan | null; // Make plan optional and allow null
    //onSave: (plan: PlanState) => void; // Keep onSave if needed
  }

  // You might not need these anymore, or you might need to adjust them
  // export interface PlanState {
  //   // Define your plan state properties here
  // }

  // export const initialNewPlanState: PlanState = {
  //   // Initialize your plan state properties here
  // };