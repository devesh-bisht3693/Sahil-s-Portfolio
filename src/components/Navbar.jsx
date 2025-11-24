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
      className="sticky top-0 z-40 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl"
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
          <a href="#work" className="hover:text-cyan-300 transition-colors">
            Work
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

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full border border-slate-700/80 px-4 py-1.5 text-xs font-semibold text-slate-100 hover:border-cyan-400/60 hover:text-cyan-200 md:inline-flex"
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


