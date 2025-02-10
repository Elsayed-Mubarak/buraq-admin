export interface InputFieldProps {
  label: string;
  id: string;
  placeholder: string;
}


export interface CreatePlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePlan: (newPlan: PlanState) => void;
}

export interface PlanDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
  onSave?: (updatedPlan: PlanState) => void;
}

export interface Plan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  status: "Active" | "Inactive";
  users?: number | string;
  bots?: number | string; // might be the error
  conversations?: number;
  features?: string[];
}

// not types just inital data should remove in integraion
export const initialNewPlanState: PlanState = {
  name: "",
  users: "",
  bots: "",
  monthlyPrice: "",
  status: "",
  yearlyPrice: "",
  planName: "",
  botLimitChecked: false,
  botLimit: "",
  conversationsChecked: false,
  conversations: 0,
  extraChatChecked: false,
  usersChecked: false,
  maxUsers: "",
  toSendPrice: 0,
  toReceivePrice: 0,
  airtable: false,
  calendly: false,
  googleDialogflow: false,
  dynamicData: false,
  freshdesk: false,
  googleAnalytics: false,
  googleCalendar: false,
  googleSheets: false,
  hubSpot: false,
  humanHandover: false,
  slack: false,
  httpRequest: false,
  webhook: false,
  whatsappCatalog: false,
  zapier: false,
  zohoCRM: false,
  codeblock: false,
  customCSS: false,
  fireJavascripts: false,
  removeBranding: false,
  retainButtonList: false,
  anonymizeFacebookVisitor: false,
  auditLogs: false,
  dataInjection: false,
  disableDomainRestriction: false,
  enrichIPInformation: false,
  events: false,
  maxOutboundMessages: 0,
  maxOutboundContacts: 0,
  customIntegrationOutbound: false,
  emailChannel: false,
  facebookChannel: false,
  instagramChannel: false,
  smsChannel: false,
  webChannel: false,
  whatsAppChannel: false,
  customAnswerAI: false,
  functionCallAI: false,
  generateAnswerAI: false,
  rewriteAnswerAI: false,
  aiModel: "",
  aiStudioKnowledgeBases: 0,
  aiModels: "",
  dataSources: 0,
  reTrainAIModel: false,
  sourceCitation: false,
  features: [],
};

export interface PlanState {
  name: string;
  users: number | string;
  bots: number | string;
  monthlyPrice: string;
  status: string;
  yearlyPrice: string;
  planName: string;
  botLimitChecked: boolean;
  botLimit: string;
  conversationsChecked: boolean;
  conversations: number;
  extraChatChecked: boolean;
  usersChecked: boolean;
  maxUsers: string;
  toSendPrice: number;
  toReceivePrice: number;
  airtable: boolean;
  calendly: boolean;
  googleDialogflow: boolean;
  dynamicData: boolean;
  freshdesk: boolean;
  googleAnalytics: boolean;
  googleCalendar: boolean;
  googleSheets: boolean;
  hubSpot: boolean;
  humanHandover: boolean;
  slack: boolean;
  httpRequest: boolean;
  webhook: boolean;
  whatsappCatalog: boolean;
  zapier: boolean;
  zohoCRM: boolean;
  codeblock: boolean;
  customCSS: boolean;
  fireJavascripts: boolean;
  removeBranding: boolean;
  retainButtonList: boolean;
  anonymizeFacebookVisitor: boolean;
  auditLogs: boolean;
  dataInjection: boolean;
  disableDomainRestriction: boolean;
  enrichIPInformation: boolean;
  events: boolean;
  maxOutboundMessages: number;
  maxOutboundContacts: number;
  customIntegrationOutbound: boolean;
  emailChannel: boolean;
  facebookChannel: boolean;
  instagramChannel: boolean;
  smsChannel: boolean;
  webChannel: boolean;
  whatsAppChannel: boolean;
  customAnswerAI: boolean;
  functionCallAI: boolean;
  generateAnswerAI: boolean;
  rewriteAnswerAI: boolean;
  aiModel: string;
  aiStudioKnowledgeBases: number;
  aiModels: string;
  dataSources: number;
  reTrainAIModel: boolean;
  sourceCitation: boolean;
  features: string[];
}