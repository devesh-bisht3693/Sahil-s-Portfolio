import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems } from '../data/galleryItems';

const filters = [
  { id: 'all', label: 'All' },
  { id: 'graphic', label: 'Graphics' },
  { id: 'motion', label: 'Motion' },
];

function LazyMedia({ item }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '0px 0px 120px 0px', threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-[4/3] overflow-hidden">
      {isVisible ? (
        item.isVideo ? (
          <video
            src={encodeURI(item.src)}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            muted
            loop
            autoPlay
            playsInline
            preload="metadata"
          />
        ) : (
          <img
            src={encodeURI(item.src)}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        )
      ) : (
        <div className="h-full w-full animate-pulse bg-slate-900/80" />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export function ProjectsGallery() {
  const INITIAL_VISIBLE = 9;
  const LOAD_MORE_STEP = 9;

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const mediaRef = useRef(null);
  const [isMediaFullscreen, setIsMediaFullscreen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);
  const [zoomOffset, setZoomOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  const filteredItems =
    activeFilter === 'all'
      ? galleryItems
      : galleryItems.filter((item) => item.type === activeFilter);

  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [activeFilter]);

  useEffect(() => {
    // Reset zoom/fullscreen state when switching items or closing modal
    setIsMediaFullscreen(false);
    setZoomScale(1);
    setZoomOffset({ x: 0, y: 0 });
    setIsPanning(false);
  }, [selectedItem]);

  const handleWheelZoom = (event) => {
    if (!selectedItem || selectedItem.isVideo) return;
    event.preventDefault();
    event.stopPropagation();

    const delta = -event.deltaY;
    const step = delta > 0 ? 0.1 : -0.1;

    setZoomScale((prev) => {
      const next = Math.min(3.5, Math.max(1, prev + step));
      if (next === 1) {
        setZoomOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleMouseDown = (event) => {
    if (!selectedItem || selectedItem.isVideo || zoomScale === 1) return;
    event.preventDefault();
    event.stopPropagation();
    setIsPanning(true);
    panStartRef.current = {
      x: event.clientX - zoomOffset.x,
      y: event.clientY - zoomOffset.y,
    };
  };

  const handleMouseMove = (event) => {
    if (!isPanning) return;
    event.preventDefault();
    event.stopPropagation();
    const x = event.clientX - panStartRef.current.x;
    const y = event.clientY - panStartRef.current.y;
    setZoomOffset({ x, y });
  };

  const endPan = (event) => {
    if (event) {
      event.stopPropagation();
    }
    setIsPanning(false);
  };

  const visibleItems = filteredItems.slice(0, visibleCount);

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
            <p className="mt-2 text-[0.7rem] text-slate-500">
              All work © Sahil Chauhan. Please do not reproduce without permission.
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
            {visibleItems.map((item) => (
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
                <LazyMedia item={item} />

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

        {visibleCount < filteredItems.length && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="btn-ghost text-xs"
              onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
            >
              Load more work
            </button>
          </div>
        )}

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
                          className="h-full w-full object-contain cursor-grab transition-transform duration-300 ease-out active:cursor-grabbing"
                          style={{
                            transform: `translate(${zoomOffset.x}px, ${zoomOffset.y}px) scale(${zoomScale})`,
                          }}
                          onWheel={handleWheelZoom}
                          onMouseDown={handleMouseDown}
                          onMouseMove={handleMouseMove}
                          onMouseUp={endPan}
                          onMouseLeave={endPan}
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
                      {!selectedItem.isVideo && !isMediaFullscreen && zoomScale === 1 && (
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


