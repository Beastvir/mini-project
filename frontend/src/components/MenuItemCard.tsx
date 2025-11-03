import { motion } from "framer-motion";
import { Clock } from "lucide-react";

import type { MenuItem } from "../types/cafe";
import { ImageWithFallback } from "./ImageWithFallback";

interface MenuItemCardProps {
  item: MenuItem;
  onOrder: (item: MenuItem) => void;
  disabled?: boolean;
}

export function MenuItemCard({ item, onOrder, disabled = false }: MenuItemCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl overflow-hidden"
      style={{ backgroundColor: "white", boxShadow: "0 4px 20px rgba(107, 79, 79, 0.1)" }}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div
          className="absolute top-3 right-3 px-3 py-1 rounded-full flex items-center gap-1.5"
          style={{ backgroundColor: "rgba(255, 248, 231, 0.95)" }}
        >
          <Clock className="w-3.5 h-3.5" style={{ color: "#6B4F4F" }} />
          <span style={{ color: "#6B4F4F", fontSize: "0.875rem" }}>{item.prepTime} min</span>
        </div>
      </div>

      <div className="p-5 text-center">
        <h4 className="mb-3 text-center" style={{ color: "#6B4F4F" }}>
          {item.name}
        </h4>
        <span
          className="inline-block px-3 py-1 rounded-full mb-4 text-center"
          style={{ backgroundColor: "#EADBC8", color: "#6B4F4F", fontSize: "0.813rem" }}
        >
          {item.category}
        </span>

        <motion.button
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => !disabled && onOrder(item)}
          disabled={disabled}
          className="w-full py-2.5 rounded-xl transition-all duration-300 text-center"
          style={{
            backgroundColor: disabled ? "#B8CBB9" : "#6B4F4F",
            color: "#FFF8E7",
            opacity: disabled ? 0.7 : 1,
          }}
        >
          {disabled ? "Processing..." : "Order Now"}
        </motion.button>
      </div>
    </motion.div>
  );
}
