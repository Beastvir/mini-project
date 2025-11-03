export type Priority = 'VIP' | 'Regular' | 'Online';

export interface MenuItem {
  id: number;
  name: string;
  prepTime: number;
  category: 'Coffee' | 'Food' | 'Dessert';
  imageUrl: string;
}

export interface Order {
  id: string;
  itemId: number;
  itemName: string;
  priority: Priority;
  waiterName: string;
  prepTime: number;
  status: 'In Progress' | 'Completed';
  timestamp: Date;
  estimatedCompletion: Date;
}

export interface Waiter {
  name: string;
  occupiedTime: number;
  currentOrders: number;
  totalOrders: number;
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 1, name: 'Espresso', prepTime: 4, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIxMjczOTh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 2, name: 'Latte', prepTime: 6, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1680489809506-d8def0e1631f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGNvZmZlZSUyMGFydHxlbnwxfHx8fDE3NjIxMzg2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 3, name: 'Cappuccino', prepTime: 7, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2MjEzMzE3Mnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 4, name: 'Americano', prepTime: 5, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1669872484166-e11b9638b50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbm8lMjBjb2ZmZWV8ZW58MXx8fHwxNzYyMTI1NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 5, name: 'Mocha', prepTime: 8, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1618576230663-9714aecfb99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2NoYSUyMGNvZmZlZXxlbnwxfHx8fDE3NjIxODI0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 6, name: 'Macchiato', prepTime: 5, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1604298458655-ae6e04213678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNjaGlhdG8lMjBjb2ZmZWV8ZW58MXx8fHwxNzYyMTMzMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 7, name: 'Iced Coffee', prepTime: 6, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzYyMTAzOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 8, name: 'Cold Brew', prepTime: 9, category: 'Coffee', imageUrl: 'https://images.unsplash.com/photo-1561641377-f7456d23aa9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwYnJldyUyMGNvZmZlZXxlbnwxfHx8fDE3NjIxNTIzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 9, name: 'Sandwich', prepTime: 10, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1673534409216-91c3175b9b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYyMTcxNjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 10, name: 'Burger', prepTime: 12, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MjA3MTMzNnww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 11, name: 'Pizza Slice', prepTime: 11, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc2MjA5MTQwM3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 12, name: 'Pasta', prepTime: 13, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYyMTA5NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 13, name: 'Salad', prepTime: 7, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkfGVufDF8fHx8MTc2MjE1MDA0M3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 14, name: 'Fries', prepTime: 6, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjIxMDQxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 15, name: 'Taco', prepTime: 9, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1529704640551-eef9ba5d774a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwZm9vZHxlbnwxfHx8fDE3NjIxODY4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 16, name: 'Wrap', prepTime: 8, category: 'Food', imageUrl: 'https://images.unsplash.com/photo-1705131187470-9458824c0d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cmFwJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzYyMTgyNDM4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 17, name: 'Cake Slice', prepTime: 5, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1650147880857-95b822f65ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwc2xpY2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjExMDU1OXww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 18, name: 'Cookie', prepTime: 3, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1642774692082-b876a1f3bda9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWUlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjEwMTgxN3ww&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 19, name: 'Muffin', prepTime: 4, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1612973835597-99b4e2558b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWZmaW4lMjBwYXN0cnl8ZW58MXx8fHwxNzYyMTg2ODY4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
  { id: 20, name: 'Smoothie', prepTime: 7, category: 'Dessert', imageUrl: 'https://images.unsplash.com/photo-1655992590262-aeadeef445b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGRyaW5rfGVufDF8fHx8MTc2MjE3NzM1N3ww&ixlib=rb-4.1.0&q=80&w=1080' },
];

export const WAITER_NAMES = ['Amit', 'Riya', 'Karan', 'Priya', 'Sam'];
