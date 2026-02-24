import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageModal } from './ImageModal';
import brandingData from '../data/branding.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Image Card
   ═══════════════════════════════════════════════════════ */
function ImageCard({ src, alt, onClick, delay = 0 }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 bg-slate-50 dark:bg-slate-900/50 shadow-sm cursor-pointer transition-all duration-300 hover:border-cyan-300 dark:hover:border-cyan-400/60 hover:shadow-lg dark:hover:shadow-cyan-500/5"
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          loading="lazy"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
          <span className="flex items-center gap-2 rounded-full bg-white/90 dark:bg-slate-900/90 px-4 py-2 text-xs font-semibold text-slate-900 dark:text-white shadow-xl opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            View Full Image
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Brand Project Block — title, description + images
   ═══════════════════════════════════════════════════════ */
function BrandBlock({ project, index, onImageClick }) {
  const isEven = index % 2 === 0;
  const hasMultipleImages = project.images.length > 1;

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className={`flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12 ${
        !isEven ? 'lg:flex-row-reverse' : ''
      }`}
    >
      {/* ── Text side ── */}
      <div className="lg:w-2/5 lg:sticky lg:top-28 shrink-0">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
            0{index + 1}
          </span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
          <span className="rounded-md bg-slate-100 dark:bg-slate-800/70 px-2 py-0.5 text-[0.65rem] font-medium text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 transition-colors">
            Brand Identity
          </span>
        </div>
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl transition-colors">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300 transition-colors">
          {project.description}
        </p>
      </div>

      {/* ── Images side ── */}
      <div
        className={`lg:w-3/5 grid gap-4 sm:gap-5 ${
          hasMultipleImages ? 'grid-cols-2' : 'grid-cols-1'
        }`}
      >
        {project.images.map((img, i) => (
          <ImageCard
            key={i}
            src={img}
            alt={`${project.title} — ${i + 1}`}
            onClick={() => onImageClick(img, project.title)}
            delay={i * 0.08}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Main Section
   ═══════════════════════════════════════════════════════ */
export function BrandingSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section
      id="branding"
      className="border-b border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-950/80 transition-colors"
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
            Branding & Identity Systems
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            End-to-end brand development from concept to execution.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            High-impact thumbnail systems and motion-aligned key visuals developed for MediaTek's
            global YouTube campaigns. Each asset is designed to communicate complex technologies,
            chipset launches, and event highlights within seconds while maintaining strong brand
            consistency.
          </p>
        </motion.div>

        {/* ── Brand blocks ── */}
        <div className="space-y-16 md:space-y-24">
          {brandingData.map((project, i) => (
            <BrandBlock
              key={project.id}
              project={project}
              index={i}
              onImageClick={(src, alt) => setModalData({ src, alt })}
            />
          ))}
        </div>
      </div>

      {/* Zoom modal */}
      <ImageModal
        isOpen={!!modalData}
        onClose={() => setModalData(null)}
        src={modalData?.src}
        alt={modalData?.alt}
      />
    </section>
  );
}

