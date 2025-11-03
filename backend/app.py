from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Dict, List, Literal
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

Priority = Literal["VIP", "Regular", "Online"]
OrderStatus = Literal["In Progress", "Completed"]


class MenuItem(BaseModel):
    id: int
    name: str
    prepTime: int
    category: Literal["Coffee", "Food", "Dessert"]
    imageUrl: str


class Waiter(BaseModel):
    name: str
    occupiedTime: float
    currentOrders: int
    totalOrders: int


class Order(BaseModel):
    id: str
    itemId: int
    itemName: str
    priority: Priority
    waiterName: str
    prepTime: int
    status: OrderStatus
    timestamp: datetime
    estimatedCompletion: datetime

    class Config:
        json_encoders = {
            datetime: lambda value: value.astimezone(timezone.utc).isoformat(),
        }


class CreateOrderRequest(BaseModel):
    itemId: int
    priority: Priority


class CreateOrderResponse(BaseModel):
    order: Order
    waiters: List[Waiter]


app = FastAPI(title="BrewBytes Cafe API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MENU_ITEMS: List[Dict[str, object]] = [
    {
        "id": 1,
        "name": "Espresso",
        "prepTime": 4,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1606310553997-7a01e22900ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZSUyMGN1cHxlbnwxfHx8fDE3NjIxMjczOTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 2,
        "name": "Latte",
        "prepTime": 6,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1680489809506-d8def0e1631f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGNvZmZlZSUyMGFydHxlbnwxfHx8fDE3NjIxMzg2MTV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 3,
        "name": "Cappuccino",
        "prepTime": 7,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1708430651927-20e2e1f1e8f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXBwdWNjaW5vJTIwY29mZmVlfGVufDF8fHx8MTc2MjEzMzE3Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 4,
        "name": "Americano",
        "prepTime": 5,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1669872484166-e11b9638b50e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWVyaWNhbm8lMjBjb2ZmZWV8ZW58MXx8fHwxNzYyMTI1NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 5,
        "name": "Mocha",
        "prepTime": 8,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1618576230663-9714aecfb99a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2NoYSUyMGNvZmZlZXxlbnwxfHx8fDE3NjIxODI0MzF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 6,
        "name": "Macchiato",
        "prepTime": 5,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1604298458655-ae6e04213678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWNjaGlhdG8lMjBjb2ZmZWV8ZW58MXx8fHwxNzYyMTMzMTc0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 7,
        "name": "Iced Coffee",
        "prepTime": 6,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1684439670717-b1147a7e7534?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2VkJTIwY29mZmVlJTIwZHJpbmt8ZW58MXx8fHwxNzYyMTAzOTM2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 8,
        "name": "Cold Brew",
        "prepTime": 9,
        "category": "Coffee",
        "imageUrl": "https://images.unsplash.com/photo-1561641377-f7456d23aa9b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwYnJldyUyMGNvZmZlZXxlbnwxfHx8fDE3NjIxNTIzMTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 9,
        "name": "Sandwich",
        "prepTime": 10,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1673534409216-91c3175b9b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZvb2R8ZW58MXx8fHwxNzYyMTcxNjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 10,
        "name": "Burger",
        "prepTime": 12,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1688246780164-00c01647e78c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmb29kfGVufDF8fHx8MTc2MjA3MTMzNnww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 11,
        "name": "Pizza Slice",
        "prepTime": 11,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1544982503-9f984c14501a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMHNsaWNlfGVufDF8fHx8MTc2MjA5MTQwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 12,
        "name": "Pasta",
        "prepTime": 13,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2h8ZW58MXx8fHwxNzYyMTA5NjIzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 13,
        "name": "Salad",
        "prepTime": 7,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1677653805080-59c57727c84e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkfGVufDF8fHx8MTc2MjE1MDA0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 14,
        "name": "Fries",
        "prepTime": 6,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1630431341973-02e1b662ec35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBmcmllc3xlbnwxfHx8fDE3NjIxMDQxMjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 15,
        "name": "Taco",
        "prepTime": 9,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1529704640551-eef9ba5d774a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWNvJTIwZm9vZHxlbnwxfHx8fDE3NjIxODY4Njd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 16,
        "name": "Wrap",
        "prepTime": 8,
        "category": "Food",
        "imageUrl": "https://images.unsplash.com/photo-1705131187470-9458824c0d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3cmFwJTIwc2FuZHdpY2h8ZW58MXx8fHwxNzYyMTgyNDM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 17,
        "name": "Cake Slice",
        "prepTime": 5,
        "category": "Dessert",
        "imageUrl": "https://images.unsplash.com/photo-1650147880857-95b822f65ff9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWtlJTIwc2xpY2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjExMDU1OXww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 18,
        "name": "Cookie",
        "prepTime": 3,
        "category": "Dessert",
        "imageUrl": "https://images.unsplash.com/photo-1642774692082-b876a1f3bda9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWUlMjBkZXNzZXJ0fGVufDF8fHx8MTc2MjEwMTgxN3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 19,
        "name": "Muffin",
        "prepTime": 4,
        "category": "Dessert",
        "imageUrl": "https://images.unsplash.com/photo-1612973835597-99b4e2558b07?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdWZmaW4lMjBwYXN0cnl8ZW58MXx8fHwxNzYyMTg2ODY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    },
    {
        "id": 20,
        "name": "Smoothie",
        "prepTime": 7,
        "category": "Dessert",
        "imageUrl": "https://images.unsplash.com/photo-1655992590262-aeadeef445b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbW9vdGhpZSUyMGRyaW5rfGVufDF8fHx8MTc2MjE3NzM1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    },
]

WAITERS: List[Dict[str, object]] = [
    {"name": "Amit", "occupiedTime": 0.0, "currentOrders": 0, "totalOrders": 0},
    {"name": "Riya", "occupiedTime": 0.0, "currentOrders": 0, "totalOrders": 0},
    {"name": "Karan", "occupiedTime": 0.0, "currentOrders": 0, "totalOrders": 0},
    {"name": "Priya", "occupiedTime": 0.0, "currentOrders": 0, "totalOrders": 0},
    {"name": "Sam", "occupiedTime": 0.0, "currentOrders": 0, "totalOrders": 0},
]

ORDERS: List[Dict[str, object]] = []

PRIORITY_RANK: Dict[Priority, int] = {"VIP": 0, "Regular": 1, "Online": 2}


def serialize_order(order_data: Dict[str, object]) -> Order:
    return Order(
        id=order_data["id"],
        itemId=order_data["itemId"],
        itemName=order_data["itemName"],
        priority=order_data["priority"],
        waiterName=order_data["waiterName"],
        prepTime=order_data["prepTime"],
        status=order_data["status"],
        timestamp=order_data["timestamp"],
        estimatedCompletion=order_data["estimatedCompletion"],
    )


def serialize_waiter(waiter_data: Dict[str, object]) -> Waiter:
    return Waiter(
        name=waiter_data["name"],
        occupiedTime=float(waiter_data["occupiedTime"]),
        currentOrders=int(waiter_data["currentOrders"]),
        totalOrders=int(waiter_data["totalOrders"]),
    )


def sync_state() -> None:
    now = datetime.now(timezone.utc)

    for order in ORDERS:
        if order["status"] == "In Progress" and now >= order["estimatedCompletion"]:
            order["status"] = "Completed"

    for waiter in WAITERS:
        waiter_name = waiter["name"]
        assigned_orders = [order for order in ORDERS if order["waiterName"] == waiter_name]
        active_orders = [order for order in assigned_orders if order["status"] == "In Progress"]

        waiter["totalOrders"] = len(assigned_orders)
        waiter["currentOrders"] = len(active_orders)

        remaining_minutes = sum(
            max(
                order["prepTime"] - (now - order["timestamp"]).total_seconds() / 60,
                0.0,
            )
            for order in active_orders
        )

        waiter["occupiedTime"] = round(remaining_minutes, 2)


def sorted_orders() -> List[Dict[str, object]]:
    return sorted(
        ORDERS,
        key=lambda order: (
            PRIORITY_RANK[order["priority"]],
            order["timestamp"],
        ),
    )


def select_waiter() -> Dict[str, object]:
    sync_state()
    return min(
        WAITERS,
        key=lambda waiter: (
            float(waiter["occupiedTime"]),
            int(waiter["currentOrders"]),
            waiter["name"],
        ),
    )


@app.get("/health")
def health_check() -> Dict[str, str]:
    return {"status": "ok"}


@app.get("/menu", response_model=List[MenuItem])
def get_menu() -> List[MenuItem]:
    return [MenuItem(**item) for item in MENU_ITEMS]


@app.get("/orders", response_model=List[Order])
def get_orders() -> List[Order]:
    sync_state()
    return [serialize_order(order) for order in sorted_orders()]


@app.get("/waiters", response_model=List[Waiter])
def get_waiters() -> List[Waiter]:
    sync_state()
    return [serialize_waiter(waiter) for waiter in WAITERS]


@app.post("/orders", response_model=CreateOrderResponse, status_code=201)
def create_order(payload: CreateOrderRequest) -> CreateOrderResponse:
    sync_state()

    menu_lookup = {item["id"]: item for item in MENU_ITEMS}
    menu_item = menu_lookup.get(payload.itemId)
    if menu_item is None:
        raise HTTPException(status_code=404, detail="Menu item not found")

    assigned_waiter = select_waiter()

    now = datetime.now(timezone.utc)
    order_id = f"ORD-{uuid4().hex[:8].upper()}"
    estimated_completion = now + timedelta(minutes=int(menu_item["prepTime"]))

    new_order = {
        "id": order_id,
        "itemId": menu_item["id"],
        "itemName": menu_item["name"],
        "priority": payload.priority,
        "waiterName": assigned_waiter["name"],
        "prepTime": int(menu_item["prepTime"]),
        "status": "In Progress",
        "timestamp": now,
        "estimatedCompletion": estimated_completion,
    }

    ORDERS.append(new_order)
    sync_state()

    return CreateOrderResponse(
        order=serialize_order(new_order),
        waiters=[serialize_waiter(waiter) for waiter in WAITERS],
    )
