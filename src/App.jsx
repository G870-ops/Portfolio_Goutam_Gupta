import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import MatrixBackground from './components/MatrixBackground';
import TerminalModal from './components/TerminalModal';
import AdminDashboard from './components/AdminDashboard';
import { projectAPI, skillAPI } from './api/client';
import { Trophy, GraduationCap, Award, ExternalLink, Smartphone } from 'lucide-react';

function App() {
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [matrixColor, setMatrixColor] = useState('#00f3ff');

  // Fallback initial data in case MongoDB is in cold boot or setup phase
  const initialFallbackProjects = [
    {
      title: 'Full Stack Food Delivery Website',
      description: 'A comprehensive, high-performance food delivery platform featuring real-time order telemetry, secure payment integrations, and an aesthetic, high-contrast user interface.',
      techStack: ['React.js', 'MongoDB', 'Express', 'Node.js', 'Stripe'],
      liveUrl: 'https://food-dev-frontend.vercel.app/',
      githubUrl: 'https://github.com/G870-ops/FOOD_DEV_FRONTEND',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'Full Stack',
      telemetryInsight: '⚡ PIPELINE: Asynchronous V8 Event Loop | PAYMENTS: Secure Stripe Gateway',
    },
    {
      title: 'Invitor (Event Booking) Web App',
      description: 'Full-stack Event Booking Management web platform featuring dynamic role-based dashboards and cross-layered API logic.',
      techStack: ['React.js', 'Vite', 'Tailwind CSS', 'Postman APIs'],
      liveUrl: 'https://event-booking-web-app-seven.vercel.app/',
      githubUrl: 'https://github.com/G870-ops/Event_Booking_WebApp',
      imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'Full Stack',
      telemetryInsight: '⚡ PIPELINE: React + Vite Execution Core | INTERFACE: Tailwind Utility Classes',
    },
    {
      title: 'PBIS App (Pig Breed Identification)',
      description: 'Real-time pig breed identification using TFLite and OpenCV with up to 100% accuracy and mobile camera edge inference.',
      techStack: ['AI/ML', 'TFLite', 'OpenCV', 'Android Studio'],
      liveUrl: 'https://github.com/G870-ops',
      githubUrl: 'https://github.com/G870-ops',
      imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'AI/ML',
      telemetryInsight: '⚡ INFERENCE_SPEED: ~45ms | MODEL: INT8 Quantized Edge Compression',
    },
    {
      title: 'Jarvis AI Assistant App',
      description: 'AI-powered voice assistant for hands-free device control, natural speech recognition, and real-time task automation.',
      techStack: ['NLP', 'Python', 'Voice AI', 'Android Intent'],
      liveUrl: 'https://github.com/G870-ops/JARVIS_AI_ASSISTANT_APP',
      githubUrl: 'https://github.com/G870-ops/JARVIS_AI_ASSISTANT_APP',
      imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'AI/ML',
      telemetryInsight: '⚡ PIPELINE: Async Subprocesses | ENGINES: Offline STT Engines',
    },
    {
      title: 'FlatBookingApp (StudentStay)',
      description: 'Housing accommodation platform featuring dual role-based access architectures for landlords and students.',
      techStack: ['Android Studio', 'Firebase Auth', 'Kotlin', 'Cloud Firestore'],
      liveUrl: 'https://github.com/G870-ops',
      githubUrl: 'https://github.com/G870-ops',
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'Mobile / Android',
      telemetryInsight: '⚡ AUTH_LATENCY: ~12ms sync | ROUTING: Role-Based Native Gateways',
    },
    {
      title: 'Stack Market App',
      description: 'Full-stack productivity workspace organizing enterprise project workflows with real-time tracking metrics.',
      techStack: ['React.js', 'Spring Boot', 'MySQL', 'Tailwind CSS'],
      liveUrl: 'https://github.com/G870-ops/Stock_Market_App',
      githubUrl: 'https://github.com/G870-ops/Stock_Market_App',
      imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'Full Stack',
      telemetryInsight: '⚡ REST_PIPELINE: Non-blocking I/O | FRONTEND: High-Velocity Vite Bundler',
    },
    {
      title: 'Sci-Fi Scientific Calculator',
      description: 'Advanced Android calculator app featuring an interstellar neon UI, modular matrix solver, complex functions, and statistical conversions.',
      techStack: ['Android Studio', 'Java', 'XML', 'Material Design'],
      liveUrl: 'https://github.com/G870-ops/Scientifc_calculator_project',
      githubUrl: 'https://github.com/G870-ops/Scientifc_calculator_project',
      apkUrl: 'https://github.com/G870-ops/Scientifc_calculator_project/releases/download/v1.0.0/SciFi_Calculator_v1.0.apk',
      imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?q=80&w=1200&auto=format&fit=crop',
      featured: true,
      category: 'Mobile / Android',
      telemetryInsight: '⚡ RENDER: Native XML Layouts | MATH_ENGINE: Java BigDecimal Precision Core',
    },
  ];

  const fetchProjects = async () => {
    try {
      const res = await projectAPI.getAll();
      if (res.data?.data && res.data.data.length > 0) {
        setProjects(res.data.data);
      } else {
        setProjects(initialFallbackProjects);
      }
    } catch (err) {
      console.warn('[API NOTICE] Backend not connected yet, using verified offline cache.', err.message);
      setProjects(initialFallbackProjects);
    } finally {
      setLoadingProjects(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await skillAPI.getAll();
      if (res.data?.data && res.data.data.length > 0) {
        setSkills(res.data.data);
      }
    } catch (err) {
      console.warn('[API NOTICE] Using built-in skill matrix.', err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-[#020205] text-[#e5e5e5] relative selection:bg-cyan-500 selection:text-black">
      {/* Background Matrix Canvas */}
      <MatrixBackground color={matrixColor} />

      {/* Fixed Navbar with HUD Telemetry */}
      <Navbar
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        matrixColor={matrixColor}
        setMatrixColor={setMatrixColor}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero onHireClick={() => { }} />

        {/* About Section */}
        <section id="about" className="py-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
              SYSTEM_PROFILE
            </h2>
            <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
            <span className="font-orbitron text-xs text-cyber-green hidden sm:inline">
              NODE_INFO_VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded hover:border-cyber-cyan transition-colors">
              <h3 className="font-orbitron text-base font-bold text-cyber-cyan mb-2">
                Core Specialization
              </h3>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">
                Full-Stack MERN Architecture (React, Node, Express, MongoDB Atlas), RESTful Microservices, Real-Time WebSockets, and Cloud Deployments.
              </p>
            </div>

            <div className="glass-panel p-6 rounded hover:border-cyber-pink transition-colors">
              <h3 className="font-orbitron text-base font-bold text-cyber-pink mb-2">
                Edge AI & Mobile Engineering
              </h3>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">
                Android Native Engineering (Java & Kotlin), TensorFlow Lite Edge Computer Vision, Python Voice Automation (Jarvis), and Firebase Realtime sync.
              </p>
            </div>

            <div className="glass-panel p-6 rounded hover:border-cyber-green transition-colors">
              <h3 className="font-orbitron text-base font-bold text-cyber-green mb-2">
                Engineering Tenets
              </h3>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed">
                Deterministic performance, 0ms input lag, modular code separation, defense-in-depth security headers, and human-centric UX design.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Skills Grid */}
        <Skills skills={skills} />

        {/* Dynamic Projects Grid */}
        <Projects projects={projects} loading={loadingProjects} />

        {/* Achievements Section */}
        <section id="achievements" className="py-20 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
              MISSION_ACCOMPLISHMENTS
            </h2>
            <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
            <span className="font-orbitron text-xs text-yellow-400 hidden sm:inline">
              HONORS_CONFIRMED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded hover:border-yellow-400/60 transition-colors">
              <div className="flex items-center gap-2 text-yellow-400 font-orbitron font-bold text-sm mb-2">
                <Trophy className="w-4 h-4" />
                <span>ROBO FIGHT COMPETITION</span>
              </div>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed mb-3">
                Secured 3rd Position representing Purulia Polytechnic in a high-intensity tactical robotics engineering matchup.
              </p>
              <span className="text-[10px] font-mono text-gray-500">Tier-3 Podium • Hardware Combat</span>
            </div>

            <div className="glass-panel p-6 rounded hover:border-cyber-cyan/60 transition-colors">
              <div className="flex items-center gap-2 text-cyber-cyan font-orbitron font-bold text-sm mb-2">
                <Award className="w-4 h-4" />
                <span>WBJELET EXAMINATION</span>
              </div>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed mb-3">
                Achieved elite status placement in the West Bengal State Joint Entrance evaluation matrix.
              </p>
              <div className="font-orbitron text-xs text-cyber-cyan font-semibold">
                General Rank: 170 | OBC Rank: 26
              </div>
            </div>

            <div className="glass-panel p-6 rounded hover:border-cyber-pink/60 transition-colors">
              <div className="flex items-center gap-2 text-cyber-pink font-orbitron font-bold text-sm mb-2">
                <GraduationCap className="w-4 h-4" />
                <span>PROFESSIONAL CERTIFICATION</span>
              </div>
              <p className="text-gray-300 font-rajdhani text-sm leading-relaxed mb-3">
                Successfully audited and verified for full comprehensive systems framework deployment and full-stack web architectures.
              </p>
              <span className="text-[10px] font-mono text-gray-500">Udemy Certified • 100% Curriculum Sync</span>
            </div>
          </div>
        </section>

        {/* Academic Records */}
        <section id="academic" className="py-12 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
              ACADEMIC_LOGS
            </h2>
            <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
          </div>

          <div className="glass-panel rounded overflow-x-auto border border-white/10">
            <table className="w-full text-left font-rajdhani text-sm">
              <thead className="bg-black/60 border-b border-cyber-cyan/30 text-cyber-cyan font-orbitron text-xs">
                <tr>
                  <th className="py-3 px-4">QUALIFICATION</th>
                  <th className="py-3 px-4">INSTITUTE / BOARD</th>
                  <th className="py-3 px-4">YEAR</th>
                  <th className="py-3 px-4">SCORE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-semibold text-white">B. Tech in Information Technology</td>
                  <td className="py-3 px-4 text-gray-400">KGEC (M.A.K.A.U.T)</td>
                  <td className="py-3 px-4 text-cyber-cyan font-mono">2026</td>
                  <td className="py-3 px-4 text-cyber-green font-mono font-bold">6.61 CGPA</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-semibold text-white">Diploma in ETCE</td>
                  <td className="py-3 px-4 text-gray-400">Purulia Polytechnic (W.B.S.C.T.E)</td>
                  <td className="py-3 px-4 text-cyber-cyan font-mono">2023</td>
                  <td className="py-3 px-4 text-cyber-green font-mono font-bold">79.9%</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-semibold text-white">Higher Secondary (10+2)</td>
                  <td className="py-3 px-4 text-gray-400">Sodepur Colliery High School (W.B.C.H.S.E)</td>
                  <td className="py-3 px-4 text-cyber-cyan font-mono">2020</td>
                  <td className="py-3 px-4 text-cyber-green font-mono font-bold">84.4%</td>
                </tr>
                <tr className="hover:bg-white/[0.02]">
                  <td className="py-3 px-4 font-semibold text-white">Secondary Education (10th)</td>
                  <td className="py-3 px-4 text-gray-400">Sodepur Colliery High School (W.B.B.S.E)</td>
                  <td className="py-3 px-4 text-cyber-cyan font-mono">2018</td>
                  <td className="py-3 px-4 text-cyber-green font-mono font-bold">59.86%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Dynamic Contact Form Section */}
        <Contact />
      </main>

      {/* Terminal CLI Modal */}
      <TerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        projects={projects}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        onProjectUpdated={fetchProjects}
        onSkillsUpdated={fetchSkills}
      />

      {/* Footer */}
      <Footer
        onOpenTerminal={() => setTerminalOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
      />
    </div>
  );
}

export default App;
