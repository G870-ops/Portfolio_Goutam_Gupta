import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, X, ZoomIn, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Rahul Sharma',
    role: 'Product Manager · TechCorp India',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul&backgroundColor=b6e3f4',
    rating: 5,
    review:
      'Goutam delivered a full-stack MERN e-commerce platform ahead of schedule. His grasp of asynchronous Node.js pipelines and MongoDB Atlas was impressive. The final product was performant, secure, and visually stunning. Highly recommended for any enterprise-grade project.',
    reviewImage: null,
    tag: 'Full Stack Project',
  },
  {
    id: 2,
    name: 'Priya Dey',
    role: 'Startup Founder · Invitor Events',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya&backgroundColor=ffdfbf',
    rating: 5,
    review:
      'Working with Goutam on the Invitor Event Booking platform was a great experience. He understood our requirements quickly, implemented role-based dashboards perfectly, and ensured smooth cross-device responsiveness. The UI with Tailwind CSS exceeded our expectations.',
    reviewImage: null,
    tag: 'Web App',
  },
  {
    id: 3,
    name: 'Dr. Amit Kumar',
    role: 'Research Supervisor · KGEC',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit&backgroundColor=c0aede',
    rating: 5,
    review:
      'The PBIS (Pig Breed Identification System) built by Goutam demonstrated exceptional engineering proficiency. Integrating TFLite with OpenCV at the edge, achieving near-100% accuracy on mobile devices, was a significant technical feat. His AI/ML and Android development skills are outstanding.',
    reviewImage: null,
    tag: 'AI/ML Research',
  },
];

const StarRating = ({ rating, size = 'sm' }) => {
  const cls = size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${cls} ${s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`}
        />
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
        className={`glass-panel rounded p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${
          isActive ? 'border-cyber-cyan shadow-glow-cyan' : 'border-white/10'
        }`}
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 left-0 w-20 h-[2px] bg-cyber-cyan opacity-60" />
        <div className="absolute top-0 left-0 w-[2px] h-20 bg-cyber-cyan opacity-60" />
        <div className="absolute bottom-0 right-0 w-20 h-[2px] bg-cyber-pink opacity-40" />

        {/* Quote icon */}
        <Quote className="w-8 h-8 text-cyber-cyan/20 absolute top-4 right-6" />

        {/* Tag badge */}
        <span className="inline-block mb-4 px-2.5 py-0.5 rounded bg-black/60 border border-cyber-cyan/40 text-[10px] font-orbitron text-cyber-cyan tracking-wider">
          {item.tag}
        </span>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <StarRating rating={item.rating} size="lg" />
          <span className="font-orbitron text-xs text-yellow-400 font-bold">{item.rating}/5</span>
        </div>

        {/* Review text */}
        <p className="font-rajdhani text-gray-300 text-base leading-relaxed mb-6">
          "{item.review}"
        </p>

        {/* Review screenshot (if any) */}
        {item.reviewImage && (
          <div
            className="relative mb-6 cursor-zoom-in group rounded overflow-hidden border border-white/10"
            onClick={() => setLightbox(true)}
          >
            <img
              src={item.reviewImage}
              alt="Review screenshot"
              className="w-full object-cover rounded group-hover:opacity-80 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
              <ZoomIn className="w-8 h-8 text-cyber-cyan" />
            </div>
          </div>
        )}

        {/* Reviewer identity */}
        <div className="flex items-center gap-4 pt-4 border-t border-white/10">
          <div className="relative">
            <img
              src={item.avatar}
              alt={item.name}
              className="w-12 h-12 rounded-full border-2 border-cyber-cyan object-cover"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-cyber-green border-2 border-black" />
          </div>
          <div>
            <p className="font-orbitron font-bold text-white text-sm">{item.name}</p>
            <p className="text-[11px] font-mono text-gray-400 mt-0.5">{item.role}</p>
          </div>
          <div className="ml-auto text-[10px] font-orbitron text-cyber-green opacity-60">
            VERIFIED
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && item.reviewImage && (
          <ImageLightbox src={item.reviewImage} alt="Review" onClose={() => setLightbox(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));

  return (
    <section id="testimonials" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-10">
        <MessageSquare className="w-6 h-6 text-cyber-cyan flex-shrink-0" />
        <h2 className="font-orbitron text-2xl sm:text-3xl font-bold uppercase tracking-wider text-cyber-cyan text-glow-cyan">
          CLIENT_TRANSMISSIONS
        </h2>
        <div className="flex-grow h-[1px] bg-gradient-to-r from-cyber-cyan to-transparent opacity-40" />
        <span className="font-orbitron text-xs text-cyber-pink hidden sm:inline">
          VERIFIED_REVIEWS
        </span>
      </div>

      <p className="text-gray-400 font-rajdhani text-base mb-10 max-w-2xl">
        Authenticated feedback from clients, collaborators, and supervisors who have experienced the
        engineering quality first-hand.
      </p>

      {/* Desktop: 3-column grid */}
      <div className="hidden lg:grid grid-cols-3 gap-6">
        {testimonials.map((item, idx) => (
          <TestimonialCard key={item.id} item={item} isActive={true} />
        ))}
      </div>

      {/* Mobile / Tablet: carousel */}
      <div className="lg:hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            <TestimonialCard item={testimonials[activeIndex]} isActive={true} />
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={prev}
            className="flex items-center gap-2 px-4 py-2 rounded border border-cyber-cyan text-cyber-cyan font-orbitron text-xs hover:bg-cyber-cyan hover:text-black transition-all neo-clip"
          >
            <ChevronLeft className="w-4 h-4" /> PREV
          </button>

          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
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
      </div>

      {/* Stats strip */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'SATISFIED CLIENTS', value: '10+' },
          { label: 'PROJECTS DELIVERED', value: '7+' },
          { label: 'AVG RATING', value: '5.0 ★' },
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
    </section>
  );
};

export default Testimonials;

