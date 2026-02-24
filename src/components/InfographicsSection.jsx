import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import infographicsData from '../data/infographics.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Scrollable Image Modal (for tall infographics)
   ═══════════════════════════════════════════════════════ */
function ScrollableImageModal({ isOpen, onClose, src, alt = '' }) {
  const handleClose = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Top bar */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium text-white/70 truncate max-w-[70%]">{alt}</p>
            <button
              type="button"
              onClick={handleClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable image area */}
          <div
            className="flex-1 overflow-y-auto overscroll-contain px-4 pb-6 sm:px-6 scrollbar-hide"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto max-w-3xl">
              <img
                src={src}
                alt={alt}
                className="w-full h-auto rounded-xl shadow-2xl"
                draggable={false}
              />
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex-shrink-0 flex justify-center pb-3 pointer-events-none">
            <span className="flex items-center gap-1.5 text-[0.65rem] text-white/40 uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 animate-bounce">
                <polyline points="6 9 12 15 18 9" />
              </svg>
              Scroll to explore
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   Flip-Modal — full-screen modal with front/back flip
   ═══════════════════════════════════════════════════════ */
function FlipModal({ isOpen, onClose, frontSrc, backSrc, alt = '' }) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!isOpen) setIsFlipped(false);
  }, [isOpen]);

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
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-black/85 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Top bar */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium text-white/70 truncate max-w-[70%]">{alt}</p>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Flip card area — click the card to flip */}
          <div
            className="flex-1 flex items-center justify-center px-4 pb-6 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flip-card w-full max-w-xl cursor-pointer"
              onClick={() => setIsFlipped((f) => !f)}
            >
              <div className={`flip-card-inner relative w-full aspect-[4/5] ${isFlipped ? 'flipped' : ''}`}>
                {/* Front */}
                <div className="flip-card-face absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <img src={frontSrc} alt={`${alt} — Front`} className="h-full w-full object-cover" draggable={false} />
                </div>
                {/* Back */}
                <div className="flip-card-face flip-card-back absolute inset-0 rounded-2xl overflow-hidden shadow-2xl">
                  <img src={backSrc} alt={`${alt} — Back`} className="h-full w-full object-cover" draggable={false} />
                </div>
              </div>
            </div>
          </div>

          {/* Hint label */}
          <div className="flex-shrink-0 flex justify-center pb-3 pointer-events-none">
            <span className="flex items-center gap-1.5 text-[0.65rem] text-white/40 uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              {isFlipped ? 'Back' : 'Front'} — Click image to flip
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   Flip Card — looks like a normal card in the grid.
   Click opens a modal with flip functionality.
   ═══════════════════════════════════════════════════════ */
function FlipCard({ item, index }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col"
    >
      {/* Image card — identical to InfographicCard */}
      <div
        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-900/50 shadow-sm cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.frontImage}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Hover overlay — same as other cards */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
            <span className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
              View Full Infographic
            </span>
          </div>
        </div>
      </div>

      {/* Info below */}
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-[0.65rem] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Infographic
          </span>
        </div>
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2 transition-colors">
          {item.description}
        </p>
      </div>

      {/* Flip modal */}
      <FlipModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        frontSrc={item.frontImage}
        backSrc={item.backImage}
        alt={item.title}
      />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   Infographic Card (scrollable / single)
   ═══════════════════════════════════════════════════════ */
function InfographicCard({ item, index }) {
  const [modalSrc, setModalSrc] = useState(null);

  const hasFullImage = !!item.croppedImage && !!item.fullImage;
  const displayImage = hasFullImage ? item.croppedImage : item.image;
  const fullImage = hasFullImage ? item.fullImage : item.image;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col"
    >
      {/* Image card */}
      <div
        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-900/50 shadow-sm cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
        onClick={() => setModalSrc(fullImage)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={displayImage}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
            <span className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
              View Full Infographic
            </span>
          </div>
        </div>
      </div>

      {/* Info below the card */}
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="text-[0.65rem] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {hasFullImage ? 'Long-Format' : 'Infographic'}
          </span>
        </div>
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2 transition-colors">
          {item.description}
        </p>
      </div>

      {/* Scrollable modal */}
      <ScrollableImageModal
        isOpen={!!modalSrc}
        onClose={() => setModalSrc(null)}
        src={modalSrc}
        alt={item.title}
      />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════ */
export function InfographicsSection() {
  return (
    <section
      id="infographics"
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
            Technical Infographics
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Technical infographics designed to simplify complex chipset architecture.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            Focused on clarity, structure, and visual hierarchy — transforming dense technical
            data into accessible, campaign-ready communication.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
          {infographicsData.map((item, i) =>
            item.type === 'flip' ? (
              <FlipCard key={item.id} item={item} index={i} />
            ) : (
              <InfographicCard key={item.id} item={item} index={i} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
