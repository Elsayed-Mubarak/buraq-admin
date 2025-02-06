
export type TableData = {
  Month?: string;
  Plans?: string;
  Accounts?: number;
  Chats?: number;
  Requests?: number;
  Contacts?: number;
  Campaigns?: number;
};

//export interface TotalAccountsData {
//  Plans: string;
//  Accounts: number;
//}

//export interface MonthlyAccountsData {
//  Month: string;
//  Accounts: number;
//}

//export interface ConversationsData {
//  Month: string;
//  Chats: number;
//}

//export interface AIModalsData {
//  Month: string;
//  Requests: number;
//}

//export interface ContactsData {
//  Month: string;
//  Contacts: number;
//}

//export interface OutboundSendsData {
//  Month: string;
//  Campaigns: number;
//}
//export interface TableProps {
//  title: string;
//  data: TableData[] | null | undefined; // Allow for null/undefined data
//  dataKey1: string;
//  dataKey2: string;
//  description: string;
//  header1: string;
//  header2: string;
//  showChannel?: boolean;
//}