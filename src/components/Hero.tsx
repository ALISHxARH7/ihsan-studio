'use client';

import { motion } from 'framer-motion';
import AnimatedBackground from './AnimatedBackground';

export default function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-warm-white">
      <AnimatedBackground />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-warm-white/40 via-transparent to-warm-white pointer-events-none" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.4em] text-accent uppercase mb-8">
            Architecture &amp; Design
          </p>

          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-graphite tracking-[0.08em] leading-none">
            IHSAN
          </h1>

          <div className="flex items-center justify-center gap-4 mt-4 mb-8">
            <span className="w-12 h-px bg-accent-light" />
            <span className="text-[10px] tracking-[0.5em] text-muted uppercase">
              Studio
            </span>
            <span className="w-12 h-px bg-accent-light" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-display text-lg sm:text-xl text-muted-dark font-light italic max-w-xl mx-auto mb-12"
        >
          Создаём пространства, наполненные смыслом и красотой
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <a
            href="#contact"
            className="inline-block border border-accent text-accent px-10 py-4 text-[12px] tracking-[0.25em] uppercase transition-all duration-500 hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/10"
          >
            Заказать услуги
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[9px] tracking-[0.3em] text-muted uppercase">
            Scroll
          </span>
          <span className="w-px h-8 bg-accent-light" />
        </motion.div>
      </motion.div>
    </section>
  );
}
