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

export interface Column {
  key: keyof FormData | string;
  header: string;
  render?: (item: FormData) => React.ReactNode; 
}
