import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  {
    title: 'Brand Launch Highlight',
    src: '/projects/1.!! Important.jpg',
    type: 'graphic',
    category: 'Social',
  },
  {
    title: 'BETT Event Visual',
    src: '/projects/Bett_2025_1080x1080.jpg',
    type: 'graphic',
    category: 'Event',
  },
  {
    title: 'Blood Donation Campaign',
    src: '/projects/blood donation IG.jpg',
    type: 'graphic',
    category: 'Campaign',
  },
  {
    title: 'Coming of Age – Japan',
    src: '/projects/Coming of age day_Jp_I.jpg',
    type: 'graphic',
    category: 'Editorial',
  },
  {
    title: 'Heli Reviews Thumbnail',
    src: '/projects/Heli Reviews-Oppo-Reno_13_YT thumbnail copy.jpg',
    type: 'graphic',
    category: 'Thumbnail',
  },
  {
    title: 'D9400 HDR Thumbnail',
    src: '/projects/D9400_HDR_YT_thumbnail_full range HDR zoom.jpg',
    type: 'graphic',
    category: 'Thumbnail',
  },
  {
    title: 'Device Launch Post',
    src: '/projects/Device launch post opts02b.jpg',
    type: 'graphic',
    category: 'Social',
  },
  {
    title: 'Device Hero Shot',
    src: '/projects/Device1.jpeg',
    type: 'graphic',
    category: 'Product',
  },
  {
    title: 'G200 Launch Visual',
    src: '/projects/G200_Launch.jpg',
    type: 'graphic',
    category: 'Campaign',
  },
  {
    title: 'Gaming Visual',
    src: '/projects/Gaming-2.jpg',
    type: 'graphic',
    category: 'Social',
  },
  {
    title: 'Helio G200 Variant',
    src: '/projects/Helio G200_Launch-another option.jpg',
    type: 'graphic',
    category: 'Campaign',
  },
  {
    title: 'Home Connectivity',
    src: '/projects/Home connectivity-LD-1ba.jpg',
    type: 'graphic',
    category: 'Social',
  },
  {
    title: 'HyperEngine Tech',
    src: '/projects/Hyperengine Tech.jpg',
    type: 'graphic',
    category: 'Infographic',
  },
  {
    title: 'Kompanio Infographic',
    src: '/projects/Infographic-Kompanio-540-2.jpg',
    type: 'graphic',
    category: 'Infographic',
  },
  {
    title: 'Japan EDIX Banner',
    src: '/projects/Japan-EDIX-Ceiling-Banner-4x2-opt-3_.jpg',
    type: 'graphic',
    category: 'Event',
  },
  {
    title: 'Jessica Reviews Thumbnail',
    src: '/projects/Jessica-Reviews-Redmi Pad SE 8.7.jpg',
    type: 'graphic',
    category: 'Thumbnail',
  },
  {
    title: 'Smart Home Visual',
    src: '/projects/MediaTek powered Smart Home_Instagram 1 copy.jpg',
    type: 'graphic',
    category: 'Social',
  },
  {
    title: 'Moto 8350 Ad',
    src: '/projects/motorola 8350-option-4-GDN-1200x628b.jpg',
    type: 'graphic',
    category: 'Campaign',
  },
  {
    title: 'MWC 25',
    src: '/projects/mwc 25.jpg',
    type: 'graphic',
    category: 'Event',
  },
  {
    title: 'Plastic Free Day',
    src: '/projects/Plastic free day-1.jpg',
    type: 'graphic',
    category: 'Campaign',
  },
  // In-house reviews
  {
    title: 'AI Phone Review',
    src: '/projects/In house/Ai Phone-Review.jpg',
    type: 'graphic',
    category: 'Thumbnail',
  },
  {
    title: 'Dusshera 2025',
    src: '/projects/In house/Dusshera-2025-1.jpg',
    type: 'graphic',
    category: 'Social',
  },
  {
    title: 'Poco F77 Review',
    src: '/projects/In house/Poco F77- Review-1b.jpg',
    type: 'graphic',
    category: 'Thumbnail',
  },
  {
    title: 'Infinix GT 30 Pro Review',
    src: '/projects/In house/Review-Infinix gt 30 pro.jpg',
    type: 'graphic',
    category: 'Thumbnail',
  },
  // Motion graphics
  {
    title: 'Vintage Photo Motion',
    src: '/projects/Motion Graphics/How to take vintage style photograph-with music.mp4',
    type: 'motion',
    category: 'Motion',
    isVideo: true,
  },
  {
    title: 'Music Day Motion',
    src: '/projects/Motion Graphics/Music day 5.mp4',
    type: 'motion',
    category: 'Motion',
    isVideo: true,
  },
  {
    title: 'PBM Fall Edition',
    src: '/projects/Motion Graphics/PBM fall edition_1.mp4',
    type: 'motion',
    category: 'Motion',
    isVideo: true,
  },
  {
    title: 'Smart TV Motion',
    src: '/projects/Motion Graphics/Smart TV-4.mp4',
    type: 'motion',
    category: 'Motion',
    isVideo: true,
  },
];

