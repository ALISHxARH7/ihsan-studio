'use client';

import { motion } from 'framer-motion';
import projects from '@/data/projects.json';

const categoryColors: Record<string, string> = {
  'Архитектура': 'bg-accent/10 text-accent',
  'Интерьер': 'bg-graphite/5 text-graphite',
  'Коммерция': 'bg-accent-light/30 text-accent-dark',
};

const placeholderGradients = [
  'from-[#d4c4a8]/40 via-[#e8e6e1]/60 to-[#c4b393]/30',
  'from-[#e8e6e1]/50 via-[#d4c4a8]/30 to-[#f5f4f0]/60',
  'from-[#c4b393]/30 via-[#e8e6e1]/50 to-[#d4c4a8]/40',
  'from-[#f5f4f0]/60 via-[#d4c4a8]/40 to-[#e8e6e1]/50',
  'from-[#d4c4a8]/30 via-[#c4b393]/20 to-[#e8e6e1]/40',
  'from-[#e8e6e1]/40 via-[#f5f4f0]/30 to-[#d4c4a8]/50',
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[11px] tracking-[0.4em] text-accent uppercase mb-4">
            Наши работы
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-graphite tracking-wide">
            Портфолио
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 sm:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="portfolio-item group"
            >
              <div className="relative overflow-hidden bg-warm-gray cursor-pointer">
                {/* Placeholder gradient (replace with real images) */}
                <div
                  className={`bg-gradient-to-br ${placeholderGradients[idx % placeholderGradients.length]} ${
                    project.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[4/3]'
                  } transition-transform duration-700 group-hover:scale-105`}
                >
                  {/* Architectural line decoration */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <div className="w-24 h-24 border border-accent/40 rotate-45" />
                    <div className="absolute w-16 h-16 border border-accent/20 rotate-12" />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-graphite/0 group-hover:bg-graphite/60 transition-all duration-500 flex items-end">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out w-full">
                    <span
                      className={`inline-block px-3 py-1 text-[10px] tracking-[0.15em] uppercase rounded-sm mb-3 ${
                        categoryColors[project.category] || 'bg-white/10 text-white'
                      } bg-white/10 !text-white/80`}
                    >
                      {project.category}
                    </span>
                    <h3 className="font-display text-xl text-white font-light mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-4 mt-3 text-[11px] text-white/40 tracking-wider">
                      <span>{project.year}</span>
                      <span className="w-px h-3 bg-white/20" />
                      <span>{project.area}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instruction for adding projects */}
        <p className="text-center text-muted text-xs mt-12 tracking-wider">
          {/* Чтобы добавить проект — отредактируйте src/data/projects.json и добавьте изображения в public/portfolio/ */}
        </p>
      </div>
    </section>
  );
}
