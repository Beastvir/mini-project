import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, Coffee, User } from "lucide-react";
import { toast } from "sonner";

import type { MenuItem, Order, Priority } from "../types/cafe";
import { MenuItemCard } from "./MenuItemCard";
import { OrderModal } from "./OrderModal";

interface CustomerModeProps {
  onBack: () => void;
  orders: Order[];
  menuItems: MenuItem[];
  onCreateOrder: (item: MenuItem, priority: Priority) => Promise<Order>;
  isLoading: boolean;
  isSubmittingOrder: boolean;
  errorMessage?: string | null;
}

export function CustomerMode({
  onBack,
  orders,
  menuItems,
  onCreateOrder,
  isLoading,
  isSubmittingOrder,
  errorMessage,
}: CustomerModeProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeOrders = useMemo(() => {
    const priorityRank: Record<Priority, number> = { VIP: 0, Regular: 1, Online: 2 };
    return orders
      .filter((order) => order.status === "In Progress")
      .sort((a, b) => {
        if (priorityRank[a.priority] !== priorityRank[b.priority]) {
          return priorityRank[a.priority] - priorityRank[b.priority];
        }
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      });
  }, [orders]);

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmOrder = async (priority: Priority) => {
    if (!selectedItem) {
      return;
    }

    try {
      const createdOrder = await onCreateOrder(selectedItem, priority);
      toast.success(
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: "#B8CBB9" }} />
          <div>
            <div style={{ color: "#6B4F4F" }}>Order Confirmed!</div>
            <div style={{ color: "#8B6F6F", fontSize: "0.875rem" }}>
              Your {createdOrder.itemName} has been assigned to {createdOrder.waiterName}. Estimated prep: {createdOrder.prepTime} min.
            </div>
          </div>
        </div>
      );
    } catch (error) {
      console.error(error);
      toast.error("Unable to place the order. Please try again.");
    } finally {
      setIsModalOpen(false);
      setSelectedItem(null);
    }
  };

  const renderEta = (order: Order) => {
    const remainingMs = new Date(order.estimatedCompletion).getTime() - Date.now();
    const remainingMinutes = Math.max(Math.ceil(remainingMs / 60000), 0);
    return remainingMinutes > 0 ? `${remainingMinutes} min` : "Ready";
  };

  const showEmptyState = !isLoading && menuItems.length === 0;

  return (
    <div className="min-h-screen relative z-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 px-4 py-6"
        style={{
          backgroundColor: "rgba(255, 248, 231, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(107, 79, 79, 0.1)",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: "#EADBC8", color: "#6B4F4F" }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>

          <div className="flex items-center gap-3 justify-center">
            <Coffee className="w-8 h-8" style={{ color: "#6B4F4F" }} />
            <div className="text-center">
              <h2 className="text-center" style={{ color: "#6B4F4F" }}>
                BrewBytes Café
              </h2>
              <p className="text-center" style={{ color: "#8B6F6F", fontSize: "0.875rem" }}>
                Self-Service Kiosk
              </p>
            </div>
          </div>

          <div className="w-24" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 rounded-xl px-4 py-3"
            style={{ backgroundColor: "#FFE8E8", color: "#6B4F4F" }}
          >
            {errorMessage}
          </motion.div>
        )}

        {showEmptyState ? (
          <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(107, 79, 79, 0.1)" }}>
            <p style={{ color: "#8B6F6F" }}>No menu items available yet. Please check back soon.</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <h3 className="mb-6" style={{ color: "#6B4F4F" }}>
              Our Menu
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <MenuItemCard item={item} onOrder={handleOrderClick} disabled={isSubmittingOrder} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 mt-8"
            style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(107, 79, 79, 0.1)" }}
          >
            <h3 className="mb-6" style={{ color: "#6B4F4F" }}>
              Active Orders
            </h3>
            <div className="space-y-4">
              {activeOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: "#FFF8E7", border: "1px solid #EADBC8" }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: "#6B4F4F" }}>{order.itemName}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor:
                              order.priority === "VIP"
                                ? "#D4AF37"
                                : order.priority === "Regular"
                                ? "#6B4F4F"
                                : "#B8CBB9",
                            color: "white",
                          }}
                        >
                          {order.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4" style={{ fontSize: "0.875rem", color: "#8B6F6F" }}>
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {order.waiterName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          ETA: {renderEta(order)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs" style={{ color: "#8B6F6F" }}>
                        {order.id}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#EADBC8" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "60%" }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{
                        backgroundColor:
                          order.priority === "VIP"
                            ? "#D4AF37"
                            : order.priority === "Regular"
                            ? "#6B4F4F"
                            : "#B8CBB9",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <OrderModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmOrder}
        isSubmitting={isSubmittingOrder}
      />
    </div>
  );
}
