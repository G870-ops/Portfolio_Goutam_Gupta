import React, { useState, useEffect, useCallback } from 'react';
import {
  X, Shield, Plus, Trash2, Mail, LogOut, CheckCircle, AlertCircle,
  Loader2, Pencil, XCircle, ExternalLink, Download, Save, User,
  Code, RefreshCw, Star, Lock, Key,
} from 'lucide-react';
import { authAPI, projectAPI, skillAPI, contactAPI, profileAPI } from '../api/client';

// ─── Constants ────────────────────────────────────────────────────────────────
const INPUT = 'w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm outline-none focus:border-cyber-cyan transition-colors';
const SELECT = 'w-full px-3 py-2 rounded bg-black/80 border border-white/10 text-white font-rajdhani text-sm outline-none focus:border-cyber-cyan transition-colors';

const PROJECT_CATEGORIES = ['Full Stack', 'Frontend', 'Backend', 'AI/ML', 'Mobile / Android', 'Systems'];
const SKILL_CATEGORIES = [
  'Programming Languages', 'Frontend Engineering', 'Backend Ecosystem',
  'Database Management', 'Tools & Core Skills', 'Other Qualifications',
];

const EMPTY_PROJECT = {
  title: '', description: '', techStack: '', liveUrl: '',
  githubUrl: '', apkUrl: '', imageUrl: '', category: 'Full Stack',
  featured: false, telemetryInsight: '',
};

const EMPTY_SKILL = {
  name: '', category: 'Programming Languages', proficiency: 85, icon: 'Code',
};

// ─── Reusable Status Banner ───────────────────────────────────────────────────
const StatusBanner = ({ msg }) => {
  if (!msg.text) return null;
  const isSuccess = msg.type === 'success';
  return (
    <div className={`p-3 rounded border text-xs font-orbitron flex items-center gap-2 mb-4
      ${isSuccess ? 'bg-emerald-950/80 border-cyber-green text-cyber-green' : 'bg-red-950/80 border-red-500 text-red-300'}`}>
      {isSuccess
        ? <CheckCircle className="w-4 h-4 flex-shrink-0" />
        : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      <span>{msg.text}</span>
    </div>
  );
};

// ─── Section Header ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, subtitle, onRefresh, loading }) => (
  <div className="flex items-center justify-between mb-4">
    <div>
      <h3 className="font-orbitron text-sm font-bold text-cyber-cyan">{title}</h3>
      {subtitle && <p className="text-[11px] font-mono text-gray-500 mt-0.5">{subtitle}</p>}
    </div>
    {onRefresh && (
      <button onClick={onRefresh}
        className="p-1.5 rounded border border-white/10 text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-colors">
        <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
      </button>
    )}
  </div>
);

// ─── Project Form (Add / Edit) ────────────────────────────────────────────────
const ProjectForm = ({ initial, onSubmit, submitLabel, msg, onCancel }) => {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(initial), [initial]);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const setChk = k => e => setForm(f => ({ ...f, [k]: e.target.checked }));
  const showApk = !form.liveUrl.trim() || form.category === 'Mobile / Android';

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-4">
      <StatusBanner msg={msg} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Project Title *</label>
          <input type="text" required value={form.title} onChange={set('title')}
            placeholder="e.g. AI Code Engine" className={INPUT} />
        </div>
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Category</label>
          <select value={form.category} onChange={set('category')} className={SELECT}>
            {PROJECT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Description *</label>
        <textarea rows="3" required value={form.description} onChange={set('description')}
          placeholder="Comprehensive architectural highlights and functionality..."
          className={INPUT} />
      </div>

      <div>
        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Tech Stack (Comma-separated) *</label>
        <input type="text" required value={form.techStack} onChange={set('techStack')}
          placeholder="React.js, Node.js, Express, MongoDB, Tailwind" className={INPUT} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Live Demo URL</label>
          <input type="url" value={form.liveUrl} onChange={set('liveUrl')}
            placeholder="https://..." className={INPUT} />
        </div>
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">GitHub / Source Code URL</label>
          <input type="url" value={form.githubUrl} onChange={set('githubUrl')}
            placeholder="https://github.com/..." className={INPUT} />
        </div>
      </div>

      {showApk && (
        <div className="p-3 rounded-lg border border-cyber-pink/30 bg-cyber-pink/5">
          <label className="block text-xs font-orbitron text-cyber-pink mb-1.5 flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> APK / Release Download URL
            <span className="text-[10px] text-gray-500 font-mono">(shown when no Live URL)</span>
          </label>
          <input type="url" value={form.apkUrl} onChange={set('apkUrl')}
            placeholder="https://github.com/.../releases/app.apk"
            className="w-full px-3 py-2 rounded bg-black/60 border border-cyber-pink/30 text-white font-rajdhani text-sm outline-none focus:border-cyber-pink transition-colors" />
        </div>
      )}

      <div>
        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Image URL</label>
        <input type="url" value={form.imageUrl} onChange={set('imageUrl')}
          placeholder="https://images.unsplash.com/..." className={INPUT} />
      </div>

      <div>
        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Telemetry Insight (hover text)</label>
        <input type="text" value={form.telemetryInsight} onChange={set('telemetryInsight')}
          placeholder="⚡ PIPELINE: High-performance V8 Event Loop" className={INPUT} />
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input type="checkbox" id="featuredChk" checked={form.featured} onChange={setChk('featured')}
          className="w-4 h-4 accent-cyan-400" />
        <label htmlFor="featuredChk" className="text-xs font-orbitron text-white">Mark as Featured Deployment</label>
      </div>

      <div className="flex gap-3 pt-1">
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="flex-1 py-2.5 rounded border border-white/20 text-gray-400 font-orbitron text-xs uppercase tracking-wider hover:border-white/40 hover:text-white transition-all flex items-center justify-center gap-2">
            <XCircle className="w-3.5 h-3.5" /> Cancel
          </button>
        )}
        <button type="submit"
          className="flex-1 py-2.5 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-white transition-all neo-clip flex items-center justify-center gap-2">
          <Save className="w-3.5 h-3.5" /> {submitLabel}
        </button>
      </div>
    </form>
  );
};

