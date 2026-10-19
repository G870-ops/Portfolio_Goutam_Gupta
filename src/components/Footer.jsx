import React from 'react';
import { ShieldCheck, Cpu, Terminal } from 'lucide-react';

const Footer = ({ onOpenTerminal, onOpenAdmin }) => {
  return (
    <footer className="mt-20 border-t border-cyber-border bg-black/80 py-12 px-4 text-center font-orbitron text-xs text-gray-500 relative z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand Copyright */}
        <div className="text-left">
          <p className="text-gray-300 font-bold tracking-wider mb-1">
            © {new Date().getFullYear()} GOUTAM GUPTA • FULL-STACK DEVELOPER v4.0
          </p>
          <p className="text-[11px] text-gray-500 font-rajdhani">
            Kalyani Government Engineering College (KGEC) • Purulia Polytechnic
          </p>
        </div>

        {/* Telemetry Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-black/50 border border-cyber-green/30 text-cyber-green text-[11px]">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>SYSTEM: ONLINE • 100% OPERATIONAL INTEGRITY</span>
        </div>

        {/* Quick Shell & Admin links */}
        <div className="flex items-center gap-4 text-[11px]">
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-1 text-cyber-cyan hover:underline"
          >
            <Terminal className="w-3 h-3" />
            <span>SHELL_CONSOLE</span>
          </button>
          <span>|</span>
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1 text-cyber-pink hover:underline"
          >
            <Cpu className="w-3 h-3" />
            <span>SYS_ADMIN</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
