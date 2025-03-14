// LogoutButton.jsx
import { motion } from 'framer-motion';
import { useNavigate } from '@tanstack/react-router';

export function LogoutButton() {
  const navigate = useNavigate();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => navigate({ to: '/logout' })}
      className="px-4 py-2 rounded-lg bg-zinc-700/50 hover:bg-red-500/20 transition-colors text-zinc-200 border border-red-500/30"
    >
      Logout
    </motion.button>
  );
}