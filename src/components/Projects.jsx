import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Zap, Filter, Layers, Smartphone } from 'lucide-react';

const Projects = ({ projects = [], loading = false }) => {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [expandedId, setExpandedId] = useState(null);

  const categories = ['ALL', 'Full Stack', 'AI/ML', 'Mobile / Android', 'Frontend'];

  const filteredProjects =
    selectedFilter === 'ALL'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const toggleInsight = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="projects" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
          CORE_DEPLOYMENTS
        </h2>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
        <span className="font-orbitron text-xs text-cyber-pink hidden sm:inline">
          LIVE_MICROSERVICES
        </span>
      </div>

      <p className="text-gray-400 font-rajdhani text-base mb-8 max-w-3xl">
        Production-grade full-stack ecosystems, edge AI integrations, and mobile architectures dynamically served from MongoDB Atlas REST pipelines.
      </p>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center gap-2 mb-10">
        <div className="flex items-center gap-1.5 text-xs font-orbitron text-gray-500 mr-2">
          <Filter className="w-3.5 h-3.5 text-cyber-cyan" />
          <span>FILTER:</span>
        </div>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1.5 rounded text-xs font-orbitron font-semibold tracking-wider transition-all neo-clip ${
              selectedFilter === cat
                ? 'bg-cyber-cyan text-black shadow-glow-cyan'
                : 'glass-panel text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="glass-panel p-6 rounded animate-pulse h-80 flex flex-col justify-between">
              <div className="w-full h-40 bg-white/5 rounded mb-4" />
              <div className="h-6 bg-white/10 rounded w-3/4 mb-2" />
              <div className="h-4 bg-white/5 rounded w-full mb-2" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
            </div>
          ))}
        </div>
      )}

      {/* Projects Grid */}
      {!loading && (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={project._id || project.title}
                className="glass-panel rounded overflow-hidden flex flex-col justify-between hover:border-cyber-cyan hover:shadow-glow-cyan transition-all duration-300 group"
              >
                <div>
                  {/* Project Image Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-black/60">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#020205] via-transparent to-transparent" />
                    
                    {/* Category Badge */}
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 border border-cyber-cyan/50 text-[10px] font-orbitron text-cyber-cyan">
                      {project.category || 'Full Stack'}
                    </span>

                    {/* Featured Star */}
                    {project.featured && (
                      <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-pink-900/80 border border-cyber-pink text-[10px] font-orbitron text-cyber-pink flex items-center gap-1 shadow-glow-pink">
                        <Zap className="w-2.5 h-2.5" />
                        FEATURED
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h3 className="font-orbitron text-lg font-bold text-white group-hover:text-cyber-cyan transition-colors mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 font-rajdhani text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack?.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded text-[11px] font-mono bg-cyan-950/40 border border-cyber-cyan/30 text-cyber-cyan"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Expandable Telemetry Insight */}
                    <div className="border-t border-white/10 pt-3">
                      <button
                        onClick={() => toggleInsight(project._id || project.title)}
                        className="text-[11px] font-orbitron text-gray-400 hover:text-cyber-cyan flex items-center gap-1.5 transition-colors"
                      >
                        <Layers className="w-3 h-3 text-cyber-cyan" />
                        <span>{expandedId === (project._id || project.title) ? 'HIDE TELEMETRY' : 'SYS_TELEMETRY INSIGHT'}</span>
                      </button>

                      {expandedId === (project._id || project.title) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 p-2.5 rounded bg-black/60 border border-dashed border-cyber-border font-mono text-[11px] text-gray-300"
                        >
                          {project.telemetryInsight || '⚡ PIPELINE: Asynchronous V8 Event Loop Pipeline'}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="px-5 py-3 border-t border-white/5 bg-black/30 flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-wrap">
                    {project.apkUrl && (
                      <a
                        href={project.apkUrl}
                        download
                        className="flex items-center gap-1 text-xs font-orbitron text-black bg-gradient-to-r from-cyber-cyan to-blue-500 hover:from-cyan-400 hover:to-blue-400 px-2.5 py-1 rounded shadow-glow-cyan transition-all"
                      >
                        <Smartphone className="w-3.5 h-3.5" />
                        <span>INSTALL APK</span>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-orbitron text-cyber-cyan hover:underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>LIVE DEMO</span>
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-orbitron text-gray-400 hover:text-white"
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>SOURCE</span>
                      </a>
                    )}
                  </div>

                  <span className="text-[10px] font-orbitron text-cyber-green opacity-70">
                    SYS_OK
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {!loading && filteredProjects.length === 0 && (
        <div className="text-center py-16 glass-panel rounded">
          <p className="font-orbitron text-gray-400 text-sm">
            No deployments discovered under the selected filter node.
          </p>
        </div>
      )}
    </section>
  );
};

export default Projects;
