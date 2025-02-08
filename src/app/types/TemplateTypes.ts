export interface FormData {
  id: string ;
  title: string;
  botName: string;
  category: string;
  description: string;
  image?: File | null;
  imageUrl?: string | null;
}

export interface TemplateData extends FormData {
  action: "create" | "edit" | "delete";
}

// Define the Column type *specifically for FormData* within this component:
export interface Column {
  key: keyof FormData | string; // Allow keys of FormData OR a custom string (like "actions")
  header: string;
  render?: (item: FormData) => React.ReactNode; // Optional render function
}
