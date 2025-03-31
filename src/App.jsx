// App.jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  FiChevronRight,
  FiZap,
  FiShield,
  FiCloud,
  FiMenu,
  FiX,
  FiActivity,
} from "react-icons/fi";
import { useNavigate } from "@tanstack/react-router";
import "./App.css";

export default function Home() {
  const { scrollY } = useScroll();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [coreHovered, setCoreHovered] = useState(false);

  const navigate = useNavigate();

  const y1 = useTransform(scrollY, [0, 1000], [0, 100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);

  const nodesRef = useRef(
    Array.from({ length: 6 }, () => ({
      xOffset: Math.random() * 20 - 10, // -10 to 10
      yOffset: Math.random() * 20 - 10,
      rotation: Math.random() * 360,
    })),
  );

  useEffect(() => {
    const updateMouse = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMouse);
    return () => window.removeEventListener("mousemove", updateMouse);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden text-gray-100">
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black bg-no-repeat bg-fixed" />
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwADbgG1njwQ4gAAAABJRU5ErkJggg==')",
          backgroundRepeat: "repeat",
        }}
      />

      {/* Dynamic Background Glow */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, 
            rgba(107, 33, 168, 0.1) 0%, 
            rgba(107, 33, 168, 0.05) 20%, 
            rgba(0, 0, 0, 0) 50%)`,
        }}
        transition={{ type: "tween", duration: 0.5 }}
      />

      {/* Cyber Grid (Hidden on Mobile) */}
      <div className="fixed inset-0 z-0 opacity-10 hidden md:block">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[length:100px_100px]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-transparent" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-black/90 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2"
          >
            {/* Branding Changed to "Ekono" */}
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
              Ekono
            </span>
          </motion.div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {["Solutions", "Technology", "Pricing"].map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ y: -2 }}
                className="text-gray-300 hover:text-purple-500 transition-colors cursor-pointer"
              >
                {item}
              </motion.a>
            ))}
            <button
              onClick={() => {
                navigate({ to: "/console" });
              }}
              className="bg-gradient-to-r from-purple-900 via-purple-800/40 to-purple-900/60 px-6 py-2.5 rounded-full flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
            >
              Console Access
              <FiChevronRight className="text-lg" />
            </button>
          </div>
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(true)}>
              <FiMenu className="text-2xl" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-50">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4"
          >
            <FiX className="text-3xl text-white" />
          </button>
          <nav className="space-y-6 text-center">
            {["Solutions", "Technology", "Pricing"].map((item, i) => (
              <a
                key={i}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl text-gray-300 hover:text-purple-500 transition-colors cursor-pointer"
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-gradient-to-r from-purple-800 to-purple-600 px-6 py-2.5 rounded-full flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
            >
              Console Access
              <FiChevronRight className="text-lg" />
            </button>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 text-center md:text-left"
          >
            {/* Updated Hero Branding */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-8 max-w-3xl leading-tight">
              <span className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent text-7xl sm:text-8xl md:text-8xl lg:text-8xl">
                Ekono
              </span>
              <motion.span
                className="block text-xl sm:text-2xl md:text-3xl mt-6 text-gray-400 font-light"
                animate={{
                  textShadow: [
                    "0 0 10px #6B21A8",
                    "0 0 20px #6B21A8",
                    "0 0 10px #6B21A8",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Intelligent Automation for Tomorrow
              </motion.span>
            </h1>

            {/* Value Proposition Section */}
            <motion.div
              className="py-8 px-6 bg-gray-900/60 rounded-xl backdrop-blur-lg border border-gray-800/50 max-w-4xl mb-12 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                  Ekono Automation Platform
                </h2>

                <div className="grid md:grid-cols-3">
                  {/* Core Capabilities */}
                  <div className="flex items-start gap-4">
                    <FiZap className="text-2xl text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-100">
                        AI-Powered Insights
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Transform raw data into actionable intelligence with our
                        deep learning engines, processing petabytes of
                        information in real-time.
                      </p>
                    </div>
                  </div>

                  {/* Security */}
                  <div className="flex items-start gap-4">
                    <FiShield className="text-2xl text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-100">
                        Enterprise Security
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Military-grade encryption and zero-trust architecture
                        ensuring compliance with global data protection
                        regulations.
                      </p>
                    </div>
                  </div>

                  {/* Scalability */}
                  <div className="flex items-start gap-4">
                    <FiCloud className="text-2xl text-purple-400 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-100">
                        Global Scalability
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        Distributed across 15 global regions with auto-scaling
                        infrastructure handling millions of requests per second.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enterprise Badge */}
                <div className="md:absolute md:top-4 md:right-4 flex items-center gap-2 bg-gray-900/80 px-2 py-1 rounded-full border border-purple-500/30 mt-4 md:mt-0">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-purple-300">
                    Trusted by Enterprises
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Interactive Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-800 to-purple-600 rounded-xl flex items-center gap-3 relative overflow-hidden"
              >
                <span className="relative z-10 text-lg">Request Demo</span>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,#6B21A880_50%,transparent_75%)] bg-[length:400%_400%] animate-shine" />
              </motion.button>
              <motion.button
                whileHover={{
                  borderColor: "#6B21A8",
                  background: "linear-gradient(to right, #00000050, #6B21A880)",
                }}
                className="px-8 py-4 border border-gray-700 rounded-xl bg-gradient-to-r from-black/50 to-black/0 transition-all"
              >
                <span className="bg-gradient-to-r from-purple-800 to-purple-600 bg-clip-text text-transparent">
                  White Paper
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* AI Core Visualization (Desktop Only) */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 hidden md:block">
            <div className="relative h-[600px]">
              {/* Concentric Rings */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 border-purple-600/20 rounded-full"
                  style={{ scale: 1 - i * 0.15 }}
                  animate={{
                    rotate: 360,
                    borderColor: [
                      "rgba(107, 33, 168, 0.2)",
                      "rgba(107, 33, 168, 0.8)",
                      "rgba(107, 33, 168, 0.2)",
                    ],
                  }}
                  transition={{
                    duration: 12 + i * 3,
                    repeat: Infinity,
                    ease: [0, (i * i) / 25.0, 0.71, 1.01],
                  }}
                />
              ))}
              {/* Pulsing Core */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-48 h-48 bg-gradient-to-r from-purple-800 to-purple-600 rounded-full"
                  animate={{
                    rotate: 360,
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00000000_60%,#6B21A880_100%)]" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
        {/* Radar Scan Line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-[linear-gradient(to_right,transparent_0%,#6B21A880_50%,transparent_100%)]"
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </section>

      {/* Features Section */}
      <section className="py-28 relative">
        <motion.div
          style={{ y: y1 }}
          className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-black/90 to-transparent pointer-events-none"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-black/90 to-transparent pointer-events-none"
        />
        <div className="container mx-auto px-4 grid gap-8 sm:grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: <FiZap />,
              title: "Quantum Processing",
              desc: "Exascale computational power",
            },
            {
              icon: <FiShield />,
              title: "Zero Trust Security",
              desc: "Military-grade encryption",
            },
            {
              icon: <FiCloud />,
              title: "Global Cloud Mesh",
              desc: "12 regional hyperscale clusters",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="p-8 bg-black/50 backdrop-blur-lg rounded-2xl border border-gray-800 relative overflow-hidden"
              whileHover={{
                y: -10,
                borderColor: "#6B21A8",
                boxShadow: "0 20px 40px -10px rgba(107, 33, 168, 0.2)",
              }}
            >
              <div className="relative z-10">
                <div className="text-4xl mb-6 text-purple-500">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Benefits Showcase */}
      <section className="py-28">
        <motion.div
          className="p-8 bg-gray-900/60 rounded-xl backdrop-blur-lg border border-gray-800/50 max-w-4xl mx-auto mb-12 relative overflow-hidden"
          whileHover={{ scale: 1.01 }}
        >
          <div className="relative z-10">
            <div className="flex gap-6 flex-wrap justify-between">
              {/* Benefit 1 */}
              <motion.div
                className="flex-1 min-w-[300px] p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/20 rounded-lg border border-gray-800/50"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(109, 40, 217, 0.3)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <FiZap className="text-3xl text-purple-400" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    Peak Performance
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    99.999% Uptime SLA
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Sub-2ms Response Times
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Petabyte-Scale Processing
                  </li>
                </ul>
              </motion.div>

              {/* Benefit 2 */}
              <motion.div
                className="flex-1 min-w-[300px] p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/20 rounded-lg border border-gray-800/50"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(109, 40, 217, 0.3)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <FiShield className="text-3xl text-blue-400" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    Ironclad Security
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    Zero Trust Architecture
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    Military-Grade Encryption
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    SOC 2 Type II Certified
                  </li>
                </ul>
              </motion.div>

              {/* Benefit 3 */}
              <motion.div
                className="flex-1 min-w-[300px] p-6 bg-gradient-to-br from-purple-900/30 to-blue-900/20 rounded-lg border border-gray-800/50"
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 30px -10px rgba(109, 40, 217, 0.3)",
                }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <FiActivity className="text-3xl text-purple-400" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                    Global Scale
                  </h3>
                </div>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    15 Global Regions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Multi-Cloud Hybrid Deployments
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    Auto-Scaling Infrastructure
                  </li>
                </ul>
              </motion.div>
            </div>
            {/* Enterprise Badge */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-gray-900/80 px-4 py-2 rounded-full border border-purple-500/30">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-purple-300">
                Enterprise Grade
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Neural Network Visualization */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="p-6 md:p-12 lg:p-16 bg-black/50 backdrop-blur-lg rounded-3xl border border-gray-800/60 relative overflow-hidden group">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/circuit.png')] opacity-10 animate-pan" />
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-blue-900/10" />

            {/* Floating Particles */}
            {/*{[...Array(10)].map((_, i) => {
              const randomX = Math.random() * 100; // 0-100% of container width
              const randomY = Math.random() * 100; // 0-100% of container height
              const randomDelay = Math.random() * 2;
              const randomDuration = 2 + Math.random() * 3;
              const randomSize = 0.5 + Math.random() * 10; // 0.5-2px

              return (
                <motion.div
                  key={`particle-${i}`}
                  className="absolute w-1 h-1 bg-purple-400 rounded-full"
                  style={{
                    left: `${randomX}%`,
                    top: `${randomY}%`,
                    width: `${randomSize}px`,
                    height: `${randomSize}px`,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0, 1, 0],
                    x: ["-50%", "-50%"], // Center horizontally
                    y: ["-50%", "-50%"], // Center vertically
                  }}
                  transition={{
                    duration: randomDuration,
                    repeat: Infinity,
                    delay: randomDelay,
                    ease: "easeInOut",
                  }}
                />
              );
            })}*/}

            <div className="relative z-10 flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-center">
              {/* Text Content */}
              <motion.div
                className="md:w-1/2 space-y-6"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
                  whileInView={{
                    textShadow: "0 0 20px rgba(168, 85, 247, 0.5)",
                  }}
                  transition={{ duration: 1 }}
                >
                  Quantum Neural Core
                </motion.h2>

                <div className="space-y-4 text-gray-300">
                  <motion.p
                    className="text-lg leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Our{" "}
                    <span className="text-purple-400 font-medium">
                      11th-gen neural architecture
                    </span>{" "}
                    features dynamic pathway optimization and real-time quantum
                    entanglement processing.
                  </motion.p>

                  <motion.div
                    className="p-4 bg-black/30 rounded-xl border border-purple-900/50"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center gap-3">
                      <FiZap className="text-purple-400 text-xl flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        <span className="block font-bold text-purple-300">
                          12.7B Parameters
                        </span>
                        <span className="text-gray-400">
                          Active learning nodes
                        </span>
                      </span>
                    </div>
                  </motion.div>

                  <motion.button
                    className="flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
                    whileHover={{ x: 5 }}
                  >
                    <span>Technical White Paper</span>
                    <FiChevronRight className="text-lg" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Neural Visualization */}
              <motion.div
                className="w-full md:w-1/2 aspect-square relative"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                animate={{
                  rotate: 360,
                }}
              >
                {/* Central Core */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onHoverStart={() => setCoreHovered(true)}
                  onHoverEnd={() => setCoreHovered(false)}
                >
                  <motion.div
                    className="w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full relative"
                    animate={{
                      scale: coreHovered ? 1.1 : [1, 1.05, 1],
                      rotate: 360,
                    }}
                    transition={{
                      scale: { duration: 0.3 },
                      rotate: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      },
                    }}
                  >
                    <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,#ffffff10_0%,transparent_60%)] animate-rotate" />
                    <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#6B21A800_0%,#6B21A8_25%,#6B21A800_50%)] opacity-40 animate-shimmer" />
                  </motion.div>
                </motion.div>

                {/* Neural Connections */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"
                    style={{
                      width: "60%",
                      left: "20%",
                      top: "50%",
                      rotate: i * 30,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    whileInView={{
                      opacity: [0.2, 0.8, 0.2],
                      scaleX: 1,
                    }}
                    transition={{
                      duration: 2 + i * 0.3,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,#ffffff30_50%,transparent_100%)] animate-flow" />
                  </motion.div>
                ))}

                {/* Floating Nodes */}
                {[...Array(6)].map((_, i) => {
                  const { xOffset, yOffset, rotation } = nodesRef.current[i];

                  return (
                    <motion.div
                      key={`node-${i}`}
                      className="absolute w-4 h-4 bg-purple-400 rounded-full"
                      style={{
                        left: `${50 + Math.cos((i * 60 * Math.PI) / 180) * 30 + xOffset}%`,
                        top: `${50 + Math.sin((i * 60 * Math.PI) / 180) * 30 + yOffset}%`,
                      }}
                      animate={{
                        y: [-5, 5, -5],
                        scale: [1, 1.2, 1],
                        rotate: rotation,
                      }}
                      transition={{
                        duration: 2 + i,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}

                {/* Hover Effect */}
                {/*<motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{
                    background: coreHovered
                      ? `radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1), transparent 70%)`
                      : "transparent",
                  }}
                  transition={{ duration: 0.3 }}
                />*/}
              </motion.div>
            </div>

            {/* Scanning Beam */}
            <motion.div
              className="absolute left-0 right-0 h-px bg-[linear-gradient(to_right,transparent_0%,#6B21A880_50%,transparent_100%)]"
              animate={{ y: ["-100%", "100%"] }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