// ─── Skill Form (Add / Edit) ──────────────────────────────────────────────────
const SkillForm = ({ initial, onSubmit, submitLabel, msg, onCancel }) => {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(initial), [initial]);
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }} className="space-y-3">
      <StatusBanner msg={msg} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Skill Name *</label>
          <input type="text" required value={form.name} onChange={set('name')}
            placeholder="e.g. React.js" className={INPUT} />
        </div>
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Category *</label>
          <select value={form.category} onChange={set('category')} className={SELECT}>
            {SKILL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">
            Proficiency: <span className="text-cyber-pink">{form.proficiency}%</span>
          </label>
          <input type="range" min="1" max="100" value={form.proficiency}
            onChange={e => setForm(f => ({ ...f, proficiency: Number(e.target.value) }))}
            className="w-full accent-cyan-400" />
        </div>
        <div>
          <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Icon Name (lucide)</label>
          <input type="text" value={form.icon} onChange={set('icon')}
            placeholder="Code, Terminal, Database..." className={INPUT} />
        </div>
      </div>

      <div className="flex gap-3 pt-1">
        {onCancel && (
          <button type="button" onClick={onCancel}
            className="flex-1 py-2 rounded border border-white/20 text-gray-400 font-orbitron text-xs uppercase tracking-wider hover:border-white/40 transition-all flex items-center justify-center gap-1">
            <XCircle className="w-3 h-3" /> Cancel
          </button>
        )}
        <button type="submit"
          className="flex-1 py-2 rounded bg-cyber-pink text-black font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white transition-all neo-clip flex items-center justify-center gap-1">
          <Save className="w-3 h-3" /> {submitLabel}
        </button>
      </div>
    </form>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AdminDashboard = ({ isOpen, onClose, onProjectUpdated, onSkillsUpdated, onProfileUpdated }) => {
  const [token, setToken] = useState(localStorage.getItem('portfolio_token') || '');
  const [adminUser, setAdminUser] = useState(null);

  // Login
  const [loginForm, setLoginForm] = useState({ usernameOrEmail: '', password: '' });
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Active tab: 'projects' | 'addProject' | 'editProject' | 'skills' | 'profile' | 'messages'
  const [activeTab, setActiveTab] = useState('projects');

  // Data lists
  const [projectsList, setProjectsList] = useState([]);
  const [skillsList, setSkillsList] = useState([]);
  const [messagesList, setMessagesList] = useState([]);
  const [loadingData, setLoadingData] = useState(false);

  // Project editing
  const [editProject, setEditProject] = useState(null);
  const [editProjectInitial, setEditProjectInitial] = useState(EMPTY_PROJECT);
  const [projectMsg, setProjectMsg] = useState({ type: '', text: '' });

  // Skill editing
  const [editSkill, setEditSkill] = useState(null);
  const [editSkillInitial, setEditSkillInitial] = useState(EMPTY_SKILL);
  const [skillAddMode, setSkillAddMode] = useState(false);
  const [skillMsg, setSkillMsg] = useState({ type: '', text: '' });

  // Profile panel state (editable clone of Hero static data)
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_profile');
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return {
      name: 'Goutam Gupta',
      bio: 'Full-Stack MERN Architect & Android Developer with deep expertise in reactive frontends, asynchronous Node.js microservices, distributed MongoDB pipelines, and mission-critical edge AI applications.',
      email: 'goutamgupta605@gmail.com',
      phone: '+91 8343957187',
      github: 'https://github.com/G870-ops',
      linkedin: 'https://www.linkedin.com/in/goutam-gupta',
      resumeEmail: 'goutamgupta605@gmail.com',
      profileImg: '/profile.jpg',
    };
  });
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [profileLoading, setProfileLoading] = useState(false);

  // ── Auth session ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (token) {
      authAPI.getMe()
        .then(res => { setAdminUser(res.data.user); loadAll(); })
        .catch(() => handleLogout());
    }
  }, [token]);

  const loadAll = useCallback(async () => {
    setLoadingData(true);
    try {
      const [projRes, skillRes, msgRes, profRes] = await Promise.all([
        projectAPI.getAll(),
        skillAPI.getAll(),
        contactAPI.getAll().catch(() => ({ data: { data: [] } })),
        profileAPI.get().catch(() => null),
      ]);
      setProjectsList(projRes.data.data || []);
      setSkillsList(skillRes.data.data || []);
      setMessagesList(msgRes.data?.data || []);
      if (profRes?.data?.data) {
        setProfile(prev => ({ ...prev, ...profRes.data.data }));
        localStorage.setItem('portfolio_profile', JSON.stringify(profRes.data.data));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  // ── Auth ──────────────────────────────────────────────────────────────────────
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError('');
    try {
      const res = await authAPI.login(loginForm);
      const jwt = res.data.token;
      localStorage.setItem('portfolio_token', jwt);
      setToken(jwt);
      setAdminUser(res.data.user);
      loadAll();
    } catch (err) {
      setLoginError(err.message || 'Authentication rejected. Verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('portfolio_token');
    setToken('');
    setAdminUser(null);
  };

  // ── Projects ──────────────────────────────────────────────────────────────────
  const handleAddProject = async (form) => {
    setProjectMsg({ type: '', text: '' });
    try {
      await projectAPI.create({
        ...form,
        techStack: typeof form.techStack === 'string'
          ? form.techStack.split(',').map(s => s.trim()).filter(Boolean)
          : form.techStack,
      });
      setProjectMsg({ type: 'success', text: 'Project deployed to MongoDB successfully!' });
      loadAll();
      if (onProjectUpdated) onProjectUpdated();
    } catch (err) {
      setProjectMsg({ type: 'error', text: err.message || 'Failed to create project.' });
    }
  };

  const openEditProject = (p) => {
    setEditProject(p);
    setEditProjectInitial({
      title: p.title || '',
      description: p.description || '',
      techStack: Array.isArray(p.techStack) ? p.techStack.join(', ') : (p.techStack || ''),
      liveUrl: p.liveUrl || '',
      githubUrl: p.githubUrl || '',
      apkUrl: p.apkUrl || '',
      imageUrl: p.imageUrl || '',
      category: p.category || 'Full Stack',
      featured: Boolean(p.featured),
      telemetryInsight: p.telemetryInsight || '',
    });
    setProjectMsg({ type: '', text: '' });
    setActiveTab('editProject');
  };

  const handleUpdateProject = async (form) => {
    if (!editProject) return;
    setProjectMsg({ type: '', text: '' });
    try {
      await projectAPI.update(editProject._id, {
        ...form,
        techStack: typeof form.techStack === 'string'
          ? form.techStack.split(',').map(s => s.trim()).filter(Boolean)
          : form.techStack,
      });
      setProjectMsg({ type: 'success', text: `"${form.title}" updated successfully!` });
      loadAll();
      if (onProjectUpdated) onProjectUpdated();
    } catch (err) {
      setProjectMsg({ type: 'error', text: err.message || 'Failed to update project.' });
    }
  };

  const handleDeleteProject = async (id, title) => {
    if (!window.confirm(`Delete "${title}" from MongoDB?`)) return;
    try {
      await projectAPI.delete(id);
      if (editProject?._id === id) { setActiveTab('projects'); setEditProject(null); }
      loadAll();
      if (onProjectUpdated) onProjectUpdated();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // ── Skills ────────────────────────────────────────────────────────────────────
  const handleAddSkill = async (form) => {
    setSkillMsg({ type: '', text: '' });
    try {
      await skillAPI.create({ ...form, proficiency: Number(form.proficiency) });
      setSkillMsg({ type: 'success', text: `"${form.name}" added!` });
      setSkillAddMode(false);
      loadAll();
      if (onSkillsUpdated) onSkillsUpdated();
    } catch (err) {
      setSkillMsg({ type: 'error', text: err.message || 'Failed to add skill.' });
    }
  };

  const openEditSkill = (sk) => {
    setEditSkill(sk);
    setEditSkillInitial({ name: sk.name, category: sk.category, proficiency: sk.proficiency, icon: sk.icon || 'Code' });
    setSkillMsg({ type: '', text: '' });
    setSkillAddMode(false);
  };

  const handleUpdateSkill = async (form) => {
    if (!editSkill) return;
    setSkillMsg({ type: '', text: '' });
    try {
      await skillAPI.update(editSkill._id, { ...form, proficiency: Number(form.proficiency) });
      setSkillMsg({ type: 'success', text: `"${form.name}" updated!` });
      setEditSkill(null);
      loadAll();
      if (onSkillsUpdated) onSkillsUpdated();
    } catch (err) {
      setSkillMsg({ type: 'error', text: err.message || 'Failed to update skill.' });
    }
  };

  const handleDeleteSkill = async (id, name) => {
    if (!window.confirm(`Delete skill "${name}"?`)) return;
    try {
      await skillAPI.delete(id);
      if (editSkill?._id === id) setEditSkill(null);
      loadAll();
      if (onSkillsUpdated) onSkillsUpdated();
    } catch (err) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  // ── Profile ───────────────────────────────────────────────────────────────────
  const saveProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ type: '', text: '' });
    try {
      // 1. Save to MongoDB backend
      const res = await profileAPI.update(profile);
      const updatedData = res.data?.data || profile;
      setProfile(updatedData);

      // 2. Store in localStorage for instant local caching
      localStorage.setItem('portfolio_profile', JSON.stringify(updatedData));
      window.dispatchEvent(new Event('portfolio_profile_updated'));

      // 3. Notify parent component to update UI immediately
      if (onProfileUpdated) {
        onProfileUpdated(updatedData);
      }

      setProfileMsg({
        type: 'success',
        text: 'Profile successfully updated and saved to MongoDB database! Changes are live across the site.',
      });
    } catch (err) {
      // Fallback: save to localStorage if backend is unreachable
      localStorage.setItem('portfolio_profile', JSON.stringify(profile));
      window.dispatchEvent(new Event('portfolio_profile_updated'));
      if (onProfileUpdated) onProfileUpdated(profile);
      setProfileMsg({
        type: 'success',
        text: 'Profile saved to local cache! (' + (err.message || 'Offline mode') + ')',
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // Load profile from API and fallback to localStorage on mount
  useEffect(() => {
    profileAPI.get()
      .then(res => {
        if (res.data?.data) {
          setProfile(res.data.data);
          localStorage.setItem('portfolio_profile', JSON.stringify(res.data.data));
        }
      })
      .catch(() => {
        const saved = localStorage.getItem('portfolio_profile');
        if (saved) {
          try { setProfile(JSON.parse(saved)); } catch (_) {}
        }
      });
  }, []);

  // ── Password Change Handler ──────────────────────────────────────────────────
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: '', text: '' });

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await authAPI.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      setPasswordMsg({
        type: 'success',
        text: res.data.message || 'Admin security password changed successfully!',
      });
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setPasswordMsg({
        type: 'error',
        text: err.message || 'Failed to change admin password. Verify current password.',
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  // ── Messages ──────────────────────────────────────────────────────────────────
  const handleDeleteMessage = async (id) => {
    try { await contactAPI.delete(id); loadAll(); }
    catch (err) { alert(`Failed: ${err.message}`); }
  };

  if (!isOpen) return null;

  // ── Tab button helper
  const Tab = ({ id, label, icon: Icon, count }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`px-3 py-1.5 rounded text-xs font-orbitron transition-colors flex items-center gap-1.5 whitespace-nowrap
        ${activeTab === id ? 'bg-cyber-cyan text-black font-bold' : 'text-gray-400 hover:text-white'}`}
    >
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {label}{count !== undefined ? ` (${count})` : ''}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-5xl max-h-[94vh] bg-[#070914] border border-cyber-cyan/50 rounded-lg shadow-2xl flex flex-col overflow-hidden">

        {/* ── Header ── */}
        <div className="px-5 py-3.5 bg-cyan-950/20 border-b border-cyber-cyan/30 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-cyber-cyan font-orbitron font-bold text-sm tracking-wider">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">SYS_ADMIN DASHBOARD CONTROL CORE</span>
            <span className="sm:hidden">ADMIN CORE</span>
            {adminUser && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 border border-cyber-cyan text-cyber-cyan">
                @{adminUser.username}
              </span>
            )}
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── LOGIN SCREEN ── */}
        {!token && (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center flex-1">
            <div className="w-full max-w-md">
              <h3 className="font-orbitron text-xl font-bold text-cyber-pink mb-2 text-center">ADMIN ACCESS AUTHORIZATION</h3>
              <p className="text-xs font-rajdhani text-gray-400 text-center mb-6">
                Enter admin credentials to manage live MongoDB projects and telemetry inquiries.
              </p>

              {loginError && (
                <div className="mb-4 p-3 rounded bg-red-950/80 border border-red-500 text-red-300 text-xs font-orbitron flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-orbitron text-cyber-cyan mb-1.5">Admin Username or Email</label>
                  <input type="text" required value={loginForm.usernameOrEmail}
                    onChange={e => setLoginForm({ ...loginForm, usernameOrEmail: e.target.value })}
                    placeholder="goutam or goutamgupta605@gmail.com"
                    className="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-orbitron text-cyber-cyan mb-1.5">Security Passcode</label>
                  <input type="password" required value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="••••••••••••"
                    className="w-full px-4 py-2.5 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors" />
                </div>
                <button type="submit" disabled={loginLoading}
                  className="w-full mt-4 py-3 rounded bg-cyber-pink text-black font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-glow-pink flex items-center justify-center gap-2 neo-clip">
                  {loginLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>AUTHENTICATE SESSION</span>}
                </button>
              </form>

              <div className="mt-5 p-2.5 rounded border border-cyber-cyan/20 bg-black/40 text-[11px] font-mono text-gray-400 flex items-center justify-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>Restricted Gateway &bull; Encrypted TLS Session</span>
              </div>
            </div>
          </div>
        )}

        {/* ── AUTHENTICATED WORKSPACE ── */}
        {token && (
          <div className="flex-1 flex flex-col overflow-hidden min-h-0">

            {/* Tab Bar */}
            <div className="px-4 py-2 border-b border-white/10 bg-black/40 flex items-center justify-between gap-2 flex-shrink-0 overflow-x-auto">
              <div className="flex items-center gap-1 flex-nowrap">
                <Tab id="projects" label="Projects" count={projectsList.length} />
                <Tab id="addProject" label="Add Project" icon={Plus} />
                {activeTab === 'editProject' && editProject && (
                  <button className="px-3 py-1.5 rounded bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-orbitron flex items-center gap-1 whitespace-nowrap">
                    <Pencil className="w-3 h-3" />
                    Editing: {editProject.title.substring(0, 16)}{editProject.title.length > 16 ? '…' : ''}
                  </button>
                )}
                <Tab id="skills" label="Skills" count={skillsList.length} icon={Code} />
                <Tab id="profile" label="Profile" icon={User} />
                <Tab id="security" label="Security" icon={Lock} />
                <Tab id="messages" label="Inbox" count={messagesList.length} icon={Mail} />
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-1 text-red-400 hover:text-red-300 font-orbitron text-xs whitespace-nowrap flex-shrink-0">
                <LogOut className="w-3.5 h-3.5" /><span>TERMINATE</span>
              </button>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-5 min-h-0">

              {/* ═══════════════════ PROJECTS LIST TAB ═══════════════════ */}
              {activeTab === 'projects' && (
                <div>
                  <SectionHeader
                    title="PROJECT NODES"
                    subtitle={`${projectsList.length} document(s) in MongoDB`}
                    onRefresh={loadAll}
                    loading={loadingData}
                  />

                  {loadingData && (
                    <p className="text-xs font-mono text-cyber-cyan text-center py-6 animate-pulse">Querying MongoDB...</p>
                  )}
                  {!loadingData && projectsList.length === 0 && (
                    <div className="text-center py-10">
                      <p className="text-gray-400 font-mono text-xs mb-3">No project documents in database.</p>
                      <button onClick={() => setActiveTab('addProject')}
                        className="px-4 py-2 rounded bg-cyber-cyan text-black font-orbitron text-xs font-bold hover:bg-white transition-all">
                        + Add First Project
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    {projectsList.map(p => (
                      <div key={p._id}
                        className="glass-panel p-4 rounded border border-white/10 hover:border-cyber-cyan/40 transition-colors">
                        <div className="flex items-start gap-3">
                          {/* Thumbnail */}
                          {p.imageUrl && (
                            <img src={p.imageUrl} alt={p.title}
                              className="w-16 h-12 rounded object-cover border border-white/10 flex-shrink-0 hidden sm:block" />
                          )}
                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <h4 className="font-orbitron font-bold text-white text-sm">{p.title}</h4>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-black border border-white/20 text-cyber-cyan">{p.category}</span>
                              {p.featured && <span className="text-[10px] px-1.5 rounded bg-pink-950 text-cyber-pink flex items-center gap-0.5"><Star className="w-2.5 h-2.5" /> FEATURED</span>}
                              {p.apkUrl && !p.liveUrl && <span className="text-[10px] px-1.5 rounded bg-purple-950 text-purple-300 flex items-center gap-0.5"><Download className="w-2.5 h-2.5" /> APK</span>}
                            </div>
                            <p className="text-gray-400 text-xs font-rajdhani line-clamp-2 mb-1.5">{p.description}</p>
                            <div className="text-[11px] font-mono text-cyber-cyan/70 mb-1.5">
                              {p.techStack?.slice(0, 5).join(' · ')}{p.techStack?.length > 5 ? '…' : ''}
                            </div>
                            <div className="flex gap-3 flex-wrap">
                              {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="text-[10px] text-cyber-cyan flex items-center gap-1 hover:underline"><ExternalLink className="w-3 h-3" /> Live</a>}
                              {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="text-[10px] text-gray-400 flex items-center gap-1 hover:underline"><ExternalLink className="w-3 h-3" /> Source</a>}
                              {p.apkUrl && <a href={p.apkUrl} target="_blank" rel="noreferrer" className="text-[10px] text-purple-300 flex items-center gap-1 hover:underline"><Download className="w-3 h-3" /> APK</a>}
                            </div>
                          </div>
                          {/* Actions */}
                          <div className="flex flex-col gap-2 flex-shrink-0">
                            <button onClick={() => openEditProject(p)} title="Edit project"
                              className="p-2 rounded bg-amber-950/60 border border-amber-500/50 text-amber-400 hover:bg-amber-900 transition-colors">
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => handleDeleteProject(p._id, p.title)} title="Delete project"
                              className="p-2 rounded bg-red-950/60 border border-red-500/50 text-red-400 hover:bg-red-900 transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ═══════════════════ ADD PROJECT TAB ═══════════════════ */}
              {activeTab === 'addProject' && (
                <div className="max-w-2xl mx-auto">
                  <SectionHeader title="DEPLOY NEW PROJECT" subtitle="Add a new project document to MongoDB" />
                  <ProjectForm
                    initial={EMPTY_PROJECT}
                    onSubmit={handleAddProject}
                    submitLabel="Deploy to MongoDB"
                    msg={projectMsg}
                  />
                </div>
              )}

              {/* ═══════════════════ EDIT PROJECT TAB ═══════════════════ */}
              {activeTab === 'editProject' && editProject && (
                <div className="max-w-2xl mx-auto">
                  <SectionHeader
                    title="MODIFY PROJECT NODE"
                    subtitle={`Editing: ${editProject.title} · ID: ${editProject._id}`}
                  />
                  <ProjectForm
                    key={editProject._id}
                    initial={editProjectInitial}
                    onSubmit={handleUpdateProject}
                    submitLabel="Save Changes"
                    msg={projectMsg}
                    onCancel={() => { setActiveTab('projects'); setEditProject(null); setProjectMsg({ type: '', text: '' }); }}
                  />
                </div>
              )}

              {/* ═══════════════════ SKILLS TAB ═══════════════════ */}
              {activeTab === 'skills' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-orbitron text-sm font-bold text-cyber-cyan">SKILLS MATRIX</h3>
                      <p className="text-[11px] font-mono text-gray-500 mt-0.5">{skillsList.length} skill(s) in database</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={loadAll}
                        className="p-1.5 rounded border border-white/10 text-gray-400 hover:text-cyber-cyan transition-colors">
                        <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
                      </button>
                      <button
                        onClick={() => { setSkillAddMode(true); setEditSkill(null); setSkillMsg({ type: '', text: '' }); }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-cyber-pink text-black font-orbitron font-bold text-xs hover:bg-white transition-all">
                        <Plus className="w-3.5 h-3.5" /> Add Skill
                      </button>
                    </div>
                  </div>

                  {/* Inline Add Skill Form */}
                  {skillAddMode && (
                    <div className="mb-4 p-4 rounded-lg border border-cyber-pink/30 bg-cyber-pink/5">
                      <h4 className="font-orbitron text-xs font-bold text-cyber-pink mb-3">NEW SKILL</h4>
                      <SkillForm
                        initial={EMPTY_SKILL}
                        onSubmit={handleAddSkill}
                        submitLabel="Add Skill"
                        msg={skillMsg}
                        onCancel={() => { setSkillAddMode(false); setSkillMsg({ type: '', text: '' }); }}
                      />
                    </div>
                  )}

                  {/* Inline Edit Skill Form */}
                  {editSkill && (
                    <div className="mb-4 p-4 rounded-lg border border-amber-500/30 bg-amber-950/20">
                      <h4 className="font-orbitron text-xs font-bold text-amber-400 mb-3">
                        EDITING: {editSkill.name}
                      </h4>
                      <SkillForm
                        key={editSkill._id}
                        initial={editSkillInitial}
                        onSubmit={handleUpdateSkill}
                        submitLabel="Save Skill"
                        msg={skillMsg}
                        onCancel={() => { setEditSkill(null); setSkillMsg({ type: '', text: '' }); }}
                      />
                    </div>
                  )}

                  {!skillAddMode && !editSkill && <StatusBanner msg={skillMsg} />}

                  {/* Skills grouped by category */}
                  {loadingData && <p className="text-xs font-mono text-cyber-cyan text-center py-6 animate-pulse">Loading skills...</p>}

                  {!loadingData && skillsList.length === 0 && (
                    <p className="text-gray-400 font-mono text-xs text-center py-6">No skills in database. Add some above.</p>
                  )}

                  {(() => {
                    const groups = {};
                    skillsList.forEach(sk => {
                      groups[sk.category] = groups[sk.category] || [];
                      groups[sk.category].push(sk);
                    });
                    return Object.entries(groups).map(([cat, skills]) => (
                      <div key={cat} className="mb-5">
                        <div className="text-[10px] font-orbitron text-gray-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                          <span>{cat}</span>
                          <div className="flex-1 h-px bg-white/5" />
                        </div>
                        <div className="space-y-2">
                          {skills.map(sk => (
                            <div key={sk._id}
                              className="flex items-center gap-3 p-3 rounded glass-panel border border-white/8 hover:border-white/20 transition-colors">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-rajdhani font-semibold text-white text-sm">{sk.name}</span>
                                  <span className="text-[10px] font-orbitron text-cyber-cyan">{sk.proficiency}%</span>
                                </div>
                                <div className="w-full h-1 bg-black/60 rounded-full overflow-hidden">
                                  <div className="h-full bg-gradient-to-r from-cyber-cyan to-cyber-pink rounded-full"
                                    style={{ width: `${sk.proficiency}%` }} />
                                </div>
                              </div>
                              <div className="flex gap-1.5 flex-shrink-0">
                                <button onClick={() => openEditSkill(sk)}
                                  className="p-1.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-400 hover:bg-amber-900 transition-colors">
                                  <Pencil className="w-3 h-3" />
                                </button>
                                <button onClick={() => handleDeleteSkill(sk._id, sk.name)}
                                  className="p-1.5 rounded bg-red-950/60 border border-red-500/40 text-red-400 hover:bg-red-900 transition-colors">
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              )}

              {/* ═══════════════════ PROFILE TAB ═══════════════════ */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl mx-auto">
                  <SectionHeader
                    title="PROFILE & CONTACT INFO"
                    subtitle="Syncs directly to MongoDB database and updates live across the entire website"
                  />
                  <StatusBanner msg={profileMsg} />

                  <form onSubmit={saveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Full Name</label>
                        <input type="text" value={profile.name}
                          onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                          className={INPUT} />
                      </div>
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Email Address</label>
                        <input type="email" value={profile.email}
                          onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                          className={INPUT} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Bio / Mission Statement</label>
                      <textarea rows="3" value={profile.bio}
                        onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                        className={INPUT} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Phone Number</label>
                        <input type="text" value={profile.phone}
                          onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                          placeholder="+91 XXXXXXXXXX" className={INPUT} />
                      </div>
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Profile Image URL / Path</label>
                        <input type="text" value={profile.profileImg}
                          onChange={e => setProfile(p => ({ ...p, profileImg: e.target.value }))}
                          placeholder="/profile.jpg or https://..." className={INPUT} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">GitHub Profile URL</label>
                        <input type="url" value={profile.github}
                          onChange={e => setProfile(p => ({ ...p, github: e.target.value }))}
                          placeholder="https://github.com/..." className={INPUT} />
                      </div>
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1">LinkedIn Profile URL</label>
                        <input type="url" value={profile.linkedin}
                          onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))}
                          placeholder="https://www.linkedin.com/in/..." className={INPUT} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-orbitron text-cyber-cyan mb-1">Resume Request Email</label>
                      <input type="email" value={profile.resumeEmail}
                        onChange={e => setProfile(p => ({ ...p, resumeEmail: e.target.value }))}
                        placeholder="email for resume requests" className={INPUT} />
                    </div>

                    <div className="p-3 rounded border border-cyber-cyan/30 bg-cyber-cyan/5 text-[11px] font-mono text-gray-300">
                      ✓ Profile changes are synced to MongoDB Atlas and cached locally. Changes update instantly across the entire website.
                    </div>

                    <button type="submit" disabled={profileLoading}
                      className="w-full py-3 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-white transition-all neo-clip flex items-center justify-center gap-2 disabled:opacity-50">
                      {profileLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Saving Changes...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save Profile Changes
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* ═══════════════════ SECURITY & PASSWORD TAB ═══════════════════ */}
              {activeTab === 'security' && (
                <div className="max-w-xl mx-auto">
                  <SectionHeader
                    title="ADMIN CREDENTIAL SECURITY"
                    subtitle="Update system admin access credentials stored in MongoDB database"
                  />
                  <StatusBanner msg={passwordMsg} />

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-orbitron text-cyber-cyan mb-1.5 flex items-center gap-1.5">
                        <Key className="w-3.5 h-3.5 text-cyber-pink" /> Current Passcode *
                      </label>
                      <input
                        type="password"
                        required
                        value={passwordForm.currentPassword}
                        onChange={e => setPasswordForm(p => ({ ...p, currentPassword: e.target.value }))}
                        placeholder="••••••••••••"
                        className={INPUT}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1.5 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-cyber-cyan" /> New Passcode *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.newPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, newPassword: e.target.value }))}
                          placeholder="Min 6 characters"
                          className={INPUT}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-orbitron text-cyber-cyan mb-1.5 flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-cyber-cyan" /> Confirm Passcode *
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordForm.confirmPassword}
                          onChange={e => setPasswordForm(p => ({ ...p, confirmPassword: e.target.value }))}
                          placeholder="Repeat new passcode"
                          className={INPUT}
                        />
                      </div>
                    </div>

                    <div className="p-3 rounded border border-cyber-cyan/30 bg-cyber-cyan/5 text-[11px] font-mono text-gray-300">
                      ℹ New password will be salted & hashed using bcrypt in MongoDB Atlas. Future admin logins will require this updated password.
                    </div>

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="w-full py-3 rounded bg-cyber-pink text-black font-orbitron font-bold text-xs uppercase tracking-wider hover:bg-white transition-all shadow-glow-pink flex items-center justify-center gap-2 neo-clip disabled:opacity-50"
                    >
                      {passwordLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>UPDATING PASSCODE...</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>CHANGE ADMIN PASSWORD</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}

              {/* ═══════════════════ MESSAGES TAB ═══════════════════ */}
              {activeTab === 'messages' && (
                <div>
                  <SectionHeader
                    title="INBOUND TRANSMISSIONS"
                    subtitle={`${messagesList.length} message(s) received`}
                    onRefresh={loadAll}
                    loading={loadingData}
                  />

                  {messagesList.length === 0 && (
                    <p className="text-gray-400 font-mono text-xs text-center py-10">
                      No inbound recruiter/client transmissions recorded.
                    </p>
                  )}

                  <div className="space-y-4">
                    {messagesList.map(m => (
                      <div key={m._id}
                        className="glass-panel p-5 rounded border border-white/10 space-y-2 hover:border-cyber-pink/50 transition-colors">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-orbitron font-bold text-cyber-cyan text-sm">
                              {m.name}
                            </div>
                            <div className="text-[11px] font-mono text-gray-500">{m.email}</div>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-[10px] font-mono text-gray-500">
                              {new Date(m.createdAt).toLocaleString()}
                            </span>
                            <button onClick={() => handleDeleteMessage(m._id)}
                              className="text-red-400 hover:text-red-300 p-1">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="text-xs font-orbitron text-cyber-pink font-semibold">
                          {m.subject || 'Portfolio Inquiry'}
                        </div>
                        <p className="text-sm font-rajdhani text-gray-300 whitespace-pre-wrap bg-black/40 p-3 rounded border border-white/5">
                          {m.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
