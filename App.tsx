import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { MainMenu } from './components/MainMenu';
import { CustomerMode } from './components/CustomerMode';
import { AdminMode } from './components/AdminMode';
import { Order, Waiter, WAITER_NAMES } from './types/cafe';

type AppMode = 'main' | 'customer' | 'admin';

export default function App() {
  const [mode, setMode] = useState<AppMode>('main');
  const [orders, setOrders] = useState<Order[]>([]);
  const [waiters, setWaiters] = useState<Waiter[]>(() =>
    WAITER_NAMES.map(name => ({
      name,
      occupiedTime: 0,
      currentOrders: 0,
      totalOrders: 0
    }))
  );

  const handleAddOrder = (order: Order) => {
    setOrders(prev => [...prev, order]);
    
    setWaiters(prev => 
      prev.map(waiter => 
        waiter.name === order.waiterName
          ? {
              ...waiter,
              occupiedTime: waiter.occupiedTime + order.prepTime,
              currentOrders: waiter.currentOrders + 1,
              totalOrders: waiter.totalOrders + 1
            }
          : waiter
      )
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWaiters(prev => 
        prev.map(waiter => ({
          ...waiter,
          occupiedTime: Math.max(0, waiter.occupiedTime - 0.5),
          currentOrders: waiter.occupiedTime > 0.5 ? waiter.currentOrders : 0
        }))
      );

      setOrders(prev => 
        prev.map(order => {
          const timeElapsed = (Date.now() - order.timestamp.getTime()) / 60000;
          if (timeElapsed >= order.prepTime && order.status === 'In Progress') {
            return { ...order, status: 'Completed' as const };
          }
          return order;
        })
      );
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {mode === 'main' && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MainMenu onSelectMode={(selectedMode) => setMode(selectedMode)} />
          </motion.div>
        )}

        {mode === 'customer' && (
          <motion.div
            key="customer"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <CustomerMode
              onBack={() => setMode('main')}
              orders={orders}
              onAddOrder={handleAddOrder}
              waiters={waiters}
            />
          </motion.div>
        )}

        {mode === 'admin' && (
          <motion.div
            key="admin"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <AdminMode
              onBack={() => setMode('main')}
              orders={orders}
              waiters={waiters}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            backgroundColor: 'white',
            color: '#6B4F4F',
            border: '1px solid #EADBC8',
            boxShadow: '0 8px 30px rgba(107, 79, 79, 0.15)'
          }
        }}
      />
    </>
  );
}
