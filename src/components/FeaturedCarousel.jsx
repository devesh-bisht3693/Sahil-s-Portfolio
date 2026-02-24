import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageModal } from './ImageModal';
import featured from '../data/featured.json';

const AUTOPLAY_INTERVAL = 5000;

const imageVariants = {
  enter: (direction) => ({
    opacity: 0,
    scale: 1.06,
    x: direction > 0 ? '3%' : '-3%',
  }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] },
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.97,
    x: direction > 0 ? '-3%' : '3%',
    transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
  }),
};

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.6, ease: [0.19, 1, 0.22, 1] },
  }),
};

export function FeaturedCarousel() {
  const [[activeIndex, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const timerRef = useRef(null);

  const total = featured.length;
  const current = featured[activeIndex];

  const paginate = useCallback(
    (dir) => {
      setSlide(([prev]) => {
        const next = (prev + dir + total) % total;
        return [next, dir];
      });
    },
    [total],
  );

  const goTo = useCallback((index) => {
    setSlide(([prev]) => [index, index > prev ? 1 : -1]);
  }, []);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setInterval(() => paginate(1), AUTOPLAY_INTERVAL);
    return () => clearInterval(timerRef.current);
  }, [isPaused, paginate, activeIndex]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowRight') paginate(1);
      if (e.key === 'ArrowLeft') paginate(-1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [paginate]);

  return (
    <section id="featured" className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors">
      {/* ── Section heading ── */}
      <div className="mx-auto max-w-7xl px-4 pt-16 pb-6 md:px-6 md:pt-20 md:pb-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-3"
        >
          <p className="section-heading">
            Featured Work
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Curated projects from recent campaigns.
          </h2>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 transition-colors sm:text-[0.95rem]">
            A handpicked selection of branding, campaign, and event work across digital and print.
          </p>
        </motion.div>
      </div>

      {/* ── Carousel (matched width) ── */}
      <div className="mx-auto max-w-[90rem] px-4 pb-16 md:px-6 md:pb-20 lg:px-8">
        <div
          className="relative overflow-hidden rounded-2xl bg-slate-950"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ── Parent: stacked on mobile, side-by-side on sm+ ── */}
          <div className="relative flex flex-col sm:flex-row sm:h-[450px] md:h-[500px] lg:h-[540px]">

            {/* ── Image (top on mobile, right on sm+) ── */}
            <div className="relative h-[220px] xs:h-[260px] overflow-hidden sm:h-auto sm:w-[60%] md:w-[70%] order-first sm:order-last">
              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0"
                >
                  <img
                    src={current.image}
                    alt={current.title}
                    className="h-full w-full object-cover"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Mobile: bottom gradient blending seamlessly into text panel */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent z-10 sm:hidden" />

              {/* Desktop: left blend gradient (same as original) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-slate-950 to-transparent z-10 hidden sm:block" />
              {/* Desktop: soft top/bottom vignette on image */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 z-10 hidden sm:block" />
              {/* Desktop: warm glow on image side */}
              <div className="pointer-events-none absolute top-1/3 right-[8%] h-44 w-44 rounded-full bg-amber-400/[0.04] blur-[80px] z-10 hidden sm:block" />

              {/* Navigation arrows (inside image so they stay on image area) */}
              <div className="absolute right-3 sm:right-4 md:right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
                <button
                  type="button"
                  onClick={() => paginate(1)}
                  aria-label="Next slide"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-md border border-white/[0.06] transition-all hover:bg-white/[0.15] hover:text-white hover:scale-105 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => paginate(-1)}
                  aria-label="Previous slide"
                  className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-md border border-white/[0.06] transition-all hover:bg-white/[0.15] hover:text-white hover:scale-105 active:scale-95"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5 sm:h-4 sm:w-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* ── Text (bottom panel on mobile, left side on sm+) ── */}
            <div className="relative z-10 flex flex-col justify-center px-5 pb-12 pt-3 xs:pt-4 sm:w-[40%] sm:px-6 sm:py-8 sm:pb-8 md:w-[30%] md:px-10 lg:px-12 order-last sm:order-first">
              {/* Desktop gradients (hidden on mobile — mobile uses solid dark bg from parent) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-950/0 hidden sm:block" />
              <div className="pointer-events-none absolute inset-y-0 -right-24 w-32 bg-gradient-to-r from-slate-950/80 to-transparent hidden sm:block" />
              {/* Subtle accent glow (sm+ only) */}
              <div className="pointer-events-none absolute top-1/2 left-[15%] -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/[0.06] blur-[90px] hidden sm:block" />
              <div className="pointer-events-none absolute bottom-8 left-[8%] h-40 w-40 rounded-full bg-rose-500/[0.07] blur-[70px] hidden sm:block" />

              {/* Mobile: subtle top glow for visual interest */}
              <div className="pointer-events-none absolute top-0 left-[20%] h-20 w-40 rounded-full bg-cyan-500/[0.05] blur-[50px] sm:hidden" />

              {/* Text content */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-2.5 sm:space-y-3"
                  >
                    {/* Spotlight tag */}
                    <motion.p
                      custom={0}
                      variants={textVariants}
                      className="text-[0.65rem] xs:text-xs font-bold tracking-wider text-rose-400/90"
                    >
                      #{activeIndex + 1} Spotlight
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                      custom={1}
                      variants={textVariants}
                      className="font-display text-xl xs:text-2xl font-extrabold leading-[1.15] text-white sm:text-3xl md:text-[2rem] lg:text-[2.5rem] tracking-tight"
                    >
                      {current.title}
                    </motion.h3>

                    {/* Tags */}
                    <motion.div
                      custom={2}
                      variants={textVariants}
                      className="flex flex-wrap items-center gap-2 text-sm"
                    >
                      {current.tags?.map((tag, i) => (
                        <span key={tag} className="rounded-md bg-white/[0.07] px-2.5 py-0.5 text-xs font-medium text-slate-300/90 border border-white/[0.06]">
                          {tag}
                        </span>
                      ))}
                      <span className="h-1 w-1 rounded-full bg-slate-500/60" />
                      <span className="text-xs font-medium text-slate-400/70">
                        {activeIndex + 1} / {total}
                      </span>
                    </motion.div>

                    {/* Description — hidden on tiny screens, shown from xs */}
                    <motion.p
                      custom={3}
                      variants={textVariants}
                      className="hidden xs:block max-w-md text-[0.82rem] leading-relaxed text-slate-300/80 sm:text-sm md:text-[0.92rem]"
                    >
                      {current.description}
                    </motion.p>

                    {/* CTA button */}
                    <motion.div
                      custom={4}
                      variants={textVariants}
                      className="pt-1 sm:pt-2"
                    >
                      <button
                        type="button"
                        onClick={() => setModalItem(current)}
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-500/90 px-5 py-2 xs:px-6 xs:py-2.5 text-xs xs:text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/35 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 xs:h-4 xs:w-4">
                          <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                          <line x1="11" y1="8" x2="11" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <line x1="8" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        View Project
                      </button>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* ── Progress indicators (bottom) ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <div className="px-5 pb-3 sm:px-6 sm:pb-4 md:px-10 lg:px-12">
                <div className="flex items-center gap-2">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      className="group relative h-1 overflow-hidden rounded-full transition-all duration-300"
                      style={{ width: i === activeIndex ? '2rem' : '0.5rem' }}
                    >
                      <span
                        className={`absolute inset-0 rounded-full transition-colors duration-300 ${
                          i === activeIndex ? 'bg-cyan-400/80' : 'bg-white/20 group-hover:bg-white/40'
                        }`}
                      />
                      {i === activeIndex && !isPaused && (
                        <motion.span
                          className="absolute inset-y-0 left-0 rounded-full bg-white/50"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: AUTOPLAY_INTERVAL / 1000, ease: 'linear' }}
                          key={`progress-${activeIndex}`}
                        />
                      )}
                    </button>
                  ))}
                  <span className="ml-3 text-[0.65rem] font-medium text-white/30 tracking-wider">
                    {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Image modal ── */}
      <ImageModal
        isOpen={!!modalItem}
        onClose={() => setModalItem(null)}
        src={modalItem?.image}
        alt={modalItem?.title}
      />
    </section>
  );
}
