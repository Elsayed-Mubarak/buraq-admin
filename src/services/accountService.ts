//import axios from 'axios';

//const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
////const API_URL = process.env.NEXT_PUBLIC_API_URL || "../components/DummyData/dummyUsers.ts";

//const axiosInstance = axios.create({
//  baseURL: API_URL,
//  withCredentials: true,
//  headers: {
//    'Content-Type': 'application/json',
//    'Accept': 'application/json'
//  }
//});

//// Add response interceptor for error handling
//axiosInstance.interceptors.response.use(
//  (response) => response,
//  (error) => {
//    console.error('API Error:', error.response?.data || error.message);
//    throw error;
//  }
//);

//export interface Account {
//  _id: string;
//  settings: {
//    name: string;
//    _id: string;
//  };
//  owner: {
//    name: string;
//    _id: string;
//  };
//  status: 'active' | 'inactive' | 'suspended';
//  createdAt: string;
//  teams: any[];
//  contacts: any[];
//  chatbots: any[];
//  whatsAppConfig: any[];
//}

//export const accountService = {
//  async getAccounts(): Promise<Account[]> {
//    try {
//      console.log('Fetching accounts from:', `${API_URL}/accounts`);
//      const response = await axiosInstance.get('/accounts');
//      console.log('Accounts response:', response.data);
//      return response.data.data;
//    } catch (error) {
//      console.error('Error fetching accounts:', error);
//      if (axios.isAxiosError(error)) {
//        console.error('Response data:', error.response?.data);
//        console.error('Response status:', error.response?.status);
//      }
//      throw error;
//    }
//  },

//  async createAccount(accountData: Partial<Account>): Promise<Account> {
//    try {
//      const response = await axiosInstance.post('/accounts', accountData);
//      return response.data.data;
//    } catch (error) {
//      console.error('Error creating account:', error);
//      if (axios.isAxiosError(error)) {
//        console.error('Response data:', error.response?.data);
//      }
//      throw error;
//    }
//  },

//  async getAccountById(id: string): Promise<Account> {
//    try {
//      const response = await axiosInstance.get(`/accounts/${id}`);
//      return response.data.data;
//    } catch (error) {
//      console.error('Error fetching account:', error);
//      if (axios.isAxiosError(error)) {
//        console.error('Response data:', error.response?.data);
//      }
//      throw error;
//    }
//  },

//  async updateAccount(id: string, accountData: Partial<Account>): Promise<Account> {
//    try {
//      const response = await axiosInstance.put(`/accounts/${id}`, accountData);
//      return response.data.data;
//    } catch (error) {
//      console.error('Error updating account:', error);
//      if (axios.isAxiosError(error)) {
//        console.error('Response data:', error.response?.data);
//      }
//      throw error;
//    }
//  },

//  async deleteAccount(id: string): Promise<void> {
//    try {
//      await axiosInstance.delete(`/accounts/${id}`);
//    } catch (error) {
//      console.error('Error deleting account:', error);
//      if (axios.isAxiosError(error)) {
//        console.error('Response data:', error.response?.data);
//      }
//      throw error;
//    }
//  }
//};

///////////////////////////////////////////////////////////////////

// accountService.ts

//export interface Account {
//  _id: string;
// settings: {
//  name: string;
//  _id: string;
//  };
//  owner: {
//  name: string;
//  _id: string;
//  };
//  status: 'active' | 'inactive' | 'suspended';
//  createdAt: string;
//  teams: any[];
//  contacts: any[];
//  chatbots: any[];
//  whatsAppConfig: any[];
//}

// Export dummy functions that do nothing
export const accountService = {
    async getAccounts(): Promise<any[]> {
        return Promise.resolve([]); 
    },

    async createAccount(accountData: any): Promise<any> {
        return Promise.resolve({}); 
    },

    async getAccountById(id: string): Promise<any> {
        return Promise.resolve({}); 
    },

    async updateAccount(id: string, accountData: any): Promise<any> {
        return Promise.resolve({}); 
    },

    async deleteAccount(id: string): Promise<void> {
        return Promise.resolve();
    }
};