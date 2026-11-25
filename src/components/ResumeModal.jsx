import React, { useState } from 'react';
import { X, Download, ExternalLink, Printer, Check, Copy, FileText, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

const ResumeModal = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const resumeUrl = '/Goutam_Gupta_Resume.pdf';

  if (!isOpen) return null;

  const handleDownload = () => {
    trackEvent('resume_downloaded', { file: 'Goutam_Gupta_Resume.pdf' });
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Goutam_Gupta_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('goutamgupta605@gmail.com');
    setCopied(true);
    trackEvent('email_copied_from_resume_modal', { email: 'goutamgupta605@gmail.com' });
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    trackEvent('resume_print_triggered');
    window.open(resumeUrl, '_blank')?.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-4xl h-[92vh] max-h-[850px] bg-[#070914] border border-cyber-cyan/50 rounded-lg shadow-2xl flex flex-col overflow-hidden">
        <div className="px-5 py-3.5 bg-cyan-950/20 border-b border-cyber-cyan/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-cyber-cyan font-orbitron font-bold text-xs sm:text-sm tracking-wider">
            <FileText className="w-4 h-4 text-cyber-cyan" />
            <span>RESUME_DOSSIER // GOUTAM_GUPTA_CV</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 border border-cyber-green text-cyber-green font-mono">
              <ShieldCheck className="w-3 h-3" /> VERIFIED 2026
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyEmail}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded border border-white/10 hover:border-cyber-cyan text-gray-300 hover:text-cyber-cyan text-xs font-orbitron transition-all"
              title="Copy Email"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-cyber-green" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'COPIED' : 'COPY EMAIL'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-cyber-cyan text-black hover:bg-white text-xs font-orbitron font-bold transition-all shadow-glow-cyan"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="hidden sm:flex items-center p-1.5 rounded border border-white/10 text-gray-400 hover:text-white transition-all"
              title="Open full view / Print"
            >
              <Printer className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 w-full h-full bg-black/90 p-2 sm:p-4 overflow-hidden relative">
          <iframe
            src={`${resumeUrl}#toolbar=1&navpanes=0`}
            title="Goutam Gupta Resume Preview"
            className="w-full h-full rounded border border-white/10 bg-white"
          />
        </div>

        <div className="px-5 py-2.5 bg-black/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-rajdhani text-gray-400">
          <div className="flex items-center gap-3">
            <span>Direct Vector: <strong className="text-white">goutamgupta605@gmail.com</strong></span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="hidden sm:inline">Phone: <strong className="text-cyber-pink">+91 8343957187</strong></span>
          </div>

          <div className="flex items-center gap-3 font-orbitron text-[11px]">
            <a
              href="https://github.com/G870-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-cyan hover:underline flex items-center gap-1"
            >
              <span>GITHUB</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://www.linkedin.com/in/goutam-gupta"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyber-pink hover:underline flex items-center gap-1"
            >
              <span>LINKEDIN</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
