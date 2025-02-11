export interface Plan {
  id: string;
  name: string;
  description?: string;
  price: number;
  features?: string[];
  usage?: {
    messages?: number;
    contacts?: number;
    storage?: number;
  };
}
