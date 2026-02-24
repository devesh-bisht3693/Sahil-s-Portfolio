import { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageModal } from './ImageModal';
import youtubeData from '../data/youtube.json';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

/* ═══════════════════════════════════════════════════════
   Thumbnail Card
   ═══════════════════════════════════════════════════════ */
function ThumbnailCard({ item, onClick, delay = 0 }) {
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
      <div className="relative aspect-video overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
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

        {/* Play button badge (since these are YouTube thumbnails) */}
        <div className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-600/90 shadow-lg transition-transform duration-300 group-hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-4 w-4 ml-0.5">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>

      {/* Title below image */}
      <div className="px-4 py-3">
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white transition-colors truncate">
          {item.title}
        </h4>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   Group Block — sub-heading + 2 thumbnails
   ═══════════════════════════════════════════════════════ */
function GroupBlock({ group, onImageClick }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      className="space-y-5"
    >
      {/* Sub-heading */}
      <div>
        <h3 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl transition-colors">
          {group.group}
        </h3>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors">
          {group.groupDescription}
        </p>
      </div>

      {/* Thumbnails grid — 2 cols default, 3 cols for larger groups */}
      <div
        className={`grid grid-cols-1 gap-5 sm:grid-cols-2 ${
          group.items.length > 2 ? 'lg:grid-cols-3' : ''
        }`}
      >
        {group.items.map((item, i) => (
          <ThumbnailCard
            key={item.id}
            item={item}
            onClick={() => onImageClick(item.image, item.title)}
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
export function YouTubeSection() {
  const [modalData, setModalData] = useState(null);

  return (
    <section
      id="youtube"
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
            YouTube & Video Platform Visuals
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl transition-colors">
            High-impact thumbnails & key visuals for video campaigns.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 transition-colors sm:text-base">
            High-impact thumbnail systems and motion-aligned key visuals developed for MediaTek's
            global YouTube campaigns. Each asset is designed to communicate complex technologies,
            chipset launches, and event highlights within seconds while maintaining strong brand
            consistency.
          </p>
        </motion.div>

        {/* ── Group blocks ── */}
        <div className="space-y-14 md:space-y-20">
          {youtubeData.map((group) => (
            <GroupBlock
              key={group.id}
              group={group}
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

