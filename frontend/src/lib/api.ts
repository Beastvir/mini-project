import type { CreateOrderPayload, CreateOrderResult, MenuItem, Order, Waiter } from "../types/cafe";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

async function request<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Request failed with status ${response.status}`);
  }

  return (await response.json()) as T;
}

export const api = {
  getMenu: (): Promise<MenuItem[]> => request<MenuItem[]>("/menu"),
  getOrders: (): Promise<Order[]> => request<Order[]>("/orders"),
  getWaiters: (): Promise<Waiter[]> => request<Waiter[]>("/waiters"),
  createOrder: (payload: CreateOrderPayload): Promise<CreateOrderResult> =>
    request<CreateOrderResult>("/orders", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
