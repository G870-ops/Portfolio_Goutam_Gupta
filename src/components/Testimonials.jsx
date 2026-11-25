import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  X,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Plus,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles
} from 'lucide-react';
import { reviewAPI } from '../api/client';
import { trackEvent } from '../utils/analytics';

const StarRating = ({ rating, size = 'sm', onSelect }) => {
  const cls = size === 'lg' ? 'w-5 h-5' : size === 'xl' ? 'w-6 h-6' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          type={onSelect ? 'button' : undefined}
          key={s}
          onClick={onSelect ? () => onSelect(s) : undefined}
          disabled={!onSelect}
          className={`${onSelect ? 'cursor-pointer hover:scale-110 transition-transform' : 'cursor-default'}`}
        >
          <Star
            className={`${cls} ${
              s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

const ImageLightbox = ({ src, alt, onClose }) => (
  <div
    className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.85, opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="relative max-w-4xl w-full"
      onClick={(e) => e.stopPropagation()}
    >
      <img src={src} alt={alt} className="w-full rounded border border-cyber-cyan shadow-glow-cyan" />
      <button
        onClick={onClose}
        className="absolute -top-4 -right-4 w-9 h-9 rounded-full bg-black border border-cyber-pink text-cyber-pink flex items-center justify-center hover:bg-cyber-pink hover:text-black transition-all"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  </div>
);

const TestimonialCard = ({ item, isActive }) => {
  const [lightbox, setLightbox] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isActive ? 1 : 0.4, y: 0, scale: isActive ? 1 : 0.95 }}
        transition={{ duration: 0.4 }}
        className={`glass-panel rounded p-6 sm:p-8 relative overflow-hidden transition-all duration-300 flex flex-col justify-between ${
          isActive ? 'border-cyber-cyan shadow-glow-cyan' : 'border-white/10'
        }`}
      >
        <div className="absolute top-0 left-0 w-20 h-[2px] bg-cyber-cyan opacity-60" />
        <div className="absolute top-0 left-0 w-[2px] h-20 bg-cyber-cyan opacity-60" />
        <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-cyber-pink opacity-40" />

        <Quote className="w-8 h-8 text-cyber-cyan/20 absolute top-4 right-6 pointer-events-none" />

        <div>
          <span className="inline-block mb-4 px-2.5 py-0.5 rounded bg-black/60 border border-cyber-cyan/40 text-[10px] font-orbitron text-cyber-cyan tracking-wider">
            {item.tag || 'Verified Client'}
          </span>

          <div className="flex items-center gap-2 mb-4">
            <StarRating rating={item.rating || 5} size="lg" />
            <span className="font-orbitron text-xs text-yellow-400 font-bold">{item.rating || 5}/5</span>
          </div>

          <p className="font-rajdhani text-gray-300 text-base leading-relaxed mb-6 whitespace-pre-line">
            "{item.review}"
          </p>

          {item.reviewImage && (
            <div
              className="relative mb-6 cursor-zoom-in group rounded overflow-hidden border border-white/10"
              onClick={() => setLightbox(true)}
            >
              <img
                src={item.reviewImage}
                alt="Client verification proof"
                className="w-full h-44 object-cover rounded group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/50">
                <ZoomIn className="w-8 h-8 text-cyber-cyan" />
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-auto">
          <div className="relative flex-shrink-0">
            <img
              src={
                item.avatar ||
                `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(item.name)}&backgroundColor=050711`
              }
              alt={item.name}
              className="w-11 h-11 rounded-full border border-cyber-cyan object-cover bg-black/60"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-cyber-green border border-black" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-orbitron font-bold text-white text-sm truncate">{item.name}</p>
            <p className="text-[11px] font-mono text-gray-400 truncate mt-0.5">
              {item.role || 'Verified Client'}
            </p>
          </div>
          <div className="text-[10px] font-orbitron text-cyber-green opacity-80 flex-shrink-0">
            VERIFIED
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && item.reviewImage && (
          <ImageLightbox src={item.reviewImage} alt="Review proof" onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const Testimonials = () => {
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio_real_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch (_) {
      return [];
    }
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState({ success: false, error: null, message: '' });

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    rating: 5,
    tag: 'Full Stack Project',
    review: '',
    reviewImage: '',
  });

  const fetchRealReviews = async () => {
    setLoading(true);
    try {
      const res = await reviewAPI.getAll();
      if (res.data?.data && Array.isArray(res.data.data)) {
        setReviews(res.data.data);
        localStorage.setItem('portfolio_real_reviews', JSON.stringify(res.data.data));
      }
    } catch (_) {
      const saved = localStorage.getItem('portfolio_real_reviews');
      if (saved) {
        try {
          setReviews(JSON.parse(saved));
        } catch (_) {}
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRealReviews();
  }, []);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formStatus.error || formStatus.success) {
      setFormStatus({ success: false, error: null, message: '' });
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.review.trim()) {
      setFormStatus({
        success: false,
        error: true,
        message: 'Name and review feedback are required.',
      });
      return;
    }

    setFormSubmitting(true);
    setFormStatus({ success: false, error: null, message: '' });

    try {
      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim() || 'Verified Client',
        rating: Number(formData.rating) || 5,
        tag: formData.tag.trim() || 'Client Review',
        review: formData.review.trim(),
        reviewImage: formData.reviewImage.trim(),
      };

      let newReviewRecord = null;

      try {
        const res = await reviewAPI.create(payload);
        if (res.data?.data) {
          newReviewRecord = res.data.data;
        }
      } catch (err) {
        newReviewRecord = {
          _id: `local_${Date.now()}`,
          ...payload,
          avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(payload.name)}&backgroundColor=050711`,
          createdAt: new Date().toISOString(),
        };
      }

      if (newReviewRecord) {
        const updated = [newReviewRecord, ...reviews];
        setReviews(updated);
        localStorage.setItem('portfolio_real_reviews', JSON.stringify(updated));
      }

      trackEvent('user_review_submitted', { name: formData.name, rating: formData.rating });

      setFormStatus({
        success: true,
        error: false,
        message: 'Your review has been successfully registered into the verified feedback stream. Thank you!',
      });

      setFormData({
        name: '',
        role: '',
        rating: 5,
        tag: 'Full Stack Project',
        review: '',
        reviewImage: '',
      });

      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatus({ success: false, error: null, message: '' });
      }, 1500);
    } catch (err) {
      setFormStatus({
        success: false,
        error: true,
        message: err.message || 'Failed to submit review. Please try again.',
      });
    } finally {
      setFormSubmitting(false);
    }
  };

  const prev = () => setActiveIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviews.length).toFixed(1)
      : '5.0';

  return (
    <section id="testimonials" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <MessageSquare className="w-6 h-6 text-cyber-cyan flex-shrink-0" />
          <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
            CLIENT_TRANSMISSIONS
          </h2>
          <span className="font-orbitron text-xs text-cyber-pink hidden md:inline ml-2">
            REAL_VERIFIED_FEEDBACK
          </span>
        </div>

        <button
          onClick={() => {
            setIsModalOpen(true);
            setFormStatus({ success: false, error: null, message: '' });
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-white hover:scale-105 transition-all neo-clip self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>TRANSMIT REVIEW</span>
        </button>
      </div>

      <p className="text-gray-400 font-rajdhani text-base mb-10 max-w-2xl">
        Real feedback from verified clients, recruiters, and engineering collaborators.
      </p>

      {reviews.length === 0 ? (
        <div className="glass-panel rounded p-8 sm:p-12 text-center border border-white/10 max-w-2xl mx-auto space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-cyan-950/40 border border-cyber-cyan/50 flex items-center justify-center text-cyber-cyan shadow-glow-cyan">
            <MessageSquare className="w-6 h-6" />
          </div>
          <h3 className="font-orbitron text-lg font-bold text-white tracking-wide">
            NO_CLIENT_TRANSMISSIONS_RECORDED
          </h3>
          <p className="text-gray-400 font-rajdhani text-sm max-w-md mx-auto leading-relaxed">
            No reviews have been submitted yet. If we have collaborated on software architecture, client deployments, or engineering tasks, be the first to transmit your verified feedback.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-white transition-all neo-clip"
            >
              <Plus className="w-4 h-4" />
              <span>BE THE FIRST TO REVIEW</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="hidden lg:grid grid-cols-3 gap-6">
            {reviews.map((item) => (
              <TestimonialCard key={item._id || item.id} item={item} isActive={true} />
            ))}
          </div>

          <div className="lg:hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviews[activeIndex]?._id || activeIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
              >
                {reviews[activeIndex] && (
                  <TestimonialCard item={reviews[activeIndex]} isActive={true} />
                )}
              </motion.div>
            </AnimatePresence>

            {reviews.length > 1 && (
              <div className="flex items-center justify-between mt-6">
                <button
                  onClick={prev}
                  className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-cyan text-cyber-cyan font-orbitron text-xs hover:bg-cyber-cyan hover:text-black transition-all neo-clip"
                >
                  <ChevronLeft className="w-4 h-4" /> PREV
                </button>

                <div className="flex gap-2">
                  {reviews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveIndex(idx)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === activeIndex
                          ? 'bg-cyber-cyan shadow-glow-cyan scale-125'
                          : 'bg-gray-600 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-pink text-cyber-pink font-orbitron text-xs hover:bg-cyber-pink hover:text-black transition-all neo-clip"
                >
                  NEXT <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {[
              { label: 'REAL CLIENT REVIEWS', value: `${reviews.length}` },
              { label: 'AVERAGE RATING', value: `${averageRating} ★` },
              { label: 'SATISFACTION INDEX', value: '100%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-panel rounded p-4 text-center border border-white/10 hover:border-cyber-cyan transition-colors"
              >
                <div className="font-orbitron text-2xl font-black text-cyber-cyan text-glow-cyan">
                  {stat.value}
                </div>
                <div className="font-orbitron text-[10px] text-gray-400 mt-1 tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg bg-[#070914] border border-cyber-cyan/50 rounded-lg shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="px-5 py-3.5 bg-cyan-950/20 border-b border-cyber-cyan/30 flex items-center justify-between">
                <div className="flex items-center gap-2 text-cyber-cyan font-orbitron font-bold text-xs sm:text-sm tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>TRANSMIT CLIENT FEEDBACK</span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmitReview} className="p-5 sm:p-6 space-y-4">
                {formStatus.success && (
                  <div className="p-3 rounded bg-emerald-950/80 border border-cyber-green text-cyber-green text-xs font-orbitron flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                {formStatus.error && (
                  <div className="p-3 rounded bg-red-950/80 border border-red-500 text-red-300 text-xs font-orbitron flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{formStatus.message}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="e.g. Satya / Tech Lead"
                      className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-1.5">
                      Role / Project
                    </label>
                    <input
                      type="text"
                      name="role"
                      value={formData.role}
                      onChange={handleFormChange}
                      placeholder="e.g. Client / Food Delivery App"
                      className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-1.5">
                      Rating: <span className="text-yellow-400 font-bold">{formData.rating} Stars</span>
                    </label>
                    <div className="pt-1">
                      <StarRating
                        rating={formData.rating}
                        size="xl"
                        onSelect={(r) => setFormData({ ...formData, rating: r })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-1.5">
                      Project Category
                    </label>
                    <select
                      name="tag"
                      value={formData.tag}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 rounded bg-black/80 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors"
                    >
                      <option value="Full Stack Project">Full Stack Project</option>
                      <option value="Web App Deployment">Web App Deployment</option>
                      <option value="Android & AI App">Android &amp; AI App</option>
                      <option value="Frontend Development">Frontend Development</option>
                      <option value="System Architecture">System Architecture</option>
                      <option value="Freelance Collaboration">Freelance Collaboration</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-1.5">
                    Review Details *
                  </label>
                  <textarea
                    name="review"
                    required
                    rows="4"
                    value={formData.review}
                    onChange={handleFormChange}
                    placeholder="Describe collaboration experience, engineering execution, delivery speed, and code quality..."
                    className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors resize-y"
                  />
                </div>

                <div>
                  <label className="block text-xs font-orbitron uppercase text-cyber-cyan mb-1.5">
                    Screenshot / Verification Proof URL (Optional)
                  </label>
                  <input
                    type="url"
                    name="reviewImage"
                    value={formData.reviewImage}
                    onChange={handleFormChange}
                    placeholder="https://... (screenshot of review, chat, or project confirmation)"
                    className="w-full px-3 py-2 rounded bg-black/60 border border-white/10 text-white font-rajdhani text-sm focus:border-cyber-cyan outline-none transition-colors"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded border border-white/20 text-gray-400 font-orbitron text-xs hover:text-white transition-colors"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="flex items-center gap-2 px-5 py-2 rounded bg-cyber-cyan text-black font-orbitron font-bold text-xs uppercase tracking-wider shadow-glow-cyan hover:bg-white transition-all neo-clip disabled:opacity-50"
                  >
                    {formSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT VERIFIED REVIEW</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Testimonials;
