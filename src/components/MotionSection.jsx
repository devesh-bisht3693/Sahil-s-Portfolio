import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import motionData from '../data/motion.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Video Card — play on hover, click to expand
   ═══════════════════════════════════════════════════════ */
function VideoCard({ item, index, onExpand }) {
  const videoRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
    videoRef.current?.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="group flex flex-col"
    >
      <div
        className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-black cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onExpand}
      >
        <div className="relative aspect-square overflow-hidden">
          <video
            ref={videoRef}
            src={item.videoUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />

          {/* Play icon overlay — fades out on hover */}
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
              isHovering ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/25">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-6 w-6 ml-0.5">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-md bg-black/40 px-2.5 py-1 text-[0.6rem] font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
              {item.category}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-[0.65rem] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Motion
          </span>
        </div>
        <h3 className="text-sm font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
          {item.title}
        </h3>
      </div>
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   Video Modal — expanded player
   ═══════════════════════════════════════════════════════ */
function VideoModal({ isOpen, onClose, item }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && item && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-black shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <video
              src={item.videoUrl}
              controls
              autoPlay
              className="w-full aspect-square object-contain bg-black"
            />

            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-400">{item.category}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════ */
export function MotionSection() {
  const [expandedVideo, setExpandedVideo] = useState(null);

  return (
    <section
      id="motion"
      className="bg-slate-50 dark:bg-slate-950/80 transition-colors"
    >
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24 lg:px-8">
        {/* ── Section heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="mb-12 md:mb-16"
        >
          <p className="section-heading">
            Motion Extensions
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Short-form motion pieces for campaign support.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            Short-form motion pieces created to support MediaTek's campaign visuals across social
            and digital platforms, maintaining consistency with established visual systems.
          </p>
        </motion.div>

        {/* ── Video grid — 4 columns for portrait videos ── */}
        <div className="mx-auto max-w-4xl grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
          {motionData.map((item, i) => (
            <VideoCard
              key={item.id}
              item={item}
              index={i}
              onExpand={() => setExpandedVideo(item)}
            />
          ))}
        </div>
      </div>

      {/* Expanded video modal */}
      <VideoModal
        isOpen={!!expandedVideo}
        onClose={() => setExpandedVideo(null)}
        item={expandedVideo}
      />
    </section>
  );
}
