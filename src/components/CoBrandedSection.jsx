import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageModal } from './ImageModal';
import cobrandedData from '../data/cobranded.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Case-Study Card (main featured visual)
   ═══════════════════════════════════════════════════════ */
function CaseStudyCard({ item, index }) {
  const [expanded, setExpanded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-white dark:bg-slate-900/50 shadow-sm dark:shadow-lg transition-colors"
    >
      {/* ── Image ── */}
      <div
        className="group relative aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800/50 cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />
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

      {/* ── Content ── */}
      <div className="px-6 py-6 md:px-8 md:py-7">
        {/* Number + Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl transition-colors">
          {item.title}
        </h3>

        {/* Summary */}
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
          {item.summary}
        </p>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-5 space-y-5 border-t border-slate-200 dark:border-slate-800/70 pt-5 transition-colors">
                {item.objective && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                      <span className="h-px w-4 bg-cyan-500/50" />
                      Objective
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
                      {item.objective}
                    </p>
                  </div>
                )}

                {item.approach && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                      <span className="h-px w-4 bg-cyan-500/50" />
                      Approach
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
                      {item.approach}
                    </p>
                  </div>
                )}

                {item.outcome && (
                  <div>
                    <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-cyan-600 dark:text-cyan-400">
                      <span className="h-px w-4 bg-cyan-500/50" />
                      Outcome
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
                      {item.outcome}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 dark:bg-slate-800/70 px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50 transition-all hover:border-cyan-400 dark:hover:border-cyan-400/50 hover:text-cyan-600 dark:hover:text-cyan-300"
          >
            {expanded ? 'Show Less' : 'Read Case Study'}
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <polyline points="6 9 12 15 18 9" />
            </motion.svg>
          </button>
        </div>
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
   Exploration Card (simpler gallery card)
   ═══════════════════════════════════════════════════════ */
function ExplorationCard({ item, index }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col"
    >
      {/* Image */}
      <div
        className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-900/50 shadow-sm cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
        onClick={() => setModalOpen(true)}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
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

      {/* Info */}
      <div className="mt-4 px-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-base font-bold tracking-tight text-slate-900 dark:text-white transition-colors">
          {item.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300 line-clamp-2 transition-colors">
          {item.summary}
        </p>
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
export function CoBrandedSection() {
  const caseStudies = cobrandedData.filter((d) => d.type === 'case-study');
  const explorations = cobrandedData.filter((d) => d.type === 'exploration');

  return (
    <section
      id="cobranded"
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
            Co-Branded Product Campaign Visuals
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            Co-branded campaign visuals with OEM partners.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            Focused on positioning MediaTek chipsets as the performance core while preserving each
            partner's brand identity, product language, and market positioning.
          </p>
        </motion.div>

        {/* ── Case study cards ── */}
        <div className="space-y-10 md:space-y-14">
          {caseStudies.map((item, i) => (
            <CaseStudyCard key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* ── Exploration sub-section ── */}
        {explorations.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
              className="mt-14 mb-10 md:mt-20 md:mb-12"
            >
              <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-xl transition-colors">
                Exploration & Concept Directions
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors">
                Scalable co-branded visual concepts developed to adapt the chipset-hero approach
                across multiple OEM devices.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:gap-10">
              {explorations.map((item, i) => (
                <ExplorationCard key={item.id} item={item} index={caseStudies.length + i} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

