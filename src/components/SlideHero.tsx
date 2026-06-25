import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSlides } from '../data/queries/storeQueries';
import { ChevronLeft, ChevronRight, Sparkles, MessageCircleCode } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export const SlideHero: React.FC = () => {
  const navigate = useNavigate();
  const { data: slides, isLoading } = useSlides();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!slides || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides]);

  if (isLoading || !slides || slides.length === 0) {
    return (
      <div className="relative h-[480px] w-full rounded-2xl bg-neutral-900 border border-white/5 overflow-hidden animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex flex-col justify-center px-12 space-y-4">
          <div className="h-4 w-32 bg-neutral-800 rounded"></div>
          <div className="h-10 w-96 bg-neutral-800 rounded"></div>
          <div className="h-6 w-[500px] bg-neutral-800 rounded"></div>
          <div className="h-10 w-44 bg-neutral-800 rounded"></div>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const activeSlide = slides[current];

  return (
    <div className="relative h-full min-h-[350px] md:min-h-[440px] w-full overflow-hidden rounded-2xl border border-white/5 bg-neutral-950">
      {/* Background slide view with Framer Motion fade-in transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          {/* Cover image */}
          <img
            src={activeSlide.image}
            alt={activeSlide.title}
            className="h-full w-full object-cover opacity-40 select-none pointer-events-none"
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-2xl z-10 select-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center space-x-1.5 rounded-full bg-orange-500/15 border border-orange-500/25 px-3 py-1 text-xs font-semibold text-orange-500 font-mono tracking-wider">
              <Sparkles className="h-3 w-3 animate-spin" />
              <span>SÉLECTION OFFICIELLE</span>
            </div>

            <h1 className="font-display text-2xl md:text-4xl lg:text-5xl font-black tracking-tight text-white leading-none">
              {activeSlide.title}
            </h1>

            {activeSlide.subtitle && (
              <p className="text-xs md:text-sm text-neutral-300 leading-relaxed max-w-lg">
                {activeSlide.subtitle}
              </p>
            )}

            <div className="pt-4 flex flex-wrap gap-4">
              {activeSlide.ctaLabel && activeSlide.ctaUrl && (
                <Button
                  onClick={() => navigate(activeSlide.ctaUrl!)}
                  className="bg-white hover:bg-neutral-100 text-neutral-950 font-black tracking-wider uppercase h-11 px-8 rounded-full transition-transform hover:scale-105 shadow-xl shadow-black/30"
                >
                  {activeSlide.ctaLabel}
                </Button>
              )}
              
              {/* WhatsApp direct assist button */}
              <a
                href="https://wa.me/21622111222"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center space-x-2 rounded-full bg-neutral-900/80 border border-white/10 hover:bg-neutral-900 text-xs text-white px-6 h-11 backdrop-blur-sm transition-all"
              >
                <MessageCircleCode className="h-4 w-4 text-green-500" />
                <span>WhatsApp Assist</span>
              </a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots navigation indicators inside a beautiful translucent capsule centered at bottom */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex justify-center z-20">
        <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === current ? 'w-5 bg-white opacity-100' : 'w-2.5 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Left/Right manual arrows vertically centered on edges exactly like Driffle */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/10 bg-neutral-950/60 p-2.5 text-white hover:text-orange-500 hover:bg-neutral-950 transition-all backdrop-blur-sm hidden sm:block"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/10 bg-neutral-950/60 p-2.5 text-white hover:text-orange-500 hover:bg-neutral-950 transition-all backdrop-blur-sm hidden sm:block"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};
