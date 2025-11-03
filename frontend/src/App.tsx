import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "sonner";

import { AdminMode } from "./components/AdminMode";
import { CustomerMode } from "./components/CustomerMode";
import { MainMenu } from "./components/MainMenu";
import { api } from "./lib/api";
import type { MenuItem, Order, Priority, Waiter } from "./types/cafe";

type AppMode = "main" | "customer" | "admin";

const POLL_INTERVAL_MS = 15000;

export default function App() {
  const [mode, setMode] = useState<AppMode>("main");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [waiters, setWaiters] = useState<Waiter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadOrdersAndWaiters = useCallback(async () => {
    try {
      const [ordersResponse, waitersResponse] = await Promise.all([api.getOrders(), api.getWaiters()]);
      setOrders(ordersResponse);
      setWaiters(waitersResponse);
      setErrorMessage(null);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to refresh data from the backend.");
      throw error;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const menuResponse = await api.getMenu();
        if (isMounted) {
          setMenuItems(menuResponse);
        }
        await loadOrdersAndWaiters();
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setErrorMessage("Unable to reach the cafe service. Please ensure the backend is running.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrap();

    const intervalId = window.setInterval(() => {
      loadOrdersAndWaiters().catch(() => undefined);
    }, POLL_INTERVAL_MS);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [loadOrdersAndWaiters]);

  const handleCreateOrder = useCallback(
    async (item: MenuItem, priority: Priority) => {
      setIsSubmittingOrder(true);
      try {
        const result = await api.createOrder({ itemId: item.id, priority });
        await loadOrdersAndWaiters();
        return result.order;
      } catch (error) {
        console.error(error);
        setErrorMessage("Unable to create order. Please try again.");
        throw error;
      } finally {
        setIsSubmittingOrder(false);
      }
    },
    [loadOrdersAndWaiters]
  );

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === "main" && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainMenu onSelectMode={setMode} />
          </motion.div>
        )}

        {mode === "customer" && (
          <motion.div
            key="customer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <CustomerMode
              onBack={() => setMode("main")}
              orders={orders}
              menuItems={menuItems}
              onCreateOrder={handleCreateOrder}
              isLoading={isLoading}
              isSubmittingOrder={isSubmittingOrder}
              errorMessage={errorMessage}
            />
          </motion.div>
        )}

        {mode === "admin" && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <AdminMode
              onBack={() => setMode("main")}
              orders={orders}
              waiters={waiters}
              isLoading={isLoading}
              errorMessage={errorMessage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: "white",
            color: "#6B4F4F",
            border: "1px solid #EADBC8",
            boxShadow: "0 8px 30px rgba(107, 79, 79, 0.15)",
          },
        }}
      />
    </>
  );
}
