import React, { useState } from 'react';
import { Database, Server, Smartphone, Cpu, Cloud, ShieldCheck, Activity, Layers, ArrowRight, Zap } from 'lucide-react';

const SystemDiagram = ({ type = 'mern', title = 'System Architecture' }) => {
  const [activeNode, setActiveNode] = useState(null);

  if (type === 'ai_mobile') {
    const mobileNodes = [
      { id: 'cam', label: 'Camera / Sensor Feed', sub: '30 FPS Frame Capture', icon: Smartphone, color: 'text-cyber-cyan', border: 'border-cyber-cyan' },
      { id: 'prep', label: 'OpenCV Preprocessor', sub: 'Grayscale & Tensor Normalization', icon: Cpu, color: 'text-cyber-green', border: 'border-cyber-green' },
      { id: 'model', label: 'INT8 Quantized TFLite', sub: 'Edge Model (<45ms Inference)', icon: Zap, color: 'text-cyber-pink', border: 'border-cyber-pink' },
      { id: 'out', label: 'Android View / Room DB', sub: 'Reactive UI & Local Storage', icon: Database, color: 'text-cyber-cyan', border: 'border-cyber-cyan' },
    ];

    return (
      <div className="w-full bg-[#050711] border border-cyber-cyan/30 rounded p-4 font-orbitron">
        <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
          <div className="flex items-center gap-2 text-xs text-cyber-cyan">
            <Layers className="w-4 h-4" />
            <span>EDGE_AI_PIPELINE // OFFLINE_NEURAL_TOPOLOGY</span>
          </div>
          <span className="text-[10px] text-cyber-green flex items-center gap-1 font-mono">
            <Activity className="w-3 h-3 animate-pulse" /> LATENCY: ~45ms
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
          {mobileNodes.map((node, index) => {
            const Icon = node.icon;
            const isHovered = activeNode === node.id;
            return (
              <div
                key={node.id}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
                className={`relative p-3 rounded bg-black/60 border ${node.border} transition-all duration-300 ${
                  isHovered ? 'scale-105 shadow-glow-cyan bg-cyan-950/20' : 'opacity-90'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${node.color}`} />
                  <span className="text-[9px] font-mono text-gray-500">STAGE 0{index + 1}</span>
                </div>
                <h5 className="text-xs font-bold text-white mb-1 font-orbitron">{node.label}</h5>
                <p className="text-[10px] font-rajdhani text-gray-400">{node.sub}</p>

                {index < 3 && (
                  <div className="hidden md:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#020205] border border-white/20 items-center justify-center text-gray-400">
                    <ArrowRight className="w-3 h-3 text-cyber-cyan" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-2.5 rounded bg-black/40 border border-white/5 text-[11px] font-mono text-gray-400 flex flex-wrap justify-between items-center gap-2">
          <span>PIPELINE SPECS: Zero-Cloud Dependency &bull; Real-time Camera Frame Buffer &bull; 100% On-Device Privacy</span>
          <span className="text-cyber-green font-bold">STATUS: VERIFIED</span>
        </div>
      </div>
    );
  }

  const mernNodes = [
    {
      id: 'client',
      title: 'Reactive Frontend SPA',
      tech: 'React 18 + Vite + Tailwind',
      duty: 'Component Tree, State & HTTP Interceptors',
      icon: Smartphone,
      color: 'border-cyber-cyan text-cyber-cyan',
    },
    {
      id: 'gateway',
      title: 'Express REST Gateway',
      tech: 'Node.js V8 Non-blocking',
      duty: 'Routing, Helmet, CORS, Rate Limiters',
      icon: Server,
      color: 'border-cyber-green text-cyber-green',
    },
    {
      id: 'security',
      title: 'Auth & Data Middleware',
      tech: 'JWT + BCrypt + Zod/Mongoose',
      duty: 'Role Validation, Sanitization, Error Boundary',
      icon: ShieldCheck,
      color: 'border-cyber-pink text-cyber-pink',
    },
    {
      id: 'storage',
      title: 'Persistence & Integrations',
      tech: 'MongoDB Atlas + Stripe Webhooks',
      duty: 'Document Store, ACID Sessions, Webhooks',
      icon: Database,
      color: 'border-cyber-cyan text-cyber-cyan',
    },
  ];

  return (
    <div className="w-full bg-[#050711] border border-cyber-cyan/30 rounded p-4 font-orbitron">
      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
        <div className="flex items-center gap-2 text-xs text-cyber-cyan">
          <Server className="w-4 h-4" />
          <span>FULLSTACK_MERN // CLUSTER_ARCHITECTURE_DIAGRAM</span>
        </div>
        <span className="text-[10px] text-cyber-green flex items-center gap-1 font-mono">
          <Activity className="w-3 h-3 animate-pulse" /> NON-BLOCKING V8 ENGINE
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {mernNodes.map((node, index) => {
          const Icon = node.icon;
          const isHovered = activeNode === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`relative p-3.5 rounded bg-black/70 border ${node.color} transition-all duration-300 ${
                isHovered ? 'scale-105 shadow-glow-cyan bg-cyan-950/25' : 'opacity-95'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-4 h-4" />
                <span className="text-[9px] font-mono text-gray-500">LAYER 0{index + 1}</span>
              </div>
              <h5 className="text-xs font-bold text-white mb-1 font-orbitron">{node.title}</h5>
              <div className="text-[10px] font-mono text-cyber-pink mb-1">{node.tech}</div>
              <p className="text-[10px] font-rajdhani text-gray-300 leading-tight">{node.duty}</p>

              {index < 3 && (
                <div className="hidden lg:flex absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 w-5 h-5 rounded-full bg-[#020205] border border-white/20 items-center justify-center text-gray-400">
                  <ArrowRight className="w-3 h-3 text-cyber-cyan" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 rounded bg-black/50 border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-[11px] font-mono text-gray-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
          <span>DATA FLOW: Client HTTP &rarr; SSL Termination &rarr; Express Middleware &rarr; Mongoose ODM &rarr; Replica Set</span>
        </div>
        <div className="text-cyber-cyan font-orbitron text-[10px] uppercase">
          IDEMPOTENT &bull; JWT ROTATION &bull; ACID TRANSACTIONS
        </div>
      </div>
    </div>
  );
};

export default SystemDiagram;
