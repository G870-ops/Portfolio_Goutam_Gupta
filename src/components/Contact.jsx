import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { contactAPI } from '../api/client';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: null,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status.error || status.success) {
      setStatus({ submitting: false, success: false, error: null, message: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: 'Please complete the required identification and message fields.',
      });
      return;
    }

    setStatus({ submitting: true, success: false, error: null, message: '' });

    try {
      const response = await contactAPI.submit(formData);
      setStatus({
        submitting: false,
        success: true,
        error: false,
        message:
          response.data?.message ||
          'Inbound transmission received and registered into MongoDB. Thank you!',
      });
      // Clear form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus({
        submitting: false,
        success: false,
        error: true,
        message:
          err.message ||
          'Failed to dispatch transmission. Please check connection or retry.',
      });
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-4xl mx-auto">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
          DISPATCH_TELEMETRY
        </h2>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
        <span className="font-orbitron text-xs text-cyber-green hidden sm:inline">
          SOCKET_READY
        </span>
      </div>

      <p className="text-gray-400 font-rajdhani text-base mb-8">
        Have a project idea, engineering collaboration, or employment opportunity? Send an encrypted transmission directly into Goutam Gupta's MongoDB pipeline.
      </p>

      {/* Contact Card */}
      <div className="glass-panel p-6 sm:p-10 rounded border border-cyber-border shadow-2xl relative overflow-hidden">
        {/* Glowing cyber accent lines */}
        <div className="absolute top-0 left-0 w-32 h-[2px] bg-cyber-cyan shadow-glow-cyan" />
        <div className="absolute top-0 right-0 w-32 h-[2px] bg-cyber-pink shadow-glow-pink" />

        {/* Status Toast Banners */}
        {status.success && (
          <div className="mb-6 p-4 rounded bg-emerald-950/80 border border-cyber-green text-cyber-green flex items-start gap-3 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="font-orbitron text-xs">
              <strong className="block text-sm mb-0.5">TRANSMISSION CONFIRMED</strong>
              {status.message}
            </div>
          </div>
        )}

        {status.error && (
          <div className="mb-6 p-4 rounded bg-red-950/80 border border-red-500 text-red-300 flex items-start gap-3 animate-fadeIn">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-400" />
            <div className="font-orbitron text-xs">
              <strong className="block text-sm mb-0.5 text-red-400">TRANSMISSION ERROR</strong>
              {status.message}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Sender Name */}
            <div>
              <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-2">
                Your Identification / Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Satya Nadella / Hiring Team"
                required
                className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-500 font-rajdhani focus:outline-none focus:border-cyber-cyan focus:shadow-glow-cyan transition-all"
              />
            </div>

            {/* Sender Email */}
            <div>
              <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-2">
                Return Vector / Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. recruiter@enterprise.com"
                required
                className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-500 font-rajdhani focus:outline-none focus:border-cyber-cyan focus:shadow-glow-cyan transition-all"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-2">
              Objective / Subject Line
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Full-Stack MERN Engineering Role / Project Proposal"
              className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-500 font-rajdhani focus:outline-none focus:border-cyber-cyan focus:shadow-glow-cyan transition-all"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-2">
              Payload / Message *
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter comprehensive proposal details, stack requirements, or collaboration scope..."
              required
              className="w-full px-4 py-3 rounded bg-black/60 border border-white/10 text-white placeholder-gray-500 font-rajdhani focus:outline-none focus:border-cyber-cyan focus:shadow-glow-cyan transition-all resize-y"
            />
          </div>

          {/* Submit CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-[11px] font-orbitron text-gray-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyber-cyan" />
              Direct dispatch to Nodemailer & MongoDB Atlas Document Store
            </span>

            <button
              type="submit"
              disabled={status.submitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-white hover:scale-105 disabled:opacity-50 disabled:pointer-events-none transition-all neo-clip"
            >
              {status.submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>TRANSMITTING...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>DISPATCH TRANSMISSION</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
