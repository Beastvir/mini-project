export type Priority = "VIP" | "Regular" | "Online";
export type OrderStatus = "In Progress" | "Completed";

export interface MenuItem {
  id: number;
  name: string;
  prepTime: number;
  category: "Coffee" | "Food" | "Dessert";
  imageUrl: string;
}

export interface Order {
  id: string;
  itemId: number;
  itemName: string;
  priority: Priority;
  waiterName: string;
  prepTime: number;
  status: OrderStatus;
  timestamp: string;
  estimatedCompletion: string;
}

export interface Waiter {
  name: string;
  occupiedTime: number;
  currentOrders: number;
  totalOrders: number;
}

export interface CreateOrderPayload {
  itemId: number;
  priority: Priority;
}

export interface CreateOrderResult {
  order: Order;
  waiters: Waiter[];
}
