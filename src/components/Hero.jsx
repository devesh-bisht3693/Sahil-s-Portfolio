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
  const roles = ['Graphic Designer', 'Illustrator', 'Video Editor'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 70 : 120;
    const pauseAtEnd = 1400;
    const pauseAtStart = 500;

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

  return (
    <section
      className="relative border-b border-slate-800/80 bg-slate-950"
      style={{
        backgroundImage:
          "linear-gradient(135deg, rgba(15,23,42,0.96), rgba(15,23,42,0.9)), url('/banner-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-4 pb-20 pt-20 md:flex-row md:items-center md:px-6 md:pb-24 md:pt-24 lg:gap-20">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="flex-1 space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-900/80 px-0.5 py-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-200">
            Welcome to my portfolio
          </span>

          <div className="space-y-4">
            <h1 className="font-display text-4xl font-semibold leading-tight tracking-tight text-slate-50 sm:text-5xl lg:text-[3.4rem]">
              Hi! I&apos;m Sahil,
              <br />
              <span className="min-w-[11ch] bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-400 bg-clip-text text-transparent">
                {displayText || '\u00A0'}
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              I design bold, story-driven visuals for brands, campaigns, and digital products. From
              identity systems to motion graphics, I help ideas stand out on every screen.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a href="#gallery" className="btn-primary">
              View Gallery
            </a>
            <a
              href="/Sahil-Chauhan_Resume 2025.pdf"
              download
              className="btn-ghost"
            >
              Download CV
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-[0.7rem] text-slate-400">
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-cyan-400/70" />
              <span>Brand identity &amp; logo systems</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-fuchsia-400/70" />
              <span>Social media &amp; campaign visuals</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-6 rounded-full bg-emerald-400/70" />
              <span>Motion, UI accents &amp; layout design</span>
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
              alt="Astronaut floating in space representing creative design"
              className="h-full w-full object-contain drop-shadow-[0_35px_120px_rgba(15,23,42,0.9)]"
              animate={{ y: [0, -40, 0] }}
              transition={{
                duration: 3.2,
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


