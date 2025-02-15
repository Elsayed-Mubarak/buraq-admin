import { Plan } from "@/app/types/plans-types/PlansTypes";

// Dummy Data 
export const plans:Plan[] = [
  {
    name: "Free",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    status: "Inactive",
    users: 1,
    bots: 10,
    conversations: 1000,
    features: ["Basic features"],
  },
  {
    name: "Free-Trial",
    monthlyPrice: "$0",
    yearlyPrice: "$0",
    status: "Active",
    users: 5,
    bots: 50,
    conversations: 5000,
    features: ["Basic features", "Trial of premium features"],
  },
  {
    name: "Pro",
    monthlyPrice: "$49",
    yearlyPrice: "$490",
    status: "Active",
    users: 10,
    bots: 100,
    conversations: 10000,
    features: ["Premium features", "Priority support"],
  },
  {
    name: "Growth",
    monthlyPrice: "$99",
    yearlyPrice: "$990",
    status: "Active",
    users: 20,
    bots: 200,
    conversations: 20000,
    features: [
      "Premium features",
      "Priority support",
      "Dedicated account manager",
    ],
  },
  {
    name: "Leadership",
    monthlyPrice: "$199",
    yearlyPrice: "$1990",
    status: "Active",
    users: 50,
    bots: 500,
    conversations: 50000,
    features: [
      "Premium features",
      "Priority support",
      "Dedicated account manager",
      "Custom integrations",
    ],
  },
  {
    name: "Custom",
    monthlyPrice: "Contact Us",
    yearlyPrice: "Contact Us",
    status: "Active",
    users: "Unlimited",
    bots: "Unlimited",
    conversations: 0,
    features: ["All features", "Custom solutions"],
  },
];
