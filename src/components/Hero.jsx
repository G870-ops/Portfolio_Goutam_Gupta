import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Github, Linkedin, Download, Send, CheckCircle2, FileText } from 'lucide-react';
import profileImage from '../assets/profile.jpg';

const titles = [
  'Full-Stack MERN Developer',
  'System Architect v4.0',
  'Android App Engineer',
  'API & Cloud Specialist',
];

const Hero = ({ onHireClick }) => {
  const [titleIndex, setTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [bioScanning, setBioScanning] = useState(false);
  const [bioStatus, setBioStatus] = useState('SECURED_HASH_PASS');

  // Typewriter effect loop
  useEffect(() => {
    const currentFullText = titles[titleIndex];
    let timeout;

    if (!isDeleting && displayText === currentFullText) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      const speed = isDeleting ? 40 : 80;
      timeout = setTimeout(() => {
        setDisplayText(
          currentFullText.substring(0, displayText.length + (isDeleting ? -1 : 1))
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, titleIndex]);

  const handleBioScan = () => {
    setBioScanning(true);
    setBioStatus('SCANNING_HASH...');
    setTimeout(() => {
      setBioScanning(false);
      setBioStatus('VERIFIED_GOUTAM_GUPTA_');
    }, 1200);
  };

  return (
    <section id="hero" className="min-h-screen relative flex items-center justify-center pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Profile Avatar with Neon Hex Halo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6 group cursor-pointer"
          onClick={handleBioScan}
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyber-cyan via-cyber-pink to-cyber-green opacity-75 blur-md group-hover:opacity-100 group-hover:blur-lg transition duration-500 animate-pulse" />
          <img
            src={profileImage || "/profile.jpg"}
            alt="Goutam Gupta"
            className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full object-cover border-2 border-cyber-cyan shadow-glow-cyan transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute bottom-1 right-1 bg-cyber-dark/90 px-2 py-0.5 rounded-full border border-cyber-green text-[10px] font-orbitron text-cyber-green flex items-center gap-1 shadow-glow-green">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
            READY
          </div>
        </motion.div>

        {/* Glitch Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-orbitron text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-wider text-cyber-cyan text-glow-cyan mb-2"
        >
          Goutam Gupta
        </motion.h1>

        {/* Dynamic Typewriter Subtitle */}
        <div className="h-10 flex items-center justify-center mb-6">
          <span className="font-orbitron text-lg sm:text-2xl text-cyber-pink tracking-widest uppercase">
            &gt; {displayText}
            <span className="animate-pulse text-cyber-cyan">_</span>
          </span>
        </div>

        {/* Mission Statement */}
        <p className="max-w-2xl text-gray-300 font-rajdhani text-base sm:text-lg leading-relaxed mb-8">
          Full-Stack MERN Architect & Android Developer with deep expertise in reactive frontends, asynchronous Node.js microservices, distributed MongoDB pipelines, and mission-critical edge AI applications.
        </p>

        {/* Call-to-Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <a
            href="#contact"
            onClick={onHireClick}
            className="flex items-center gap-2 px-6 py-3 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:scale-105 hover:bg-white transition-all neo-clip"
          >
            <Send className="w-4 h-4" />
            Hire Me / Transmit Inquiry
          </a>
          <a
            href="/Goutam_Gupta_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded border border-cyber-pink text-cyber-pink font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-pink hover:bg-cyber-pink hover:text-black transition-all neo-clip"
          >
            <Download className="w-4 h-4" />
            Resume PDF (ATS)
          </a>
          <a
            href="/Goutam_Gupta_Resume.docx"
            download="Goutam_Gupta_Resume.docx"
            className="flex items-center gap-2 px-6 py-3 rounded border border-cyber-cyan/50 text-cyber-cyan font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-cyber-cyan hover:text-black transition-all neo-clip"
          >
            <FileText className="w-4 h-4" />
            Resume DOCS (Word)
          </a>
        </motion.div>

        {/* Telemetry Contact Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-orbitron">
          <a
            href="mailto:goutamgupta605@gmail.com"
            className="flex items-center gap-2 px-3 py-1.5 rounded glass-panel hover:border-cyber-cyan text-gray-300 hover:text-cyber-cyan transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>goutamgupta605@gmail.com</span>
          </a>
          <a
            href="tel:8343957187"
            className="flex items-center gap-2 px-3 py-1.5 rounded glass-panel hover:border-cyber-pink text-gray-300 hover:text-cyber-pink transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-cyber-pink" />
            <span>+91 8343957187</span>
          </a>
          <a
            href="https://github.com/G870-ops"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded glass-panel hover:border-cyber-cyan text-gray-300 hover:text-cyber-cyan transition-colors"
          >
            <Github className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>G870-ops</span>
          </a>
          <a
            href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/goutam-gupta"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded glass-panel hover:border-cyber-pink text-gray-300 hover:text-cyber-pink transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5 text-cyber-pink" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Interactive Biometric Indicator */}
        <div
          onClick={handleBioScan}
          className="mt-8 flex items-center gap-3 px-4 py-2 rounded border border-cyber-border bg-black/40 cursor-pointer hover:border-cyber-green transition-all"
        >
          <div className={`w-3 h-3 rounded-full ${bioScanning ? 'bg-yellow-400 animate-ping' : 'bg-cyber-green shadow-glow-green'}`} />
          <span className="font-orbitron text-[11px] text-gray-400">
            BIOMETRIC STATUS: <strong className={bioScanning ? 'text-yellow-400' : 'text-cyber-green'}>{bioStatus}</strong>
          </span>
          <CheckCircle2 className="w-3.5 h-3.5 text-cyber-green" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
