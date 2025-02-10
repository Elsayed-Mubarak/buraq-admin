export interface Ticket {
  id: string;
  title: string;
  reporter: string;
  status: "Open" | "Closed" | "In Progress";
  createdAt: string;
}