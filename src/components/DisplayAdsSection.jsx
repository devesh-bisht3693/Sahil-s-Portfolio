import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageModal } from './ImageModal';
import displayAdsData from '../data/displayads.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Single Display Ad Card
   ═══════════════════════════════════════════════════════ */
function AdCard({ item, index }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col"
    >
      <div
        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-900/50 shadow-sm cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-square overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
            <span className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-5 py-2.5 text-sm font-semibold text-slate-900 dark:text-white shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              View Full Image
            </span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="mt-3 px-1">
        <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
          0{index + 1}
        </span>
        <h3 className="mt-0.5 text-sm font-semibold tracking-tight text-slate-900 dark:text-white transition-colors">
          {item.title}
        </h3>
      </div>

      {/* Zoom modal */}
      <ImageModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        src={item.image}
        alt={item.title}
      />
    </motion.article>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════ */
export function DisplayAdsSection() {
  return (
    <section
      id="display-ads"
      className="border-b border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-950 transition-colors"
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
            High-Impact Display & Performance Ads
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Chipset Focused Display Campaign Series
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            Performance-driven display campaigns created across multiple MediaTek chipset tiers,
            designed for scalable deployment across Google Display Network and retail media platforms.
            Each visual balances technical precision with strong product positioning, optimized for
            multi-size adaptation and high-visibility environments.
          </p>
        </motion.div>

        {/* ── Grid ── */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
          {displayAdsData.map((item, i) => (
            <AdCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

