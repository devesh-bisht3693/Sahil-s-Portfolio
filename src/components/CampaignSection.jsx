import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageComparisonSlider } from './ImageComparisonSlider';
import campaigns from '../data/campaigns.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ── External link icon ── */
const ExternalIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ── Scrollable image modal (for tall infographics) ── */
function ScrollableImageModal({ isOpen, onClose, src, alt = '' }) {
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
          <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6" onClick={(e) => e.stopPropagation()}>
            <p className="text-sm font-medium text-white/70 truncate max-w-[70%]">{alt}</p>
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

/* ── Single case-study card ── */
function CaseStudyCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [modalSrc, setModalSrc] = useState(null);
  const isBeforeAfter = !!item.beforeImage && !!item.afterImage;
  const isInfographic = !!item.croppedImage;

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-slate-900/50 shadow-sm dark:shadow-lg transition-colors"
    >
      {/* ── Visual area ── */}
      <div className="relative">
        {isBeforeAfter ? (
          <ImageComparisonSlider
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            beforeLabel="Before"
            afterLabel="After"
            aspectRatio="aspect-[16/9]"
            className="[&>div]:rounded-none [&>div]:border-0 [&>div]:shadow-none"
          />
        ) : isInfographic ? (
          <div className="group relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800/50">
            <img
              src={item.croppedImage}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
            {/* Overlay button to view full infographic */}
            <button
              type="button"
              onClick={() => setModalSrc(item.fullImage)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30"
            >
              <span className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                </svg>
                View Full Infographic
              </span>
            </button>
          </div>
        ) : null}
      </div>

      {/* ── Content area ── */}
      <div className="px-6 py-6 md:px-8 md:py-7">
        {/* Number + Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
          {item.summary}
        </p>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-5 border-t border-slate-200 dark:border-slate-800/70 pt-5 transition-colors">
                {/* Objective */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                    <span className="h-px w-4 bg-cyan-500/50" />
                    Objective
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
                    {item.objective}
                  </p>
                </div>

                {/* Approach */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                    <span className="h-px w-4 bg-cyan-500/50" />
                    Approach
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
                    {item.approach}
                  </p>
                </div>

                {/* Outcome */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                    <span className="h-px w-4 bg-cyan-500/50" />
                    Outcome
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
                    {item.outcome}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions row */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {/* Expand/Collapse toggle */}
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50 transition-all hover:border-cyan-400 dark:hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-300"
          >
            {expanded ? 'Show Less' : 'Read Case Study'}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>

          {/* External links */}
          {item.links?.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30 transition-all hover:bg-cyan-50 dark:hover:bg-cyan-500/10 hover:border-cyan-400 dark:hover:border-cyan-400/50"
            >
              <ExternalIcon />
              {link.label}
            </a>
          ))}

          {/* View full infographic button (for infographic type) */}
          {isInfographic && (
            <button
              type="button"
              onClick={() => setModalSrc(item.fullImage)}
              className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/90 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              </svg>
              View Full Infographic
            </button>
          )}
        </div>
      </div>

      {/* Scrollable modal for full infographic */}
      <ScrollableImageModal
        isOpen={!!modalSrc}
        onClose={() => setModalSrc(null)}
        src={modalSrc}
        alt={item.title}
      />
    </motion.article>
  );
}

/* ── Main section ── */
export function CampaignSection() {
  return (
    <section id="campaigns" className="bg-slate-50 dark:bg-slate-950/80 transition-colors">
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
            Campaign & Event Visual Systems
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Visual campaigns developed for launches, collaborations, and large-scale events.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            Each project starts with a technical idea and transforms it into a visual experience designed
            for websites, exhibitions, and multi-platform communication.
          </p>
        </motion.div>

        {/* ── Case study cards ── */}
        <div className="space-y-10 md:space-y-14">
          {campaigns.map((item, index) => (
            <CaseStudyCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

