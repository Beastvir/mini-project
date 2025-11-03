import { motion } from 'motion/react';
import { Coffee, UserCog } from 'lucide-react';

interface MainMenuProps {
  onSelectMode: (mode: 'customer' | 'admin') => void;
}

export function MainMenu({ onSelectMode }: MainMenuProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl w-full"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <Coffee className="w-20 h-20 mx-auto mb-4" style={{ color: '#6B4F4F' }} />
          <h1 className="mb-3" style={{ color: '#6B4F4F' }}>
            BrewBytes Café Management System
          </h1>
          <p style={{ color: '#8B6F6F' }} className="text-lg">
            Smart Order Scheduler powered by Python
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch">
          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            onClick={() => onSelectMode('customer')}
            className="flex-1 md:max-w-xs rounded-3xl p-8 transition-all duration-300 text-center"
            style={{
              backgroundColor: '#6B4F4F',
              color: '#FFF8E7',
              boxShadow: '0 8px 30px rgba(107, 79, 79, 0.15)'
            }}
          >
            <Coffee className="w-12 h-12 mx-auto mb-4" />
            <h3 className="mb-2 text-center" style={{ color: '#FFF8E7' }}>Customer Mode</h3>
            <p className="text-center" style={{ color: '#EADBC8', fontSize: '0.95rem' }}>
              Browse menu and place orders
            </p>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            onClick={() => onSelectMode('admin')}
            className="flex-1 md:max-w-xs rounded-3xl p-8 transition-all duration-300 text-center"
            style={{
              backgroundColor: '#B8CBB9',
              color: '#4A3535',
              boxShadow: '0 8px 30px rgba(184, 203, 185, 0.2)'
            }}
          >
            <UserCog className="w-12 h-12 mx-auto mb-4" />
            <h3 className="mb-2 text-center" style={{ color: '#4A3535' }}>Admin Mode</h3>
            <p className="text-center" style={{ color: '#6B4F4F', fontSize: '0.95rem' }}>
              Manage orders and staff
            </p>
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-center" style={{ color: '#8B6F6F', fontSize: '0.875rem' }}>
            © 2025 BrewBytes Café • Built for seamless operations
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
