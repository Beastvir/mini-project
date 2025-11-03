import { useEffect, useState, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Award, Globe, User, X } from "lucide-react";

import type { MenuItem, Priority } from "../types/cafe";
import { ImageWithFallback } from "./ImageWithFallback";

interface OrderModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (priority: Priority) => Promise<void> | void;
  isSubmitting: boolean;
}

export function OrderModal({ item, isOpen, onClose, onConfirm, isSubmitting }: OrderModalProps) {
  const [selectedPriority, setSelectedPriority] = useState<Priority>("Regular");

  useEffect(() => {
    if (!isOpen) {
      setSelectedPriority("Regular");
    }
  }, [isOpen]);

  if (!item) {
    return null;
  }

  const priorities = [
    { value: "VIP" as Priority, icon: Award, label: "VIP", color: "#D4AF37", bg: "#FFF9E6" },
    { value: "Regular" as Priority, icon: User, label: "Regular", color: "#6B4F4F", bg: "#EADBC8" },
    { value: "Online" as Priority, icon: Globe, label: "Online", color: "#B8CBB9", bg: "#E8F4E9" },
  ];

  const handleConfirm = async () => {
    await onConfirm(selectedPriority);
    setSelectedPriority("Regular");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(107, 79, 79, 0.5)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
            className="rounded-3xl max-w-md w-full overflow-hidden relative"
            style={{
              backgroundColor: "white",
              boxShadow: "0 20px 60px rgba(107, 79, 79, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200"
              style={{ backgroundColor: "rgba(255, 248, 231, 0.9)" }}
              aria-label="Close"
            >
              <X className="w-5 h-5" style={{ color: "#6B4F4F" }} />
            </button>

            <div className="h-56 overflow-hidden">
              <ImageWithFallback src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
            </div>

            <div className="p-6">
              <h3 className="mb-2 text-center" style={{ color: "#6B4F4F" }}>
                {item.name}
              </h3>
              <p className="mb-6 text-center" style={{ color: "#8B6F6F", fontSize: "0.938rem" }}>
                Preparation time: {item.prepTime} minutes
              </p>

              <div className="mb-6">
                <label className="block mb-3 text-center" style={{ color: "#6B4F4F" }}>
                  Select Priority
                </label>
                <div className="space-y-3">
                  {priorities.map(({ value, icon: Icon, label, color, bg }) => (
                    <motion.button
                      key={value}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedPriority(value)}
                      className="w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200"
                      style={{
                        backgroundColor: selectedPriority === value ? bg : "#F9F9F9",
                        border: `2px solid ${selectedPriority === value ? color : "transparent"}`,
                      }}
                      type="button"
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                      <span style={{ color: "#6B4F4F" }}>{label}</span>
                      {selectedPriority === value && (
                        <motion.div
                          layoutId="priority-indicator"
                          className="w-5 h-5 rounded-full ml-2"
                          style={{ backgroundColor: color }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl transition-colors duration-200 text-center"
                  style={{ backgroundColor: "#EADBC8", color: "#6B4F4F" }}
                  type="button"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  onClick={handleConfirm}
                  className="flex-1 py-3 rounded-xl transition-colors duration-200 text-center disabled:opacity-70"
                  style={{ backgroundColor: "#6B4F4F", color: "#FFF8E7" }}
                  disabled={isSubmitting}
                  type="button"
                >
                  {isSubmitting ? "Confirming..." : "Confirm Order"}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
