import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageModal({ isOpen, onClose, src, alt = '', isVideo = false }) {
  const [zoomScale, setZoomScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    setZoomScale(1);
    setOffset({ x: 0, y: 0 });
    setIsPanning(false);
    setIsFullscreen(false);
  }, [isOpen, src]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape' && !document.fullscreenElement) onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Listen for fullscreen change (e.g. user presses Esc to exit fullscreen)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const handleWheel = useCallback(
    (e) => {
      if (isVideo) return;
      e.preventDefault();
      const step = e.deltaY < 0 ? 0.15 : -0.15;
      setZoomScale((prev) => {
        const next = Math.min(4, Math.max(1, prev + step));
        if (next === 1) setOffset({ x: 0, y: 0 });
        return next;
      });
    },
    [isVideo],
  );

  const handleMouseDown = useCallback(
    (e) => {
      if (isVideo || zoomScale === 1) return;
      e.preventDefault();
      setIsPanning(true);
      panStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y };
    },
    [isVideo, zoomScale, offset],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isPanning) return;
      setOffset({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
    },
    [isPanning],
  );

  const endPan = useCallback(() => setIsPanning(false), []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await containerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen not supported or blocked
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-md px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-2xl bg-slate-950 shadow-2xl [&:fullscreen]:max-h-none [&:fullscreen]:max-w-none [&:fullscreen]:rounded-none [&:fullscreen]:flex [&:fullscreen]:items-center [&:fullscreen]:justify-center [&:fullscreen]:bg-black"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Zoom controls + Fullscreen button for images */}
            {!isVideo && (
              <div className="absolute bottom-3 right-3 z-30 flex items-center gap-2">
                {/* Zoom controls */}
                <div className="flex items-center gap-1 rounded-full bg-slate-900/80 px-2 py-1 text-xs text-white">
                  <button type="button" onClick={() => setZoomScale((p) => Math.max(1, p - 0.25))} className="px-1.5 py-0.5 hover:text-cyan-300 transition-colors">−</button>
                  <span className="px-1">{Math.round(zoomScale * 100)}%</span>
                  <button type="button" onClick={() => setZoomScale((p) => Math.min(4, p + 0.25))} className="px-1.5 py-0.5 hover:text-cyan-300 transition-colors">+</button>
                </div>

                {/* Fullscreen toggle */}
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900/80 text-white hover:bg-slate-800 transition-colors"
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? (
                    /* Exit fullscreen icon (inward arrows) */
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M8 3v3a2 2 0 0 1-2 2H3" />
                      <path d="M21 8h-3a2 2 0 0 1-2-2V3" />
                      <path d="M3 16h3a2 2 0 0 1 2 2v3" />
                      <path d="M16 21v-3a2 2 0 0 1 2-2h3" />
                    </svg>
                  ) : (
                    /* Enter fullscreen icon (outward arrows — like YouTube) */
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
                      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
                      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
                      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
                    </svg>
                  )}
                </button>
              </div>
            )}

            {isVideo ? (
              <video
                src={src}
                controls
                autoPlay
                className="max-h-[85vh] max-w-[85vw] object-contain"
              />
            ) : (
              <img
                src={src}
                alt={alt}
                className="max-h-[85vh] max-w-[85vw] object-contain transition-transform duration-200 ease-out [[data-fullscreen]>&]:max-h-screen [[data-fullscreen]>&]:max-w-screen"
                style={{
                  transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoomScale})`,
                  cursor: zoomScale > 1 ? (isPanning ? 'grabbing' : 'grab') : 'default',
                  ...(isFullscreen ? { maxHeight: '100vh', maxWidth: '100vw' } : {}),
                }}
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={endPan}
                onMouseLeave={endPan}
                draggable={false}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