const filters = [
  { id: 'all', label: 'All' },
  { id: 'graphic', label: 'Graphics' },
  { id: 'motion', label: 'Motion' },
];

export function ProjectsGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const mediaRef = useRef(null);
  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false);

  const filteredItems =
    activeFilter === 'all'
      ? items
      : items.filter((item) => item.type === activeFilter);

  return (
    <section id="gallery" className="border-b border-slate-800/80 bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-heading">Gallery</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Selected graphics &amp; motion work.
            </h2>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-slate-400 sm:text-sm">
              A snapshot of social campaigns, thumbnails, event visuals, and motion pieces created
              across client and in-house projects.
            </p>
          </div>

          <div className="inline-flex self-start rounded-full border border-slate-700/80 bg-slate-900/70 p-1 text-xs text-slate-200">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`rounded-full px-3 py-1 transition ${
                  activeFilter === filter.id
                    ? 'bg-cyan-400 text-slate-950 shadow-glow'
                    : 'text-slate-300 hover:text-cyan-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.article
                key={item.title + item.src}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950/80 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {item.isVideo ? (
                    <video
                      src={encodeURI(item.src)}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      muted
                      loop
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <img
                      src={encodeURI(item.src)}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-3 pb-3 pt-6 text-[0.75rem] text-slate-100">
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-[0.7rem] text-slate-300">{item.category}</p>
                  </div>
                  <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[0.65rem] font-medium text-slate-300">
                    {item.isVideo ? 'Motion' : 'Graphic'}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md px-3 md:px-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedItem(null);
                setIsMediaFullscreen(false);
              }}
            >
              <motion.div
                className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/95"
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex flex-col gap-4 p-4 md:flex-row md:gap-6">
                  <div className="md:flex-[3]">
                    <div
                      ref={mediaRef}
                      className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-900"
                    >
                      {selectedItem.isVideo ? (
                        <video
                          src={encodeURI(selectedItem.src)}
                          className="h-full w-full object-contain"
                          controls
                          autoPlay
                        />
                      ) : (
                        <img
                          src={encodeURI(selectedItem.src)}
                          alt={selectedItem.title}
                          className="h-full w-full object-contain"
                        />
                      )}
                      <button
                        type="button"
                        className="absolute right-3 top-3 rounded-full bg-slate-900/80 px-4 py-1.5 text-sm font-medium text-slate-200 hover:bg-slate-800"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedItem(null);
                          setIsMediaFullscreen(false);
                        }}
                      >
                        Close ✕
                      </button>
                      {!selectedItem.isVideo && !isMediaFullscreen && (
                        <button
                          type="button"
                          aria-label="Fullscreen"
                          className="absolute bottom-3 right-3 rounded-full bg-slate-900/80 p-3 text-slate-200 hover:bg-slate-800"
                          onClick={(event) => {
                            event.stopPropagation();
                            if (mediaRef.current && mediaRef.current.requestFullscreen) {
                              mediaRef.current.requestFullscreen();
                            }
                            setIsMediaFullscreen(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.75"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 4H5a1 1 0 0 0-1 1v4" />
                            <path d="M15 4h4a1 1 0 0 1 1 1v4" />
                            <path d="M4 15v4a1 1 0 0 0 1 1h4" />
                            <path d="M20 15v4a1 1 0 0 1-1 1h-4" />
                            <path d="M9 4L4 9" />
                            <path d="M15 4l5 5" />
                            <path d="M9 20l-5-5" />
                            <path d="M15 20l5-5" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 w-full max-w-xs space-y-2 text-sm text-slate-100 md:mt-0 md:flex-[1]">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                      {selectedItem.isVideo ? 'Motion piece' : 'Graphic piece'}
                    </p>
                    <h3 className="text-base font-semibold">{selectedItem.title}</h3>
                    <p className="text-xs text-slate-300">{selectedItem.category}</p>
                    <p className="text-[0.75rem] text-slate-400">
                      Click outside or use the close button to return to the gallery.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}


