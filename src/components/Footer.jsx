import { motion } from 'framer-motion';

const socialLinks = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sahil-chauhan-870953182',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Behance',
    url: 'https://www.behance.net/sahilchauhan19',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.67.767-.63.166-1.27.254-1.95.254H0V4.51h6.938v-.007zM6.545 10.16c.6 0 1.1-.15 1.46-.45.36-.3.54-.75.54-1.35 0-.37-.07-.66-.2-.88-.13-.22-.31-.39-.53-.51-.23-.12-.49-.2-.78-.24-.29-.04-.58-.06-.89-.06H3.41v3.49h3.135zm.17 5.56c.35 0 .68-.03 1-.1.32-.07.59-.18.82-.35.24-.16.43-.39.56-.68.13-.28.2-.64.2-1.09 0-.87-.23-1.49-.7-1.86-.47-.37-1.1-.56-1.9-.56H3.41v4.64h3.305zM15.4 4.24h5.96v1.62H15.4V4.24zM22.24 13.43c0-.74-.13-1.42-.4-2.02-.27-.6-.62-1.12-1.07-1.56-.45-.44-.98-.78-1.59-1.02-.61-.24-1.26-.36-1.95-.36-.7 0-1.35.12-1.96.36-.61.24-1.14.58-1.59 1.02-.45.44-.81.96-1.08 1.56-.27.6-.41 1.28-.41 2.02 0 .74.14 1.42.41 2.02.27.6.63 1.12 1.08 1.56.45.44.98.78 1.59 1.02.61.24 1.26.36 1.96.36.92 0 1.73-.22 2.42-.65.69-.43 1.22-1.1 1.58-2.01h-2.44c-.12.32-.36.58-.72.78-.36.2-.77.3-1.22.3-.68 0-1.22-.18-1.62-.55-.4-.37-.62-.92-.65-1.65h6.82v-.38h-.01zm-6.74-1.1c.08-.33.2-.63.38-.88.18-.25.4-.46.68-.62.28-.16.62-.24 1.01-.24.42 0 .77.08 1.06.23.29.15.52.36.7.61.18.25.3.54.37.86H15.5z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/xinshel/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/90 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-slate-900 dark:text-slate-50 transition-colors">
              Sahil Chauhan
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 transition-colors">
              Graphic Designer &amp; Illustrator
            </p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={link.name}
                whileHover={{ y: -2 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 transition-all hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:shadow-md dark:hover:shadow-glow-sm"
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Email + back to top */}
          <div className="flex flex-col items-center gap-3 md:items-end">
            <a
              href="mailto:sahil.chauhan111171@gmail.com"
              className="text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors"
            >
              sahil.chauhan111171@gmail.com
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 transition-all hover:border-cyan-400 hover:text-cyan-600 dark:hover:text-cyan-300 hover:-translate-y-0.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                <polyline points="18 15 12 9 6 15" />
              </svg>
              Back to top
            </button>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col gap-2 text-center text-[0.75rem] text-slate-400 dark:text-slate-500 sm:flex-row sm:justify-between transition-colors">
          <p>© {new Date().getFullYear()} Sahil Chauhan. All rights reserved.</p>
          <p>
            Built with React, Tailwind CSS &amp; Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}

