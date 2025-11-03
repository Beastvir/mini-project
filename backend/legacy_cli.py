import random
import time

# ======= MENU SETUP ======= #
menu = {
    1: ("Espresso", 4),
    2: ("Latte", 6),
    3: ("Cappuccino", 7),
    4: ("Americano", 5),
    5: ("Mocha", 8),
    6: ("Macchiato", 5),
    7: ("Iced Coffee", 6),
    8: ("Cold Brew", 9),
    9: ("Sandwich", 10),
    10: ("Burger", 12),
    11: ("Pizza Slice", 11),
    12: ("Pasta", 13),
    13: ("Salad", 7),
    14: ("Fries", 6),
    15: ("Taco", 9),
    16: ("Wrap", 8),
    17: ("Cake Slice", 5),
    18: ("Cookie", 3),
    19: ("Muffin", 4),
    20: ("Smoothie", 7),
}

# ======= WAITER SETUP ======= #
waiters = [
    {"name": "Amit", "occupied_time": 3},
    {"name": "Riya", "occupied_time": 10},
    {"name": "Karan", "occupied_time": 0},
    {"name": "Priya", "occupied_time": 5},
    {"name": "Sam", "occupied_time": 15},
]

# ======= ORDER STORAGE ======= #
orders = []
order_counter = 1


# ======= UTILITY FUNCTIONS ======= #
def merge_sort_orders(order_list):
    if len(order_list) <= 1:
        return order_list
    mid = len(order_list) // 2
    left = merge_sort_orders(order_list[:mid])
    right = merge_sort_orders(order_list[mid:])
    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i]["priority"] < right[j]["priority"]:
            result.append(left[i])
            i += 1
        elif left[i]["priority"] > right[j]["priority"]:
            result.append(right[j])
            j += 1
        else:
            if left[i]["prep_time"] > right[j]["prep_time"]:
                result.append(left[i])
                i += 1
            else:
                result.append(right[j])
                j += 1
    result += left[i:]
    result += right[j:]
    return result


def assign_waiter(order):
    available_waiter = min(waiters, key=lambda worker: worker["occupied_time"])
    order["assigned_waiter"] = available_waiter["name"]
    available_waiter["occupied_time"] += order["prep_time"]
    return available_waiter


def show_menu():
    print("\n======= MENU =======")
    for num, (item, time_needed) in menu.items():
        print(f"{num}. {item} ({time_needed} min)")
    print("====================")


def show_waiter_status():
    print("\n=== WAITER STATUS ===")
    for worker in waiters:
        print(f"{worker['name']}: {worker['occupied_time']} min busy")
    print("=====================")


def show_all_orders():
    if not orders:
        print("\nNo orders yet.")
        return
    print("\n=== ORDER LIST ===")
    for entry in orders:
        print(f"#{entry['id']} - {entry['item']} (Priority {entry['priority']}) → Waiter: {entry['assigned_waiter']}")
    print("==================")


# ======= CUSTOMER MODE ======= #
def customer_mode():
    global order_counter
    while True:
        show_menu()
        choice = input("\nEnter item number to order (or 'exit' to main menu): ").strip()
        if choice.lower() == "exit":
            print("\nReturning to Main Menu...\n")
            break
        if not choice.isdigit() or int(choice) not in menu:
            print("❌ Invalid choice. Try again.")
            continue
        item_no = int(choice)
        item_name, prep_time = menu[item_no]

        print("\nPriority Levels:\n1. VIP\n2. Regular\n3. Online")
        priority = input("Enter priority (1/2/3): ").strip()
        if priority not in ["1", "2", "3"]:
            print("❌ Invalid priority. Defaulting to Regular (2).")
            priority = 2
        else:
            priority = int(priority)

        order = {
            "id": order_counter,
            "item": item_name,
            "priority": priority,
            "prep_time": prep_time,
        }
        order_counter += 1

        orders.append(order)
        sorted_orders = merge_sort_orders(orders)
        for entry in sorted_orders:
            if "assigned_waiter" not in entry:
                assign_waiter(entry)

        assigned = orders[-1]["assigned_waiter"]
        print(f"\n✅ Your order '{item_name}' has been assigned to waiter {assigned}!")
        time.sleep(1)


# ======= ADMIN MODE ======= #
def admin_mode():
    while True:
        print("\n=== ADMIN MODE ===")
        print("1. View All Orders")
        print("2. View Waiter Status")
        print("Type 'exit' to return to Main Menu")
        choice = input("Enter choice: ").strip()
        if choice.lower() == "exit":
            print("\nReturning to Main Menu...\n")
            break
        if choice == "1":
            show_all_orders()
        elif choice == "2":
            show_waiter_status()
        else:
            print("❌ Invalid choice. Try again.")


# ======= MAIN LOOP ======= #
def main():
    print("========== CAFE MANAGEMENT SYSTEM ==========")
    while True:
        print("\nSelect Mode:")
        print("1. Customer Mode")
        print("2. Admin Mode")
        print("3. Exit")
        mode = input("Enter choice: ").strip()
        if mode == "1":
            customer_mode()
        elif mode == "2":
            admin_mode()
        elif mode == "3":
            print("\nExiting Cafe System. Goodbye!")
            break
        else:
            print("❌ Invalid choice. Try again.")


if __name__ == "__main__":
    main()
