
import { motion } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export default function NotFoundPage() {
  const navigate = useNavigate();

  // Floating particles background
  const Particle = ({ style }) => (
    <motion.div
      className="absolute bg-gradient-to-r from-purple-400/20 to-cyan-400/20 rounded-full"
      initial={{ y: 0, opacity: 0 }}
      animate={{
        y: [0, -100, 0],
        x: [0, 50, 0],
        opacity: [0, 0.3, 0],
      }}
      transition={{
        duration: Math.random() * 4 + 6,
        repeat: Infinity,
        repeatType: "loop",
        delay: Math.random() * 2,
      }}
      style={style}
    />
  );

  return (
    <div className="relative h-screen w-full bg-zinc-900 overflow-hidden flex items-center justify-center">
      {/* Animated particles background */}
      {[...Array(15)].map((_, i) => (
        <Particle
          key={i}
          style={{
            width: Math.random() * 40 + 20,
            height: Math.random() * 40 + 20,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <div className="relative inline-block">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 blur-3xl opacity-30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          <motion.h1
            className="text-[15rem] font-extrabold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            animate={{
              textShadow: [
                "0 0 10px rgba(192,132,252,0.3)",
                "0 0 20px rgba(34,211,238,0.3)",
                "0 0 10px rgba(192,132,252,0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
          >
            404
          </motion.h1>
        </div>

        <motion.p
          className="text-2xl text-zinc-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Lost in the digital cosmos? Let's navigate back to familiar constellations.
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate({ to: "/" })}
          className="bg-gradient-to-r from-purple-700 to-cyan-700 text-white px-8 py-3 rounded-xl 
                    hover:shadow-2xl hover:shadow-purple-500/20 transition-all font-bold"
        >
          Return to Orbit
        </motion.button>
      </motion.div>

      {/* Grid overlay */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]">
        <div className="absolute inset-0 bg-[linear-gradient(#0f172a_1px,transparent_1px),linear-gradient(90deg,#0f172a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
    </div>
  );
}