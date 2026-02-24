import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import editorialData from '../data/editorial.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Page Carousel Modal
   ═══════════════════════════════════════════════════════ */
function PageCarouselModal({ isOpen, onClose, pages = [], title = '', startIndex = 0 }) {
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    if (isOpen) setCurrent(startIndex);
  }, [isOpen, startIndex]);

  const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent((c) => Math.min(pages.length - 1, c + 1)), [pages.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, prev, next]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* ── Top bar ── */}
          <div
            className="flex-shrink-0 flex items-center justify-between px-4 py-3 sm:px-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <p className="text-sm font-medium text-white/70 truncate">{title}</p>
              <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-0.5 text-[0.65rem] font-semibold text-white/60">
                {current + 1} / {pages.length}
              </span>
            </div>
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

          {/* ── Image area ── */}
          <div
            className="flex-1 flex items-center justify-center px-4 sm:px-12 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev arrow */}
            <button
              type="button"
              onClick={prev}
              disabled={current === 0}
              className="absolute left-2 sm:left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page image */}
            <AnimatePresence mode="wait">
              <motion.img
                key={current}
                src={pages[current]}
                alt={`${title} — Page ${current + 1}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
                className="max-h-[80vh] max-w-full rounded-xl shadow-2xl object-contain"
                draggable={false}
              />
            </AnimatePresence>

            {/* Next arrow */}
            <button
              type="button"
              onClick={next}
              disabled={current === pages.length - 1}
              className="absolute right-2 sm:right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 disabled:opacity-20 disabled:pointer-events-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* ── Page dots ── */}
          <div
            className="flex-shrink-0 flex justify-center gap-1.5 pb-4 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            {pages.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 bg-cyan-400'
                    : 'w-1.5 bg-white/25 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════
   Publication Stack — stacked card with hover fan-out
   ═══════════════════════════════════════════════════════ */
function PublicationStack({ item, globalIndex }) {
  const [isHovered, setIsHovered] = useState(false);
  const [carouselOpen, setCarouselOpen] = useState(false);
  const pages = item.pages;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-8 sm:gap-16">
        {/* ── Card stack ── */}
        <div
          className="relative shrink-0 w-64 sm:w-80 cursor-pointer"
          style={{ paddingBottom: `${(pages.length - 1) * 24}px`, paddingRight: `${(pages.length - 1) * 14}px` }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setCarouselOpen(true)}
        >
          <div className="relative" style={{ aspectRatio: '3/4' }}>
            {/* Render pages from back (last) to front (first) */}
            {pages.map((page, i) => {
              const stackPos = i; // 0 = front, 1 = second ...

              // On hover: pages fan out downward-right so they don't overlap text
              const offsetX = isHovered ? stackPos * 18 : stackPos * 3;
              const offsetY = isHovered ? stackPos * 28 : stackPos * 3;
              const rotation = isHovered ? stackPos * 3.5 : stackPos * 0.5;
              const scale = isHovered && stackPos === 0 ? 1.02 : 1;
              const shadowSize = isHovered
                ? `0 ${8 + stackPos * 4}px ${20 + stackPos * 8}px rgba(0,0,0,${0.15 + stackPos * 0.05})`
                : '0 4px 12px rgba(0,0,0,0.08)';

              return (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-900/50"
                  style={{ zIndex: pages.length - stackPos }}
                  animate={{
                    x: offsetX,
                    y: offsetY,
                    rotate: rotation,
                    scale,
                    boxShadow: shadowSize,
                  }}
                  transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                >
                  <img
                    src={page}
                    alt={`${item.title} — Page ${i + 1}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    draggable={false}
                  />
                  {/* Slight darkening on pages behind — less when hovered so they pop */}
                  {stackPos > 0 && (
                    <motion.div
                      className="absolute inset-0"
                      animate={{
                        backgroundColor: isHovered
                          ? 'rgba(0,0,0,0.04)'
                          : 'rgba(0,0,0,0.12)',
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* Hover overlay on front page */}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-xl transition-colors duration-300 z-[20]"
              style={{
                backgroundColor: isHovered ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0)',
              }}
            >
              <motion.span
                className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white shadow-xl backdrop-blur-sm"
                animate={{
                  opacity: isHovered ? 1 : 0,
                  y: isHovered ? 0 : 8,
                }}
                transition={{ duration: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                View Pages
              </motion.span>
            </div>
          </div>

          {/* Page count badge */}
          <motion.div
            className="absolute bottom-2 right-2 z-[25]"
            animate={{ opacity: isHovered ? 1 : 0.7 }}
          >
            <span className="flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[0.6rem] font-bold text-white backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-2.5 w-2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {pages.length} pages
            </span>
          </motion.div>
        </div>

        {/* ── Info ── */}
        <div className="flex-1 min-w-0 pt-1 relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
              0{globalIndex + 1}
            </span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="rounded-md bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 transition-colors">
              Newsletter
            </span>
          </div>
          <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white sm:text-lg transition-colors">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
            {item.description}
          </p>

          {/* Actions */}
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setCarouselOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50 transition-all hover:border-cyan-400 dark:hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Browse Pages
            </button>

            {item.pdf && (
              <a
                href={item.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/90 px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-cyan-500/20 transition-all hover:bg-cyan-400 hover:-translate-y-0.5 active:translate-y-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download PDF
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Carousel modal */}
      <PageCarouselModal
        isOpen={carouselOpen}
        onClose={() => setCarouselOpen(false)}
        pages={pages}
        title={item.title}
        startIndex={0}
      />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════ */
export function EditorialSection() {
  return (
    <section
      id="editorial"
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
            Editorial / Long-Form Content
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Newsletters & Whitepapers
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            Editorial systems developed for long-form technical communication across digital and
            print formats. Built on disciplined hierarchy, structured layouts, and deep technical
            understanding to make complex information accessible and compelling.
          </p>
        </motion.div>

        {/* ── Publications ── */}
        <div className="space-y-14 md:space-y-20">
          {editorialData.map((item, i) => (
            <PublicationStack key={item.id} item={item} globalIndex={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
