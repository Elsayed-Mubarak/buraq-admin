// AdminPortalData.ts

interface AdminPortalData {
  accountID: number;
  accountName: string;
  owner: string;
  status: string;
  createdUTC: string;
  email?: string; // Optional email
  phone?: string; // Optional phone number
  websiteUrl?: string; // Optional website URL
  codeSnippet?: string; // Optional code snippet
}

const adminPortalData: AdminPortalData[] = [
  {
    accountID: 331,
    accountName: "Sile",
    owner: "LAMA Abdullah",
    status: "Active",
    createdUTC: "28-Jan-25 02:30 PM",
    email: "lama.abdullah@example.com", // Added email
    phone: "+966593637494", // Added phone number
    websiteUrl: "https://example.com/sile", // Added website URL
    codeSnippet: '<script src="https://example.com/widget.js" defer></script>', // Added code snippet
  },
  {
    accountID: 330,
    accountName: "جدة",
    owner: "مجمع محمد الجدعاني - حي الأجاويد",
    status: "Active",
    createdUTC: "28-Jan-25 11:24 AM",
    email: "jeddah@example.com", // Added email
  },
  {
    accountID: 329,
    accountName: "Mawidy",
    owner: "Naif Alharthi",
    status: "Active",
    createdUTC: "28-Jan-25 10:56 AM",
    email: "naif@example.com", // Added email
  },
  {
    accountID: 328,
    accountName: "weerfy",
    owner: "صالح عادل",
    status: "Active",
    createdUTC: "28-Jan-25 02:48 AM",
    email: "saleh@example.com", // Added email
  },
  {
    accountID: 327,
    accountName: "مؤسسة خالد مفلح الرشيدي التمويل",
    owner: "خالد الرشيدي",
    status: "Active",
    createdUTC: "28-Jan-25 12:56 AM",
    email: "khaled@example.com", // Added email
  },
  {
    accountID: 325,
    accountName: "مدرسة",
    owner: "حطموك يا قلبي",
    status: "Active",
    createdUTC: "27-Jan-25 05:03 AM",
    email: "madrasa@example.com", // Added email
  },
  {
    accountID: 324,
    accountName: "wjaaar.sales@gmail.com",
    owner: "Al-Drees Branch",
    status: "Active",
    createdUTC: "26-Jan-25 05:48 AM",
    email: "sales@example.com", // Added email
  },
  {
    accountID: 323,
    accountName: "tweenz.spa@gmail.com",
    owner: "نواف تمبكتي",
    status: "Active",
    createdUTC: "25-Jan-25 06:56 PM",
    email: "nawaf@example.com", // Added email
  },
  {
    accountID: 322,
    accountName: "Bedon",
    owner: "Rakan Alshammri",
    status: "Active",
    createdUTC: "24-Jan-25 10:36 PM",
    email: "rakan@example.com", // Added email
  },
  {
    accountID: 321,
    accountName: "Mongz",
    owner: "Mohamed Ahmed",
    status: "Active",
    createdUTC: "23-Jan-25 10:25 AM",
    email: "mohamed@example.com", // Added email
  },
  {
    accountID: 320,
    accountName: "Hero",
    owner: "Hero Company",
    status: "Active",
    createdUTC: "23-Jan-25 08:37 AM",
    email: "hero@example.com", // Added email
  },
  {
    accountID: 319,
    accountName: "مكتب الخدمات التجارية",
    owner: "رمزي المالكي",
    status: "Active",
    createdUTC: "23-Jan-25 03:02 AM",
    email: "ramzi@example.com", // Added email
  },
  {
    accountID: 318,
    accountName: "Mate",
    owner: "باسم عبده نعمان محمد",
    status: "Active",
    createdUTC: "22-Jan-25 10:42 PM",
    email: "basim@example.com", // Added email
  },
  {
    accountID: 317,
    accountName: "steps daycare",
    owner: "ahad hs",
    status: "Active",
    createdUTC: "22-Jan-25 09:09 AM",
    email: "ahad@example.com", // Added email
  },
  {
    accountID: 316,
    accountName: "تراحم الرياض",
    owner: "تراحم الرياض",
    status: "un Active",
    createdUTC: "22-Jan-25 08:30 AM",
    email: "trahm@example.com", // Added email
  },
  {
    accountID: 315,
    accountName: "IBN SINA COLLEGE HOSPITAL",
    owner: "IBN SINA COLLEGE HOSPITAL",
    status: "Active",
    createdUTC: "22-Jan-25 08:24 AM",
    email: "sina@example.com", // Added email
  },
  {
    accountID: 314,
    accountName: "مؤسسة العربة الملونة للتجارة",
    owner: "صدام القاضي",
    status: "Active",
    createdUTC: "22-Jan-25 12:50 AM",
    email: "sadam@example.com", // Added email
  },
  {
    accountID: 313,
    accountName: "خاص",
    owner: "إبراهيم الهازمي",
    status: "Active",
    createdUTC: "21-Jan-25 07:31 PM",
    email: "ibrahim@example.com", // Added email
  },
];

export default adminPortalData;
export type { AdminPortalData };
