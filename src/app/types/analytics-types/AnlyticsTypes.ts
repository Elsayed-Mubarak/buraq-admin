// AnalyticsTypes.ts
// Types for the API response

export interface Plan {
  _id: string;
  planName: string;
}

export interface AccountCountPerPlan {
  plan: Plan;
  accountCount: number;
}

export interface AccountCountPerMonth {
  [key: string]: number; // Dynamic keys for months, e.g., "Oct-2024": 0
}

export interface ConversationInformation {
  [key: string]: number; // Dynamic keys for months, e.g., "Oct-2024": 0
}

export interface ClientCountPerMonth {
  [key: string]: number; // Dynamic keys for months, e.g., "Oct-2024": 0
}

export interface AnalyticsData {
  numberOfAccountsPerPlan: AccountCountPerPlan[];
  numberOfAccountsPerMonth: AccountCountPerMonth;
  conversationsInformation: ConversationInformation;
  numberOfClientsPerMonth: ClientCountPerMonth;
  totalAccountsNumber: number;
  totalConversationsNumber: number;
  totalClientsNumber: number;
}

export interface ApiResponse {
  data: AnalyticsData;
}

// Types for table data
export interface TableData {
  [key: string]: string | number; // Dynamic keys for table rows
}

export interface TableProps {
  title: string;
  data: TableData[];
  dataKey1: string;
  dataKey2: string;
  description: string;
  header1: string;
  header2: string;
}
