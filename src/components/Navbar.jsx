import { motion } from 'framer-motion';

const navVariants = {
  hidden: { y: -40, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] } },
};

export function Navbar() {
  return (
    <motion.header
      variants={navVariants}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <div className="relative h-9 w-9 overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-fuchsia-500 p-[1px] shadow-glow">
            <div className="flex h-full w-full items-center justify-center rounded-[14px] bg-slate-950 text-sm font-semibold text-slate-50">
              SC
            </div>
          </div>
          <div>
            <p className="text-xs font-medium tracking-[0.24em] text-slate-400 uppercase">Portfolio</p>
            <p className="text-sm font-semibold text-slate-100">Sahil Chauhan</p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-xs font-medium text-slate-300 md:flex">
          <a href="#gallery" className="hover:text-cyan-300 transition-colors">
            Gallery
          </a>
          <a href="#about" className="hover:text-cyan-300 transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-cyan-300 transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-cyan-300 transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href="https://www.linkedin.com/in/sahil-chauhan-870953182"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/70 bg-slate-900/80 text-[0.8rem] font-semibold text-slate-50 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-colors transition-shadow duration-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_26px_rgba(56,189,248,0.75)]"
            >
              in
            </a>
            <a
              href="https://www.behance.net/sahilchauhan19"
              target="_blank"
              rel="noreferrer"
              aria-label="Behance"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/70 bg-slate-900/80 text-[0.8rem] font-semibold tracking-tight text-slate-50 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-colors transition-shadow duration-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_26px_rgba(56,189,248,0.75)]"
            >
              Bē
            </a>
            <a
              href="https://www.instagram.com/xinshel/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-400/70 bg-slate-900/80 text-[0.8rem] font-semibold text-slate-50 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-colors transition-shadow duration-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_26px_rgba(56,189,248,0.75)]"
            >
              IG
            </a>
          </div>
          <a
            href="#contact"
            className="hidden rounded-full border border-cyan-400/70 bg-slate-900/80 px-4 py-1.5 text-xs font-semibold text-slate-50 shadow-[0_0_18px_rgba(56,189,248,0.35)] transition-colors transition-shadow duration-300 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-[0_0_26px_rgba(56,189,248,0.75)] md:inline-flex"
          >
            Let&apos;s talk
          </a>
          <a
            href="/Sahil-Chauhan_Resume 2025.pdf"
            download
            className="btn-primary text-xs px-4 py-1.5"
          >
            Download CV
          </a>
        </div>
      </div>
    </motion.header>
  );
}


