import { motion } from 'motion/react';
import { ArrowLeft, Coffee, CheckCircle2, Clock, User } from 'lucide-react';
import { useState } from 'react';
import { MenuItemCard } from './MenuItemCard';
import { OrderModal } from './OrderModal';
import { MenuItem, Order, Priority, MENU_ITEMS } from '../types/cafe';
import { toast } from 'sonner@2.0.3';

interface CustomerModeProps {
  onBack: () => void;
  orders: Order[];
  onAddOrder: (order: Order) => void;
  waiters: { name: string; occupiedTime: number }[];
}

export function CustomerMode({ onBack, orders, onAddOrder, waiters }: CustomerModeProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOrderClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const assignWaiter = (): string => {
    const sortedWaiters = [...waiters].sort((a, b) => a.occupiedTime - b.occupiedTime);
    return sortedWaiters[0].name;
  };

  const handleConfirmOrder = (priority: Priority) => {
    if (!selectedItem) return;

    const waiterName = assignWaiter();
    const now = new Date();
    const estimatedCompletion = new Date(now.getTime() + selectedItem.prepTime * 60000);

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      itemId: selectedItem.id,
      itemName: selectedItem.name,
      priority,
      waiterName,
      prepTime: selectedItem.prepTime,
      status: 'In Progress',
      timestamp: now,
      estimatedCompletion
    };

    onAddOrder(newOrder);
    setIsModalOpen(false);
    setSelectedItem(null);

    toast.success(
      <div className="flex items-start gap-3">
        <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#B8CBB9' }} />
        <div>
          <div style={{ color: '#6B4F4F' }}>Order Confirmed!</div>
          <div style={{ color: '#8B6F6F', fontSize: '0.875rem' }}>
            Your {selectedItem.name} has been assigned to {waiterName}. Estimated prep: {selectedItem.prepTime} min.
          </div>
        </div>
      </div>
    );
  };

  const myOrders = orders.filter(order => order.status === 'In Progress').sort((a, b) => {
    const priorityOrder = { VIP: 1, Regular: 2, Online: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'VIP': return '#D4AF37';
      case 'Regular': return '#6B4F4F';
      case 'Online': return '#B8CBB9';
    }
  };

  return (
    <div className="min-h-screen relative z-10 pb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-20 px-4 py-6"
        style={{
          backgroundColor: 'rgba(255, 248, 231, 0.95)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(107, 79, 79, 0.1)'
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.button
            whileHover={{ scale: 1.05, x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
            style={{ backgroundColor: '#EADBC8', color: '#6B4F4F' }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </motion.button>
          
          <div className="flex items-center gap-3 justify-center">
            <Coffee className="w-8 h-8" style={{ color: '#6B4F4F' }} />
            <div className="text-center">
              <h2 className="text-center" style={{ color: '#6B4F4F' }}>BrewBytes Café</h2>
              <p className="text-center" style={{ color: '#8B6F6F', fontSize: '0.875rem' }}>Self-Service Kiosk</p>
            </div>
          </div>
          
          <div className="w-24" />
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 mt-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="mb-6" style={{ color: '#6B4F4F' }}>Our Menu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {MENU_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MenuItemCard item={item} onOrder={handleOrderClick} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {myOrders.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6 mt-8"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(107, 79, 79, 0.1)'
            }}
          >
            <h3 className="mb-6" style={{ color: '#6B4F4F' }}>My Active Orders</h3>
            <div className="space-y-4">
              {myOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl"
                  style={{ backgroundColor: '#FFF8E7', border: '1px solid #EADBC8' }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span style={{ color: '#6B4F4F' }}>{order.itemName}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: getPriorityColor(order.priority),
                            color: 'white'
                          }}
                        >
                          {order.priority}
                        </span>
                      </div>
                      <div className="flex items-center gap-4" style={{ fontSize: '0.875rem', color: '#8B6F6F' }}>
                        <span className="flex items-center gap-1.5">
                          <User className="w-4 h-4" />
                          {order.waiterName}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          ETA: {order.prepTime} min
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs" style={{ color: '#8B6F6F' }}>
                        {order.id}
                      </span>
                    </div>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#EADBC8' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '60%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: getPriorityColor(order.priority) }}
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
      />
    </div>
  );
}
