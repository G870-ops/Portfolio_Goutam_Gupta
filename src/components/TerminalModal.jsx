import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft } from 'lucide-react';
import { telemetryAPI } from '../api/client';

const TerminalModal = ({ isOpen, onClose, projects = [] }) => {
  const [history, setHistory] = useState([
    { text: '⚡ CORE_SYSTEM_SHELL v4.0.0-PROD initialized.', color: 'text-cyber-cyan' },
    { text: 'Diagnostic link verified. Authorization: GUEST_MODE.', color: 'text-cyber-green' },
    { text: "Type 'help' to audit system capabilities or 'health' to query live backend.", color: 'text-gray-400' },
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isOpen]);

  if (!isOpen) return null;

  const handleCommand = async (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `goutam@root:~$ ${inputVal}`, color: 'text-white' }];

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmd === 'exit' || cmd === 'quit') {
      onClose();
      setInputVal('');
      return;
    } else if (cmd === 'help') {
      newHistory.push({
        text: "Available commands: 'about', 'skills', 'projects', 'achievements', 'academic', 'health', 'contact', 'clear', 'exit'",
        color: 'text-cyber-pink',
      });
    } else if (cmd === 'about') {
      newHistory.push({
        text: 'Goutam Gupta - Full Stack MERN Architect & Android App Developer. Graduated with B.Tech IT from KGEC (MAKAUT). Specialists in reactive web ecosystems and edge AI.',
        color: 'text-gray-300',
      });
    } else if (cmd === 'skills') {
      newHistory.push({
        text: 'MERN Stack (MongoDB, Express, React, Node.js) | Languages: JavaScript, TypeScript, Java, C++, Python | Tools: Tailwind CSS, Vite, Postman, Git, Android Studio.',
        color: 'text-cyber-cyan',
      });
    } else if (cmd === 'projects') {
      const titles = projects.length > 0 ? projects.map((p) => `• ${p.title} [${p.category}]`).join('\n') : '• Food Delivery MERN • Invitor Event Booking • PBIS TFLite App • Jarvis AI Assistant';
      newHistory.push({ text: `ACTIVE CORE DEPLOYMENTS:\n${titles}`, color: 'text-cyber-green' });
    } else if (cmd === 'achievements') {
      newHistory.push({
        text: '1. Robo Fight Competition: 3rd Position Podium (Purulia Polytechnic)\n2. WBJELET Matrix: General Rank 170 | OBC Rank 26\n3. Udemy Certified Full-Stack Master',
        color: 'text-yellow-400',
      });
    } else if (cmd === 'academic') {
      newHistory.push({
        text: '• B.Tech IT - Kalyani Government Engineering College (KGEC) [2026]\n• Diploma ETCE - Purulia Polytechnic [2023, 79.9%]\n• Higher Secondary - SCHS [2020, 84.4%]\n• Secondary - SCHS [2018, 59.86%]',
        color: 'text-gray-300',
      });
    } else if (cmd === 'health') {
      newHistory.push({ text: 'Querying backend microservice /api/health...', color: 'text-cyber-cyan' });
      try {
        const res = await telemetryAPI.getHealth();
        newHistory.push({
          text: `BACKEND ONLINE: Node ${res.data.architecture} | Uptime: ${res.data.uptimeSeconds}s | RSS Memory: ${res.data.memoryUsageMB}MB`,
          color: 'text-cyber-green',
        });
      } catch (err) {
        newHistory.push({
          text: `Backend status: Offline or running in sandbox fallback mode (${err.message})`,
          color: 'text-red-400',
        });
      }
    } else if (cmd === 'contact') {
      newHistory.push({
        text: 'Direct Vector: goutamgupta605@gmail.com | Phone: +91 8343957187 | GitHub: https://github.com/G870-ops',
        color: 'text-cyber-pink',
      });
    } else {
      newHistory.push({
        text: `Command not recognized: '${cmd}'. Type 'help' to audit system commands.`,
        color: 'text-red-400',
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl h-[480px] bg-[#05060d] border border-cyber-pink rounded shadow-2xl flex flex-col font-mono text-xs overflow-hidden">
        {/* Terminal Header */}
        <div className="px-4 py-2 bg-pink-950/30 border-b border-cyber-pink/30 flex items-center justify-between text-cyber-pink font-orbitron">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-cyber-pink" />
            <span className="font-bold tracking-wider">CORE_SYSTEM_SHELL v4.0</span>
          </div>
          <button onClick={onClose} className="hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Output Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 select-text">
          {history.map((item, index) => (
            <div key={index} className={`whitespace-pre-wrap leading-relaxed ${item.color}`}>
              {item.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-black/90 border-t border-white/10 flex items-center gap-2">
          <span className="text-cyber-cyan font-bold">goutam@root:~$</span>
          <input
            type="text"
            autoFocus
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleCommand}
            placeholder="Type command ('help', 'projects', 'health', 'clear')..."
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder-gray-600"
          />
          <CornerDownLeft className="w-3.5 h-3.5 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default TerminalModal;
