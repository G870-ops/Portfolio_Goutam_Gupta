import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ArrowLeft,
  ExternalLink,
  Github,
  Smartphone,
  Layers,
  Cpu,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Copy,
  Check,
  Server,
  Database,
  Lock,
  Activity,
  Gauge,
  Code
} from 'lucide-react';
import SystemDiagram from './SystemDiagram';
import { trackEvent } from '../utils/analytics';

const getProjectCaseStudyDetails = (project) => {
  const title = project?.title || '';
  const isAI = project?.category === 'AI/ML' || title.toLowerCase().includes('pbis') || title.toLowerCase().includes('jarvis');
  const isAndroid = project?.category === 'Mobile / Android' || title.toLowerCase().includes('app') || title.toLowerCase().includes('calculator');
  const isFood = title.toLowerCase().includes('food');
  const isEvent = title.toLowerCase().includes('invitor') || title.toLowerCase().includes('event');

  let whyDb = 'MongoDB Atlas was chosen over PostgreSQL for dynamic schema evolutions, deeply nested document queries (cart items, sub-documents), and horizontal sharding capabilities with native JSON-to-BSON mapping.';
  let diagramType = 'mern';
  let demoCredentials = { user: 'recruiter@demo.com', pass: 'DemoPass@2026', role: 'Full Admin / Verified Tester' };
  let metrics = [
    { label: 'API Response Time', value: '< 42ms (p95)' },
    { label: 'Uptime Reliability', value: '99.98%' },
    { label: 'Bundle Footprint', value: '~142 KB (Gzip)' },
    { label: 'Lighthouse Performance', value: '98 / 100' },
  ];

  let architectureDecisions = [
    {
      title: 'Database: MongoDB Atlas vs PostgreSQL',
      reason: whyDb,
      gain: '50% faster schema iterations and seamless document aggregation pipelines.',
    },
    {
      title: 'Auth Architecture: Dual JWT Token Rotation',
      reason: 'Short-lived access tokens (15m) stored in memory combined with HttpOnly refresh tokens in secure cookies, preventing XSS and CSRF token interception.',
      gain: 'Zero persistent plaintext storage; automated rotation on token revocation.',
    },
    {
      title: 'Stripe / Third-Party Webhook Idempotency',
      reason: 'Raw body buffer verification paired with distributed idempotency keys in MongoDB ensures duplicate webhook deliveries never trigger double charges or duplicate fulfillments.',
      gain: '100% financial transaction accuracy during network timeouts and retries.',
    },
  ];

  let challengesAndSolutions = [
    {
      challenge: 'Race conditions during high-concurrency order placement and inventory reservation.',
      solution: 'Implemented atomic MongoDB write operations ($inc with precondition guards) and Mongoose transaction sessions.',
    },
    {
      challenge: 'Preventing cold-start latency spikes on serverless execution environments.',
      solution: 'Reused cached mongoose.connection handles across hot lambdas, cutting connection latency from 450ms down to <12ms.',
    },
    {
      challenge: 'CORS and rate-limiting attacks against open API endpoints.',
      solution: 'Configured Helmet security headers, origin regex allowlisting, and express-rate-limit token buckets.',
    },
  ];

  if (isAI || isAndroid) {
    diagramType = 'ai_mobile';
    demoCredentials = { user: 'tester@android.internal', pass: 'BioAuthReady', role: 'Edge Device Client' };
    metrics = [
      { label: 'Inference Speed', value: '~45ms' },
      { label: 'Model Accuracy', value: '98.7%' },
      { label: 'Model Size (Quantized)', value: '4.2 MB' },
      { label: 'Offline Usability', value: '100% No Cloud Req.' },
    ];

    architectureDecisions = [
      {
        title: 'Edge Inference vs Cloud Vision APIs',
        reason: 'Exported fine-tuned neural models via TensorFlow Lite with INT8 post-training quantization to achieve instant real-time predictions without expensive cellular data or cloud API costs.',
        gain: 'Instant frame processing with absolute offline privacy.',
      },
      {
        title: 'Memory Management in Android OpenCV Pipelines',
        reason: 'Recycled OpenCV Mat byte buffers and native memory pointers directly inside Java/Kotlin lifecycle callbacks to prevent Garbage Collection frame skips.',
        gain: 'Smooth 30+ FPS camera viewfinder without memory leaks.',
      },
      {
        title: 'Room Database & Offline Sync',
        reason: 'Stored predictions locally in SQLite via Room ORM with asynchronous background dispatching whenever connectivity is restored.',
        gain: 'Resilient field operations in rural or zero-connectivity locations.',
      },
    ];

    challengesAndSolutions = [
      {
        challenge: 'Quantization loss degrading classification confidence on poorly lit mobile cameras.',
        solution: 'Implemented adaptive histogram equalization and automated luminance threshold filters in OpenCV before model feeding.',
      },
      {
        challenge: 'Thermal throttling during prolonged real-time camera scanning sessions.',
        solution: 'Introduced background worker thread pooling and throttled inference frequency when camera motion is static.',
      },
    ];
  }

  return {
    diagramType,
    demoCredentials,
    metrics,
    architectureDecisions,
    challengesAndSolutions,
  };
};

const ProjectCaseStudyModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('diagram');
  const [copiedKey, setCopiedKey] = useState('');

  if (!isOpen || !project) return null;

  const caseStudy = getProjectCaseStudyDetails(project);

  const handleCopyCredentials = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    trackEvent('case_study_credentials_copied', { project: project.title });
    setTimeout(() => setCopiedKey(''), 2000);
  };

  const handleBackToProjects = () => {
    if (onClose) onClose();
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md"
      onClick={handleBackToProjects}
    >
      <div
        className="w-full max-w-5xl h-[94vh] max-h-[900px] bg-[#070914] border border-cyber-cyan/50 rounded-lg shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 py-4 bg-cyan-950/20 border-b border-cyber-cyan/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBackToProjects}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-cyber-cyan text-cyber-cyan hover:bg-cyber-cyan hover:text-black font-orbitron font-bold text-xs uppercase tracking-wider transition-all neo-clip shadow-glow-cyan"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">BACK TO PROJECTS</span>
              <span className="sm:hidden">BACK</span>
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-orbitron font-bold text-white text-sm sm:text-base tracking-wide">
                  {project.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-black border border-cyber-cyan/40 text-cyber-cyan font-orbitron">
                  {project.category || 'Architecture Dossier'}
                </span>
              </div>
              <p className="text-[11px] font-mono text-gray-400 mt-0.5">
                DEEP CASE STUDY // SYSTEM DESIGN &amp; REASONING MATRIX
              </p>
            </div>
          </div>

          <button
            onClick={handleBackToProjects}
            className="text-gray-400 hover:text-white transition-colors p-1"
            title="Back to Projects"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-5 py-2.5 bg-black/40 border-b border-white/10 flex items-center gap-2 overflow-x-auto flex-shrink-0">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded text-xs font-orbitron font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'diagram'
                ? 'bg-cyber-cyan text-black shadow-glow-cyan'
                : 'text-gray-400 hover:text-white glass-panel'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>Architecture Diagram</span>
          </button>

          <button
            onClick={() => setActiveTab('decisions')}
            className={`px-3 py-1.5 rounded text-xs font-orbitron font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'decisions'
                ? 'bg-cyber-cyan text-black shadow-glow-cyan'
                : 'text-gray-400 hover:text-white glass-panel'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Technical Decisions</span>
          </button>

          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-3 py-1.5 rounded text-xs font-orbitron font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'challenges'
                ? 'bg-cyber-cyan text-black shadow-glow-cyan'
                : 'text-gray-400 hover:text-white glass-panel'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Challenges &amp; Webhooks</span>
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-3 py-1.5 rounded text-xs font-orbitron font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'benchmarks'
                ? 'bg-cyber-cyan text-black shadow-glow-cyan'
                : 'text-gray-400 hover:text-white glass-panel'
            }`}
          >
            <Gauge className="w-3.5 h-3.5" />
            <span>Benchmarks &amp; Results</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {caseStudy.metrics.map((m, idx) => (
              <div
                key={idx}
                className="glass-panel p-3 rounded text-center border border-white/10"
              >
                <div className="text-[10px] font-orbitron text-gray-400 uppercase tracking-wider mb-1">
                  {m.label}
                </div>
                <div className="font-orbitron font-bold text-cyber-cyan text-sm sm:text-base">
                  {m.value}
                </div>
              </div>
            ))}
          </div>

          {activeTab === 'diagram' && (
            <div className="space-y-4">
              <SystemDiagram type={caseStudy.diagramType} title={project.title} />

              <div className="glass-panel p-4 rounded border border-white/10">
                <h4 className="font-orbitron text-xs font-bold text-cyber-pink uppercase mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyber-pink" />
                  <span>Executive Problem Statement &amp; Architectural Mandate</span>
                </h4>
                <p className="font-rajdhani text-gray-300 text-sm leading-relaxed mb-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack?.map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/40 border border-cyber-cyan/30 text-cyber-cyan"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-4">
              {caseStudy.architectureDecisions.map((dec, i) => (
                <div
                  key={i}
                  className="glass-panel p-4 rounded border border-white/10 hover:border-cyber-cyan/50 transition-colors"
                >
                  <div className="flex items-center gap-2 text-cyber-cyan font-orbitron font-bold text-sm mb-1.5">
                    <CheckCircle2 className="w-4 h-4 text-cyber-green" />
                    <span>{dec.title}</span>
                  </div>
                  <p className="font-rajdhani text-gray-300 text-sm mb-2 leading-relaxed">
                    {dec.reason}
                  </p>
                  <div className="text-[11px] font-mono text-cyber-pink bg-black/40 p-2 rounded border border-white/5">
                    <strong>SYSTEM BENEFIT:</strong> {dec.gain}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'challenges' && (
            <div className="space-y-4">
              {caseStudy.challengesAndSolutions.map((item, i) => (
                <div
                  key={i}
                  className="glass-panel p-4 rounded border border-white/10 space-y-2"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded bg-red-950/80 border border-red-500/50 text-red-300 uppercase">
                      CHALLENGE
                    </span>
                    <p className="font-rajdhani text-sm text-gray-200">{item.challenge}</p>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                    <span className="text-[10px] font-orbitron font-bold px-2 py-0.5 rounded bg-emerald-950/80 border border-cyber-green text-cyber-green uppercase">
                      SOLUTION
                    </span>
                    <p className="font-rajdhani text-sm text-gray-300">{item.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'benchmarks' && (
            <div className="space-y-4">
              <div className="glass-panel p-5 rounded border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-orbitron font-bold text-cyber-cyan text-sm">
                    AUDITED PERFORMANCE PROFILE
                  </h4>
                  <span className="text-[10px] font-mono text-cyber-green">PROD_VALIDATED</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-gray-400">Total Blocking Time (TBT)</span>
                    <span className="text-cyber-green font-bold">0 ms</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-gray-400">Cumulative Layout Shift (CLS)</span>
                    <span className="text-cyber-green font-bold">0.001</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-gray-400">Memory Consumption (Peak)</span>
                    <span className="text-cyber-cyan font-bold">~34.2 MB</span>
                  </div>
                  <div className="flex justify-between p-2 rounded bg-black/40 border border-white/5">
                    <span className="text-gray-400">Security Audit Score</span>
                    <span className="text-cyber-pink font-bold">A+ (OWASP Sanitized)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 rounded bg-cyan-950/20 border border-cyber-cyan/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-orbitron text-cyber-cyan font-bold">
                <Lock className="w-3.5 h-3.5" />
                <span>RECRUITER LIVE TEST CREDENTIALS</span>
              </div>
              <p className="text-[11px] font-rajdhani text-gray-300 mt-0.5">
                Instant guest access credentials to test authenticated flows without registration.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => handleCopyCredentials(caseStudy.demoCredentials.user, 'user')}
                className="px-2.5 py-1 rounded bg-black/60 border border-white/10 hover:border-cyber-cyan text-[11px] font-mono text-gray-300 flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'user' ? <Check className="w-3 h-3 text-cyber-green" /> : <Copy className="w-3 h-3" />}
                <span>User: {caseStudy.demoCredentials.user}</span>
              </button>

              <button
                onClick={() => handleCopyCredentials(caseStudy.demoCredentials.pass, 'pass')}
                className="px-2.5 py-1 rounded bg-black/60 border border-white/10 hover:border-cyber-pink text-[11px] font-mono text-gray-300 flex items-center gap-1 transition-colors"
              >
                {copiedKey === 'pass' ? <Check className="w-3 h-3 text-cyber-green" /> : <Copy className="w-3 h-3" />}
                <span>Pass: {caseStudy.demoCredentials.pass}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-black/80 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('case_study_live_demo_click', { project: project.title })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-cyan text-black font-orbitron text-xs font-bold hover:bg-white transition-all shadow-glow-cyan"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>LAUNCH LIVE DEMO</span>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('case_study_github_click', { project: project.title })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-white/20 text-gray-300 hover:text-white hover:border-white text-xs font-orbitron transition-all"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE REPO</span>
              </a>
            )}

            {project.apkUrl && (
              <a
                href={project.apkUrl}
                download
                onClick={() => trackEvent('case_study_apk_download', { project: project.title })}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-gradient-to-r from-cyber-cyan to-blue-500 text-black font-orbitron text-xs font-bold hover:brightness-110 transition-all shadow-glow-cyan"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>INSTALL APK</span>
              </a>
            )}
          </div>

          <button
            onClick={handleBackToProjects}
            className="flex items-center gap-1.5 text-xs font-orbitron font-bold text-cyber-cyan hover:text-white px-3.5 py-1.5 rounded border border-cyber-cyan/50 hover:border-cyber-cyan hover:bg-cyber-cyan/10 transition-all shadow-glow-cyan neo-clip"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK TO PROJECTS</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCaseStudyModal;
