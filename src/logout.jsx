import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useFlash } from "./FlashContext";

export function LogoutRoute() {
  const navigate = useNavigate();
  const { addFlash } = useFlash();

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    addFlash('success', 'Secure session termination confirmed');
    navigate({ to: '/' });
  };

  // Enhanced particle system with multiple layers
  const CyberParticle = ({ style, speed }) => (
    <motion.div
      className="absolute bg-gradient-to-r from-purple-200/10 to-cyan-200/10 rounded-full"
      initial={{ y: 0, x: 0, opacity: 0 }}
      animate={{
        y: [0, -200, -400],
        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
        opacity: [0, 0.3, 0],
        scale: [1, 0.5, 0]
      }}
      transition={{
        duration: Math.random() * speed + (speed * 0.5),
        repeat: Infinity,
        ease: "linear"
      }}
      style={style}
    />
  );

  return (
    <div className="relative h-screen w-full bg-zinc-950 overflow-hidden flex items-center justify-center">
      {/*<motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-cyan-900/20"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
      />*/}

      {/* Particle layers */}
      {[...Array(8)].map((_, i) => (
        <CyberParticle
          key={`slow-${i}`}
          speed={10}
          style={{
            width: Math.random() * 80 + 40,
            height: Math.random() * 80 + 40,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(12px)'
          }}
        />
      ))}

      {[...Array(15)].map((_, i) => (
        <CyberParticle
          key={`fast-${i}`}
          speed={8}
          style={{
            width: Math.random() * 10 + 5,
            height: Math.random() * 10 + 5,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(2px)'
          }}
        />
      ))}

      {/* Hexagonal grid pattern */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,transparent_60%,black)]">
        <div className="absolute inset-0 bg-hex-pattern bg-[size:60px_60px]" />
      </div>

      {/* Data stream effect */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_10%,black_40%)]">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute h-0.5 bg-gradient-to-r from-cyan-400/10 to-purple-400/10"
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              width: `${Math.random() * 40 + 20}%`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100 - 20}%`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </div>

      {/* Main dialog container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 bg-zinc-900/90 backdrop-blur-2xl rounded-2xl p-8 max-w-md w-full border border-zinc-800 shadow-cyber"
      >
        <div className="absolute -inset-2 rounded-2xl border border-cyan-400/10 pointer-events-none" />
        
        <h2 className="text-3xl font-bold bg-gradient-to-r from-zinc-100 to-zinc-300 bg-clip-text text-transparent mb-4">
          <span className="text-cyan-400">#</span> Session Termination
        </h2>

        <p className="text-zinc-400 mb-8 leading-relaxed font-light">
          Authorization required to complete system disconnection protocol. 
          This action will permanently erase active credentials.
        </p>

        <div className="flex gap-3 justify-end">
          <motion.button
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(63, 63, 70, 0.5)'
            }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate({ to: '/dashboard' })}
            className="px-6 py-2.5 rounded-lg bg-zinc-800/40 border border-zinc-700 text-zinc-300
                      hover:border-cyan-400/30 transition-all font-medium flex items-center gap-2"
          >
            <span className="text-cyan-400/80 text-lg">↩</span> Cancel
          </motion.button>
          
          <motion.button
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 0 25px -5px rgba(239,68,68,0.3)'
            }}
            whileTap={{ scale: 0.97 }}
            onClick={handleLogout}
            className="px-6 py-2.5 rounded-lg bg-red-500/90 border border-red-600/80 text-white
                      hover:bg-red-400/90 transition-all font-medium flex items-center gap-2"
          >
            <span className="animate-pulse">⚠️</span> Confirm
          </motion.button>
        </div>
      </motion.div>

      {/* Interactive background elements */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full"
          animate={{
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
    </div>
  );
}