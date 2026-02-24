import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
};

export function Hero() {
  const roles = ['Graphic Designer', 'Illustrator'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 60 : 110;
    const pauseAtEnd = 1600;
    const pauseAtStart = 400;

    let timeoutId;

    if (!isDeleting && displayText === currentRole) {
      timeoutId = setTimeout(() => setIsDeleting(true), pauseAtEnd);
    } else if (isDeleting && displayText === '') {
      timeoutId = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, pauseAtStart);
    } else {
      timeoutId = setTimeout(() => {
        const nextLength = displayText.length + (isDeleting ? -1 : 1);
        setDisplayText(currentRole.slice(0, nextLength));
      }, typingSpeed);
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, roleIndex, roles]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center border-b border-slate-200 dark:border-slate-800/80 bg-gradient-to-br from-slate-50 via-white to-cyan-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900 transition-colors"
    >
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-cyan-200/30 dark:bg-cyan-500/10 blur-3xl" />
        <div className="absolute top-1/2 -left-40 h-96 w-96 rounded-full bg-fuchsia-200/20 dark:bg-fuchsia-500/8 blur-3xl" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-4 py-20 md:flex-row md:items-center md:px-6 md:py-24 lg:gap-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-6"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 px-3 py-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-600 dark:text-slate-300 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Available for work
          </motion.span>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:text-[3.5rem] transition-colors">
              Hi! I&apos;m Sahil Chauhan
            </h1>
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-[2.8rem]">
              <span className="bg-gradient-to-r from-cyan-500 via-sky-500 to-fuchsia-500 dark:from-cyan-300 dark:via-sky-400 dark:to-fuchsia-400 bg-clip-text text-transparent">
                {displayText}
              </span>
              <span className="ml-0.5 inline-block w-[2px] h-[1em] bg-cyan-500 dark:bg-cyan-400 animate-pulse align-middle" />
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-300 sm:text-base transition-colors">
              I design strategic visual systems for brands, campaigns, and digital platforms. From
              identity and product launches to performance creatives and editorial design, my work
              blends clarity, structure, and strong visual storytelling across every touchpoint.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#featured"
              onClick={(e) => handleNavClick(e, '#featured')}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 dark:bg-cyan-400 px-6 py-2.5 text-sm font-semibold text-white dark:text-slate-950 shadow-glow-sm transition hover:bg-cyan-400 dark:hover:bg-cyan-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              View Work
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
            <a
              href="/Sahil_Chauhan-CV-2026.pdf"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 dark:border-slate-700/80 px-6 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-100/90 transition hover:border-cyan-400 dark:hover:border-cyan-400/60 hover:text-cyan-600 dark:hover:text-cyan-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-[0.7rem] text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-cyan-500/70 dark:bg-cyan-400/70" />
              <span>Brand identity &amp; logo systems</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-fuchsia-500/70 dark:bg-fuchsia-400/70" />
              <span>Social media &amp; campaign visuals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-sky-500/70 dark:bg-sky-400/70" />
              <span>Motion graphics &amp; infographics</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-1 justify-center md:justify-end"
        >
          <div className="relative h-80 w-full max-w-md md:h-96">
            <motion.img
              src="/header-img.svg"
              alt="Creative design illustration"
              className="h-full w-full object-contain drop-shadow-2xl"
              animate={{ y: [0, -30, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'easeInOut',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
