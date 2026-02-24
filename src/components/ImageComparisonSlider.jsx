import { useRef, useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  aspectRatio = 'aspect-[4/3]',
  className = '',
}) {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const updateSliderPosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(true);
      updateSliderPosition(e.clientX);
    },
    [updateSliderPosition],
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.clientX);
    },
    [isDragging, updateSliderPosition],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleTouchStart = useCallback(
    (e) => {
      setIsDragging(true);
      updateSliderPosition(e.touches[0].clientX);
    },
    [updateSliderPosition],
  );

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      updateSliderPosition(e.touches[0].clientX);
    },
    [isDragging, updateSliderPosition],
  );

  const handleTouchEnd = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
      className={className}
    >
      <div
        ref={containerRef}
        className={`group relative ${aspectRatio} w-full select-none overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800/70 shadow-lg dark:shadow-xl transition-colors`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ cursor: isDragging ? 'ew-resize' : 'default' }}
      >
        {/* After image (bottom layer) */}
        <img
          src={afterImage}
          alt={afterLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Before image (top layer, clipped) */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Labels */}
        <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-white/90 dark:bg-slate-900/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-700 dark:text-slate-200 backdrop-blur-sm transition-colors">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 dark:bg-slate-900/80 px-3 py-1 text-xs font-medium uppercase tracking-widest text-slate-700 dark:text-slate-200 backdrop-blur-sm transition-colors">
          {afterLabel}
        </span>

        {/* Slider line */}
        <div
          className="absolute top-0 bottom-0 z-10 w-[3px]"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="h-full w-full bg-white/90 shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
        </div>

        {/* Slider handle */}
        <div
          className="absolute top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-cyan-500 dark:bg-slate-900/80 shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
          style={{ left: `${sliderPosition}%` }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-white"
          >
            <polyline points="10 6 6 12 10 18" />
            <polyline points="14 6 18 12 14 18" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
