import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Layers, Database, Wrench, Award, Check } from 'lucide-react';

const categoryIcons = {
  'Programming Languages': Code,
  'Frontend Engineering': Terminal,
  'Backend Ecosystem': Layers,
  'Database Management': Database,
  'Tools & Core Skills': Wrench,
  'Other Qualifications': Award,
};

const Skills = ({ skills = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // If no backend skills loaded yet, fallback to default data
  const defaultSkills = [
    { category: 'Programming Languages', name: 'JavaScript (ES6+)', proficiency: 92 },
    { category: 'Programming Languages', name: 'TypeScript', proficiency: 86 },
    { category: 'Programming Languages', name: 'Java', proficiency: 88 },
    { category: 'Programming Languages', name: 'C / C++', proficiency: 82 },
    { category: 'Programming Languages', name: 'Python', proficiency: 78 },

    { category: 'Frontend Engineering', name: 'React.js', proficiency: 94 },
    { category: 'Frontend Engineering', name: 'Tailwind CSS', proficiency: 92 },
    { category: 'Frontend Engineering', name: 'HTML5 & CSS3', proficiency: 96 },
    { category: 'Frontend Engineering', name: 'Vite Ecosystem', proficiency: 90 },
    { category: 'Frontend Engineering', name: 'Bootstrap', proficiency: 88 },

    { category: 'Backend Ecosystem', name: 'Node.js', proficiency: 90 },
    { category: 'Backend Ecosystem', name: 'Express.js', proficiency: 92 },
    { category: 'Backend Ecosystem', name: 'RESTful API Architecture', proficiency: 94 },
    { category: 'Backend Ecosystem', name: 'JWT & Security Middleware', proficiency: 88 },
    { category: 'Backend Ecosystem', name: 'Spring Boot', proficiency: 74 },

    { category: 'Database Management', name: 'MongoDB & Mongoose', proficiency: 92 },
    { category: 'Database Management', name: 'MySQL', proficiency: 85 },
    { category: 'Database Management', name: 'Firebase Firestore', proficiency: 84 },

    { category: 'Tools & Core Skills', name: 'Git & GitHub', proficiency: 92 },
    { category: 'Tools & Core Skills', name: 'Postman API Testing', proficiency: 90 },
    { category: 'Tools & Core Skills', name: 'Android Studio', proficiency: 86 },
    { category: 'Tools & Core Skills', name: 'System Troubleshooting', proficiency: 89 },
  ];

  const displayList = skills.length > 0 ? skills : defaultSkills;
  const categories = ['ALL', ...new Set(displayList.map((s) => s.category))];

  const filtered =
    selectedCategory === 'ALL'
      ? displayList
      : displayList.filter((s) => s.category === selectedCategory);

  return (
    <section id="skills" className="py-20 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-10">
        <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
          SKILLS_MATRIX
        </h2>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
        <span className="font-orbitron text-xs text-cyber-green hidden sm:inline">
          SYS_METRICS_OPTIMAL
        </span>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded text-xs font-orbitron font-semibold tracking-wider transition-all neo-clip ${
              selectedCategory === cat
                ? 'bg-cyber-cyan text-black shadow-glow-cyan'
                : 'glass-panel text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Skills Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((skill, index) => {
          const IconComponent = categoryIcons[skill.category] || Code;
          return (
            <motion.div
              key={skill._id || skill.name + index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="glass-panel p-5 rounded hover:border-cyber-pink hover:shadow-glow-pink transition-all duration-300 relative group overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded bg-black/50 border border-cyber-cyan/30 text-cyber-cyan group-hover:text-cyber-pink group-hover:border-cyber-pink/50 transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base font-rajdhani tracking-wide">
                      {skill.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 font-orbitron uppercase">
                      {skill.category}
                    </span>
                  </div>
                </div>
                <span className="font-orbitron text-xs font-bold text-cyber-cyan group-hover:text-cyber-pink transition-colors">
                  {skill.proficiency}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.proficiency}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-pink rounded-full shadow-glow-cyan"
                />
              </div>

              {/* Subtle top indicator */}
              <div className="absolute top-2 right-2 text-[8px] font-orbitron text-cyber-green opacity-40 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                <Check className="w-2.5 h-2.5 text-cyber-green" />
                VERIFIED
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
