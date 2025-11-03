import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

import type { Waiter } from "../types/cafe";

interface WaiterCardProps {
  waiter: Waiter;
}

export function WaiterCard({ waiter }: WaiterCardProps) {
  const getStatus = () => {
    if (waiter.occupiedTime < 5) {
      return { bg: "#E8F4E9", text: "#4CAF50", label: "Free" };
    }
    if (waiter.occupiedTime < 10) {
      return { bg: "#FFF9E6", text: "#FFA726", label: "Busy" };
    }
    return { bg: "#FFE8E8", text: "#EF5350", label: "Occupied" };
  };

  const status = getStatus();
  const occupiedPercentage = Math.min((waiter.occupiedTime / 15) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5 }}
      className="rounded-2xl p-6"
      style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(107, 79, 79, 0.1)" }}
    >
      <div className="flex items-center justify-center flex-col mb-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: status.bg }}>
          <User className="w-6 h-6" style={{ color: status.text }} />
        </div>
        <div className="text-center">
          <h4 className="text-center" style={{ color: "#6B4F4F" }}>
            {waiter.name}
          </h4>
          <span
            className="inline-block px-2 py-0.5 rounded-full text-xs mt-1"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            {status.label}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between" style={{ fontSize: "0.875rem" }}>
          <span style={{ color: "#8B6F6F" }}>Occupied Time</span>
          <span style={{ color: "#6B4F4F" }} className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {waiter.occupiedTime.toFixed(1)} min
          </span>
        </div>

        <div className="relative h-3 rounded-full overflow-hidden" style={{ backgroundColor: "#EADBC8" }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${occupiedPercentage}%` }}
            transition={{ duration: 0.8 }}
            className="h-full rounded-full"
            style={{ backgroundColor: status.text }}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: "#EADBC8" }}>
          <div className="text-center">
            <div className="text-center" style={{ fontSize: "0.75rem", color: "#8B6F6F" }}>
              Current
            </div>
            <div className="text-center" style={{ color: "#6B4F4F" }}>
              {waiter.currentOrders}
            </div>
          </div>
          <div className="text-center">
            <div className="text-center" style={{ fontSize: "0.75rem", color: "#8B6F6F" }}>
              Total
            </div>
            <div className="text-center" style={{ color: "#6B4F4F" }}>
              {waiter.totalOrders}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
