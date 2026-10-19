import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Cpu, Activity } from 'lucide-react';

const Navbar = ({ onOpenTerminal, onOpenAdmin, matrixColor, setMatrixColor }) => {
  const [latency, setLatency] = useState(24);
  const [memory, setMemory] = useState(14.2);

  useEffect(() => {
    const timer = setInterval(() => {
      setLatency(Math.floor(16 + Math.random() * 12));
      setMemory(Number((13.8 + Math.random() * 1.5).toFixed(2)));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#020205]/90 backdrop-blur-md border-b border-cyber-border font-orbitron text-xs">
      {/* Top HUD Telemetry Strip */}
      <div className="hidden md:flex justify-between items-center px-6 py-1.5 border-b border-white/5 text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-green shadow-glow-green animate-pulse" />
          <span>HOST: <strong className="text-cyber-cyan">MAKAUT_NODE.04</strong></span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1">
            <Activity className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>LATENCY: <strong className="text-cyber-cyan">{latency}ms</strong></span>
          </div>
          <div className="flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-cyber-pink" />
            <span>MEM_ALLOC: <strong className="text-cyber-pink">{memory} GB</strong></span>
          </div>
          <span className="text-gray-500">MERN_ARCH: <strong className="text-white">v4.0.0-PROD</strong></span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="text-cyber-cyan font-black text-lg tracking-wider group-hover:text-glow-cyan transition-all">
            GOUTAM<span className="text-cyber-pink">.DEV</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded border border-cyber-cyan/40 text-cyber-cyan hidden sm:inline">
            SYS_ARCH
          </span>
        </a>

        {/* Center Nav Links */}
        <div className="hidden lg:flex items-center gap-6 text-gray-300 font-rajdhani text-sm font-semibold tracking-wider">
          <a href="#about" className="hover:text-cyber-cyan transition-colors">ABOUT</a>
          <a href="#skills" className="hover:text-cyber-cyan transition-colors">SKILLS</a>
          <a href="#projects" className="hover:text-cyber-cyan transition-colors">PROJECTS</a>
          <a href="#achievements" className="hover:text-cyber-cyan transition-colors">ACHIEVEMENTS</a>
          <a href="#contact" className="hover:text-cyber-cyan transition-colors">CONTACT</a>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Matrix theme switcher */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded bg-black/40 border border-white/10">
            <button
              onClick={() => setMatrixColor('#00f3ff')}
              aria-label="Cyan Matrix"
              className={`w-3 h-3 rounded-full bg-cyan-400 transition-transform ${matrixColor === '#00f3ff' ? 'scale-125 ring-2 ring-cyan-300' : 'opacity-60'}`}
            />
            <button
              onClick={() => setMatrixColor('#ff00ff')}
              aria-label="Pink Matrix"
              className={`w-3 h-3 rounded-full bg-pink-500 transition-transform ${matrixColor === '#ff00ff' ? 'scale-125 ring-2 ring-pink-300' : 'opacity-60'}`}
            />
            <button
              onClick={() => setMatrixColor('#39ff14')}
              aria-label="Green Matrix"
              className={`w-3 h-3 rounded-full bg-green-400 transition-transform ${matrixColor === '#39ff14' ? 'scale-125 ring-2 ring-green-300' : 'opacity-60'}`}
            />
          </div>

          {/* Interactive Terminal Trigger */}
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-semibold transition-all neo-clip"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TERMINAL</span>
          </button>

          {/* Admin Dashboard Trigger */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-black font-semibold transition-all neo-clip"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ADMIN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
