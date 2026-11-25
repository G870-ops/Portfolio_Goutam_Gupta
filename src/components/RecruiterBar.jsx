import React, { useState, useEffect } from 'react';
import { Mail, FileText, Send, Check, Copy, Activity, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';
import { trackEvent, getAnalyticsCounts } from '../utils/analytics';

const RecruiterBar = ({ onOpenResume, onHireClick }) => {
  const [copied, setCopied] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [counts, setCounts] = useState({ project_views: 0, resume_downloads: 0 });

  useEffect(() => {
    const updateStats = () => {
      const recorded = getAnalyticsCounts();
      setCounts({
        project_views: (recorded.project_card_view || 0) + (recorded.case_study_opened || 0),
        resume_downloads: (recorded.resume_downloaded || 0) + (recorded.resume_preview_opened || 0),
      });
    };

    updateStats();
    window.addEventListener('portfolio_telemetry_event', updateStats);
    return () => window.removeEventListener('portfolio_telemetry_event', updateStats);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('goutamgupta605@gmail.com');
    setCopied(true);
    trackEvent('email_copied_from_recruiter_bar', { email: 'goutamgupta605@gmail.com' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenResume = () => {
    trackEvent('resume_preview_opened', { source: 'recruiter_bar' });
    if (onOpenResume) onOpenResume();
  };

  return (
    <aside aria-label="Recruiter quick access bar" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-4xl w-[94%] sm:w-auto">
      <div className="glass-panel rounded-full px-3 sm:px-5 py-2.5 shadow-2xl border border-cyber-cyan/50 backdrop-blur-xl flex items-center justify-between gap-3 sm:gap-5 transition-all duration-300">
        <div className="hidden lg:flex items-center gap-2 pr-3 border-r border-white/10 text-xs font-orbitron">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-ping" />
          <span className="text-cyber-cyan font-bold tracking-wider">RECRUITER_HUD</span>
          <span className="text-[10px] text-gray-500 font-mono">
            ACT: {counts.project_views + counts.resume_downloads}
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-1 sm:flex-initial justify-center">
          <button
            onClick={handleCopyEmail}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-orbitron font-semibold tracking-wider transition-all neo-clip ${
              copied
                ? 'bg-cyber-green text-black shadow-glow-green'
                : 'bg-black/60 border border-white/20 text-gray-200 hover:text-cyber-cyan hover:border-cyber-cyan'
            }`}
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-cyber-cyan" />}
            <span>{copied ? 'EMAIL COPIED' : 'COPY EMAIL'}</span>
          </button>

          <button
            onClick={handleOpenResume}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyber-cyan text-black hover:bg-white text-xs font-orbitron font-bold tracking-wider shadow-glow-cyan transition-all neo-clip"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>RESUME DOSSIER</span>
          </button>

          <a
            href="#contact"
            onClick={onHireClick}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-cyber-pink text-cyber-pink hover:bg-cyber-pink hover:text-black text-xs font-orbitron font-bold tracking-wider shadow-glow-pink transition-all neo-clip"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">TRANSMIT INQUIRY</span>
            <span className="sm:hidden">CONTACT</span>
          </a>
        </div>

        <div className="hidden md:flex items-center gap-2 pl-2 text-[10px] font-mono text-gray-400">
          <Sparkles className="w-3 h-3 text-yellow-400" />
          <span>FAST-TRACK HIRING ACCESS</span>
        </div>
      </div>
    </aside>
  );
};

export default RecruiterBar;
