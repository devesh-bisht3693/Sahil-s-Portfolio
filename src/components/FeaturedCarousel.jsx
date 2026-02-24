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
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-6 md:px-10 md:pt-20 md:pb-8 lg:px-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-600 dark:text-cyan-400">
              Featured Work
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
              Curated projects from recent campaigns.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-slate-500 dark:text-slate-400 transition-colors">
            A handpicked selection of branding, campaign, and event work across digital and print.
          </p>
        </motion.div>
      </div>

      {/* ── Carousel (matched width) ── */}
      <div className="mx-auto max-w-7xl px-6 pb-16 md:px-10 md:pb-20 lg:px-14">
        <div
          className="relative overflow-hidden rounded-2xl bg-slate-950"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* ── Parent: two-child layout ── */}
          <div className="relative flex h-[420px] sm:h-[450px] md:h-[500px] lg:h-[540px]">

            {/* ── CHILD 1: Text side (left) ── */}
            <div className="relative z-10 flex w-full flex-col justify-center px-6 py-8 sm:w-[55%] md:w-[50%] md:px-10 lg:px-12">
              {/* Dark-to-transparent gradient that bleeds rightward over the image */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950 to-slate-950/0" />
              {/* Extra soft fade extending further right for seamless blend */}
              <div className="pointer-events-none absolute inset-y-0 -right-24 w-32 bg-gradient-to-r from-slate-950/80 to-transparent" />
              {/* Subtle accent glow */}
              <div className="pointer-events-none absolute top-1/2 left-[15%] -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/[0.06] blur-[90px]" />
              <div className="pointer-events-none absolute bottom-8 left-[8%] h-40 w-40 rounded-full bg-rose-500/[0.07] blur-[70px]" />

              {/* Text content */}
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="space-y-3"
                  >
                    {/* Spotlight tag */}
                    <motion.p
                      custom={0}
                      variants={textVariants}
                      className="text-xs font-bold tracking-wider text-rose-400/90"
                    >
                      #{activeIndex + 1} Spotlight
                    </motion.p>

                    {/* Title */}
                    <motion.h3
                      custom={1}
                      variants={textVariants}
                      className="font-display text-2xl font-extrabold leading-[1.1] text-white sm:text-3xl md:text-4xl lg:text-[2.8rem] tracking-tight"
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

                    {/* Description */}
                    <motion.p
                      custom={3}
                      variants={textVariants}
                      className="max-w-md text-sm leading-relaxed text-slate-300/80 md:text-[0.92rem]"
                    >
                      {current.description}
                    </motion.p>

                    {/* CTA button */}
                    <motion.div
                      custom={4}
                      variants={textVariants}
                      className="pt-2"
                    >
                      <button
                        type="button"
                        onClick={() => setModalItem(current)}
                        className="inline-flex items-center gap-2 rounded-full bg-cyan-500/90 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 transition-all hover:bg-cyan-400 hover:shadow-cyan-400/35 hover:-translate-y-0.5 active:translate-y-0"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
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

            {/* ── CHILD 2: Image side (right) ── */}
            <div className="absolute inset-0 sm:relative sm:w-[45%] md:w-[50%]">
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

              {/* Blend gradient: fades image into the text side (left edge) */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[40%] bg-gradient-to-r from-slate-950 to-transparent z-10" />
              {/* Soft top/bottom vignette on image */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/30 z-10" />
              {/* Warm glow on image side */}
              <div className="pointer-events-none absolute top-1/3 right-[8%] h-44 w-44 rounded-full bg-amber-400/[0.04] blur-[80px] z-10" />

              {/* Mobile overlay — on small screens the image is behind the text, so darken more */}
              <div className="pointer-events-none absolute inset-0 bg-slate-950/60 sm:hidden z-10" />
            </div>

            {/* ── Navigation arrows ── */}
            <div className="absolute right-3 sm:right-4 md:right-5 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2">
              <button
                type="button"
                onClick={() => paginate(1)}
                aria-label="Next slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-md border border-white/[0.06] transition-all hover:bg-white/[0.15] hover:text-white hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => paginate(-1)}
                aria-label="Previous slide"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] text-white/80 backdrop-blur-md border border-white/[0.06] transition-all hover:bg-white/[0.15] hover:text-white hover:scale-105 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
            </div>

            {/* ── Progress indicators (bottom) ── */}
            <div className="absolute bottom-0 left-0 right-0 z-20">
              <div className="px-6 md:px-10 lg:px-12 pb-4">
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
