import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'campaigns', label: 'Campaigns', href: '#campaigns' },
  { id: 'infographics', label: 'Infographics', href: '#infographics' },
  { id: 'cobranded', label: 'Co-Branded', href: '#cobranded' },
  { id: 'editorial', label: 'Editorial', href: '#editorial' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
    <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/80 shadow-lg shadow-slate-200/20 dark:shadow-slate-950/40 border-b border-slate-200 dark:border-slate-800/80 backdrop-blur-xl'
            : 'bg-transparent'
        }`}
    >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3 group">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-fuchsia-500 p-[1.5px] shadow-glow-sm">
              <img
                src="https://res.cloudinary.com/dr4echl2l/image/upload/w_120,h_120,c_fill,g_face,q_auto,f_auto/v1771916270/Profile_-deck_it1yfk.jpg"
                alt="Sahil Chauhan"
                className="h-full w-full rounded-full object-cover"
                loading="eager"
              />
          </div>
          <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 transition-colors">Sahil Chauhan</p>
              <p className="text-[0.65rem] font-medium tracking-[0.2em] text-slate-500 dark:text-slate-400 uppercase transition-colors">Designer &amp; Illustrator</p>
          </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1.5 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="rounded-full bg-gradient-to-br from-cyan-400 via-sky-500 to-fuchsia-500 p-[1.5px] transition-all hover:shadow-glow-sm hover:-translate-y-0.5"
              >
                <span className="block rounded-full bg-white dark:bg-slate-950 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition-colors hover:text-cyan-600 dark:hover:text-cyan-300">
                  {link.label}
                </span>
              </a>
            ))}
        </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 transition-all hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300"
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Download CV */}
            <a
              href="/Sahil_Chauhan-CV-2026.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 px-4 py-2 text-xs font-semibold text-white dark:text-slate-950 shadow-glow-sm transition hover:bg-cyan-400 dark:hover:bg-cyan-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 lg:hidden transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              className="fixed top-0 right-0 z-50 h-full w-72 bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 shadow-2xl lg:hidden"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
                <p className="font-semibold text-sm text-slate-900 dark:text-slate-100">Menu</p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
          </div>
              <nav className="flex flex-col gap-1 p-4">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>
              <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <a
                  href="/Sahil_Chauhan-CV-2026.pdf"
            download
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-cyan-500 dark:bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-white dark:text-slate-950 transition hover:bg-cyan-400 dark:hover:bg-cyan-300"
          >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
            Download CV
          </a>
        </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
