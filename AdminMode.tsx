import { motion } from 'motion/react';
import { ArrowLeft, ListOrdered, Users, BarChart3, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import { WaiterCard } from './WaiterCard';
import { Order, Waiter } from '../types/cafe';

interface AdminModeProps {
  onBack: () => void;
  orders: Order[];
  waiters: Waiter[];
}

type TabType = 'orders' | 'waiters' | 'statistics';

export function AdminMode({ onBack, orders, waiters }: AdminModeProps) {
  const [activeTab, setActiveTab] = useState<TabType>('orders');

  const tabs = [
    { id: 'orders' as TabType, label: 'Orders', icon: ListOrdered },
    { id: 'waiters' as TabType, label: 'Waiters', icon: Users },
    { id: 'statistics' as TabType, label: 'Statistics', icon: BarChart3 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'VIP': return '#D4AF37';
      case 'Regular': return '#6B4F4F';
      case 'Online': return '#B8CBB9';
      default: return '#6B4F4F';
    }
  };

  const getPriorityBadgeStyle = (priority: string) => {
    switch (priority) {
      case 'VIP': return { bg: '#FFF9E6', text: '#D4AF37' };
      case 'Regular': return { bg: '#EADBC8', text: '#6B4F4F' };
      case 'Online': return { bg: '#E8F4E9', text: '#5A9367' };
      default: return { bg: '#EADBC8', text: '#6B4F4F' };
    }
  };

  const sortedOrders = [...orders].sort((a, b) => {
    const priorityOrder = { VIP: 1, Regular: 2, Online: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  const totalOrders = orders.length;
  const completedOrders = orders.filter(o => o.status === 'Completed').length;
  const avgPrepTime = orders.length > 0 
    ? Math.round(orders.reduce((sum, o) => sum + o.prepTime, 0) / orders.length)
    : 0;
  
  const itemCounts: { [key: string]: number } = {};
  orders.forEach(order => {
    itemCounts[order.itemName] = (itemCounts[order.itemName] || 0) + 1;
  });
  const mostOrdered = Object.entries(itemCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  
  const topWaiter = [...waiters].sort((a, b) => b.totalOrders - a.totalOrders)[0]?.name || 'N/A';

  return (
    <div className="min-h-screen relative z-10">
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <motion.button
              whileHover={{ scale: 1.05, x: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200"
              style={{ backgroundColor: '#EADBC8', color: '#6B4F4F' }}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Exit to Main Menu</span>
            </motion.button>
            
            <h2 className="text-center" style={{ color: '#6B4F4F' }}>Admin Dashboard</h2>
            
            <div className="w-32" />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 relative"
                  style={{
                    backgroundColor: isActive ? '#6B4F4F' : 'white',
                    color: isActive ? '#FFF8E7' : '#6B4F4F',
                    boxShadow: isActive ? '0 4px 15px rgba(107, 79, 79, 0.2)' : 'none'
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-center">{tab.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: '#B8CBB9' }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'white',
              boxShadow: '0 4px 20px rgba(107, 79, 79, 0.1)'
            }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ backgroundColor: '#FFF8E7' }}>
                    <th className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                      Order ID
                    </th>
                    <th className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                      Item
                    </th>
                    <th className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                      Priority
                    </th>
                    <th className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                      Waiter
                    </th>
                    <th className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                      Prep Time
                    </th>
                    <th className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order, index) => {
                    const priorityStyle = getPriorityBadgeStyle(order.priority);
                    return (
                      <motion.tr
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="border-t"
                        style={{ borderColor: '#EADBC8' }}
                      >
                        <td className="px-6 py-4 text-center" style={{ color: '#8B6F6F', fontSize: '0.875rem' }}>
                          {order.id}
                        </td>
                        <td className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                          {order.itemName}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className="px-3 py-1 rounded-full text-xs inline-block"
                            style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text }}
                          >
                            {order.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center" style={{ color: '#6B4F4F' }}>
                          {order.waiterName}
                        </td>
                        <td className="px-6 py-4 text-center" style={{ color: '#8B6F6F' }}>
                          {order.prepTime} min
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            {order.status === 'Completed' ? (
                              <>
                                <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} />
                                <span style={{ color: '#4CAF50', fontSize: '0.875rem' }}>Completed</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-5 h-5" style={{ color: '#FFA726' }} />
                                <span style={{ color: '#FFA726', fontSize: '0.875rem' }}>In Progress</span>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
              {sortedOrders.length === 0 && (
                <div className="p-12 text-center">
                  <p className="text-center" style={{ color: '#8B6F6F' }}>
                    No orders yet. Orders will appear here once customers start placing them.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'waiters' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {waiters.map((waiter, index) => (
                <motion.div
                  key={waiter.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WaiterCard waiter={waiter} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'statistics' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl p-6 text-center"
              style={{
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(107, 79, 79, 0.1)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#E8F4E9' }}
                >
                  <ListOrdered className="w-6 h-6" style={{ color: '#4CAF50' }} />
                </div>
              </div>
              <div className="mb-1 text-center" style={{ fontSize: '0.875rem', color: '#8B6F6F' }}>
                Total Orders
              </div>
              <div className="text-3xl text-center" style={{ color: '#6B4F4F' }}>
                {totalOrders}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl p-6 text-center"
              style={{
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(107, 79, 79, 0.1)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#EADBC8' }}
                >
                  <Clock className="w-6 h-6" style={{ color: '#6B4F4F' }} />
                </div>
              </div>
              <div className="mb-1 text-center" style={{ fontSize: '0.875rem', color: '#8B6F6F' }}>
                Avg Prep Time
              </div>
              <div className="text-3xl text-center" style={{ color: '#6B4F4F' }}>
                {avgPrepTime} min
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl p-6 text-center"
              style={{
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(107, 79, 79, 0.1)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#FFF9E6' }}
                >
                  <BarChart3 className="w-6 h-6" style={{ color: '#FFA726' }} />
                </div>
              </div>
              <div className="mb-1 text-center" style={{ fontSize: '0.875rem', color: '#8B6F6F' }}>
                Most Ordered
              </div>
              <div className="text-xl truncate text-center" style={{ color: '#6B4F4F' }}>
                {mostOrdered}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl p-6 text-center"
              style={{
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(107, 79, 79, 0.1)'
              }}
            >
              <div className="flex items-center justify-center mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: '#E8F4E9' }}
                >
                  <Users className="w-6 h-6" style={{ color: '#B8CBB9' }} />
                </div>
              </div>
              <div className="mb-1 text-center" style={{ fontSize: '0.875rem', color: '#8B6F6F' }}>
                Top Waiter
              </div>
              <div className="text-xl text-center" style={{ color: '#6B4F4F' }}>
                {topWaiter}
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
