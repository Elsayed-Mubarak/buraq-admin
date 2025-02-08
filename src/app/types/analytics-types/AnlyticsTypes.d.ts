
export type TableData = {
  [key: string]: string | number | undefined; 
  Month?: string;
  Plans?: string;
  Accounts?: number;
  Chats?: number;
  Requests?: number;
  Contacts?: number;
  Campaigns?: number;
};

export interface TableProps {
  title: string;
  data: TableData[];
  dataKey1: keyof TableData; // Use keyof for type safety
  dataKey2: keyof TableData; // Use keyof for type safety
  description: string;
  header1: string;
  header2: string;
}

export interface TotalAccountsData {
  Plans: string;
  Accounts: number;
}

export interface MonthlyAccountsData {
  Month: string;
  Accounts: number;
}

export interface ConversationsData {
  Month: string;
  Chats: number;
}

export interface AIModalsData {
  Month: string;
  Requests: number;
}

export interface ContactsData {
  Month: string;
  Contacts: number;
}

export interface OutboundSendsData {
  Month: string;
  Campaigns: number;
}
