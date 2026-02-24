import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageModal } from './ImageModal';
import miscData from '../data/miscellaneous.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Image Card
   ═══════════════════════════════════════════════════════ */
function ImageCard({ item, onClick, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-900/50 shadow-sm cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.url}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
          <span className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            View Full Image
          </span>
        </div>
      </div>

      {/* Title */}
      <div className="px-4 py-3">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white transition-colors truncate">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Video Card — play on hover, click to expand
   ═══════════════════════════════════════════════════════ */
function VideoCard({ item, onExpand, delay = 0 }) {
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
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className="group"
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
            src={item.url}
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />

          {/* Play icon overlay */}
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

          {/* Video badge */}
          <div className="absolute top-3 left-3">
            <span className="rounded-md bg-black/40 px-2.5 py-1 text-[0.6rem] font-semibold text-white uppercase tracking-wider backdrop-blur-sm">
              Video
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3 px-1">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white transition-colors truncate">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Video Modal
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
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-black shadow-2xl"
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
              src={item.url}
              controls
              autoPlay
              className="w-full aspect-square object-contain bg-black"
            />

            <div className="px-5 py-4">
              <h3 className="text-sm font-bold text-white">{item.title}</h3>
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
export function MiscSection() {
  const [modalImage, setModalImage] = useState(null);
  const [modalVideo, setModalVideo] = useState(null);

  return (
    <section
      id="misc"
      className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors"
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
            Miscellaneous Creative Works
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Experimental projects & independent visual studies.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            A curated selection of experimental projects, exploratory visuals, and independent
            design studies across branding, digital graphics, and visual storytelling. These works
            reflect creative range, adaptability across styles, and a continuous drive to explore
            new visual directions beyond commercial briefs.
          </p>
        </motion.div>

        {/* ── 3-column grid ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
          {miscData.map((item, i) =>
            item.type === 'video' ? (
              <VideoCard
                key={item.id}
                item={item}
                onExpand={() => setModalVideo(item)}
                delay={(i % 3) * 0.08}
              />
            ) : (
              <ImageCard
                key={item.id}
                item={item}
                onClick={() => setModalImage({ src: item.url, alt: item.title })}
                delay={(i % 3) * 0.08}
              />
            )
          )}
        </div>
      </div>

      {/* Image zoom modal */}
      <ImageModal
        isOpen={!!modalImage}
        onClose={() => setModalImage(null)}
        src={modalImage?.src}
        alt={modalImage?.alt}
      />

      {/* Video expand modal */}
      <VideoModal
        isOpen={!!modalVideo}
        onClose={() => setModalVideo(null)}
        item={modalVideo}
      />
    </section>
  );
}

