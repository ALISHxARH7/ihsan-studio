'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  designServices,
  archSections,
  objectTypesDesign,
  objectTypesArch,
  formatPrice,
  type DesignObjectType,
  type ArchObjectType,
} from '@/data/pricing';

type Mode = 'design' | 'arch';

export default function Calculator() {
  const [mode, setMode] = useState<Mode>('design');

  // Design state
  const [designType, setDesignType] = useState<DesignObjectType>('Квартира');
  const [area, setArea] = useState<number>(80);
  const [selectedDesignServices, setSelectedDesignServices] = useState<Set<number>>(
    new Set([0])
  );

  // Architecture state
  const [archType, setArchType] = useState<ArchObjectType>('Жилой дом');
  const [selectedArchSections, setSelectedArchSections] = useState<Set<number>>(
    new Set([0])
  );

  const toggleDesignService = (idx: number) => {
    setSelectedDesignServices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const toggleArchSection = (idx: number) => {
    setSelectedArchSections((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      return next;
    });
  };

  const designTotal = useMemo(() => {
    let total = 0;
    selectedDesignServices.forEach((idx) => {
      const svc = designServices[idx];
      if (svc) {
        const rate = svc.prices[designType];
        total += rate * area;
      }
    });
    return total;
  }, [selectedDesignServices, designType, area]);

  const archTotal = useMemo(() => {
    let total = 0;
    selectedArchSections.forEach((idx) => {
      const sec = archSections[idx];
      if (sec) total += sec.prices[archType];
    });
    return total;
  }, [selectedArchSections, archType]);

  const total = mode === 'design' ? designTotal : archTotal;

  return (
    <section className="py-24 sm:py-32 bg-warm-white">
      <div className="mx-auto max-w-4xl px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.4em] text-accent uppercase mb-4">
            Рассчитайте стоимость
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-graphite tracking-wide">
            Калькулятор
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white border border-warm-gray-dark/40 p-6 sm:p-10"
        >
          {/* Mode tabs */}
          <div className="flex border-b border-warm-gray-dark/40 mb-8">
            {([
              { key: 'design' as Mode, label: 'Дизайн интерьера' },
              { key: 'arch' as Mode, label: 'Архитектура' },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setMode(tab.key)}
                className={`flex-1 pb-4 text-[12px] sm:text-[13px] tracking-[0.15em] uppercase transition-all duration-300 border-b-2 -mb-px ${
                  mode === tab.key
                    ? 'border-accent text-accent'
                    : 'border-transparent text-muted hover:text-graphite'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {mode === 'design' ? (
              <motion.div
                key="design"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Object type */}
                <div className="mb-6">
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-3">
                    Тип объекта
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {objectTypesDesign.map((t) => (
                      <button
                        key={t}
                        onClick={() => setDesignType(t)}
                        className={`py-2.5 px-3 text-[11px] sm:text-xs tracking-wider border transition-all duration-300 ${
                          designType === t
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-warm-gray-dark/40 text-muted-dark hover:border-accent/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Area */}
                <div className="mb-8">
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-3">
                    Площадь (м²)
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min={20}
                      max={500}
                      step={5}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="flex-1 h-1 bg-warm-gray-dark/30 rounded-full appearance-none cursor-pointer accent-accent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="flex items-center border border-warm-gray-dark/40 px-3 py-2 min-w-[90px]">
                      <input
                        type="number"
                        min={1}
                        max={9999}
                        value={area}
                        onChange={(e) => setArea(Number(e.target.value) || 0)}
                        className="w-full bg-transparent text-graphite text-right text-sm outline-none"
                      />
                      <span className="text-muted text-xs ml-1">м²</span>
                    </div>
                  </div>
                </div>

                {/* Services */}
                <div className="mb-8">
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-3">
                    Выберите услуги
                  </label>
                  <div className="space-y-2">
                    {designServices.map((svc, idx) => {
                      const rate = svc.prices[designType];
                      const isSelected = selectedDesignServices.has(idx);
                      const isFree = rate === 0;
                      return (
                        <button
                          key={svc.name}
                          onClick={() => toggleDesignService(idx)}
                          className={`w-full flex items-center justify-between p-4 border transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-accent/40 bg-accent/5'
                              : 'border-warm-gray-dark/30 hover:border-accent/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                                isSelected ? 'border-accent bg-accent' : 'border-warm-gray-dark'
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <span className="text-sm text-graphite">{svc.name}</span>
                              <p className="text-[11px] text-muted mt-0.5">{svc.includes}</p>
                            </div>
                          </div>
                          <div className="text-right shrink-0 ml-4">
                            {isFree ? (
                              <span className="text-xs text-accent">Бесплатно</span>
                            ) : (
                              <>
                                <span className="text-sm font-semibold text-graphite">
                                  {formatPrice(rate)}
                                </span>
                                <span className="text-xs text-muted ml-1">₸/м²</span>
                              </>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="arch"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Object type */}
                <div className="mb-6">
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-3">
                    Тип объекта
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {objectTypesArch.map((t) => (
                      <button
                        key={t}
                        onClick={() => setArchType(t)}
                        className={`py-2.5 px-3 text-[11px] sm:text-xs tracking-wider border transition-all duration-300 ${
                          archType === t
                            ? 'border-accent bg-accent/5 text-accent'
                            : 'border-warm-gray-dark/40 text-muted-dark hover:border-accent/40'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sections */}
                <div className="mb-8">
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-3">
                    Выберите разделы проекта
                  </label>
                  <div className="space-y-2">
                    {archSections.map((sec, idx) => {
                      const price = sec.prices[archType];
                      const isSelected = selectedArchSections.has(idx);
                      return (
                        <button
                          key={sec.name}
                          onClick={() => toggleArchSection(idx)}
                          className={`w-full flex items-center justify-between p-4 border transition-all duration-300 text-left ${
                            isSelected
                              ? 'border-accent/40 bg-accent/5'
                              : 'border-warm-gray-dark/30 hover:border-accent/20'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-5 h-5 border flex items-center justify-center shrink-0 transition-all duration-300 ${
                                isSelected ? 'border-accent bg-accent' : 'border-warm-gray-dark'
                              }`}
                            >
                              {isSelected && (
                                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                            <div>
                              <span className="text-sm text-graphite">{sec.name}</span>
                              <p className="text-[11px] text-muted mt-0.5">{sec.note}</p>
                            </div>
                          </div>
                          <span className="text-sm font-semibold text-graphite shrink-0 ml-4">
                            {formatPrice(price)} ₸
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Total */}
          <div className="border-t border-warm-gray-dark/40 pt-6 mt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
                  Предварительная стоимость
                </p>
                {mode === 'design' && (
                  <p className="text-xs text-muted mt-1">
                    {area} м² &middot; {selectedDesignServices.size} услуг(и)
                  </p>
                )}
                {mode === 'arch' && (
                  <p className="text-xs text-muted mt-1">
                    {selectedArchSections.size} раздел(ов)
                  </p>
                )}
              </div>
              <motion.div
                key={total}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
                className="text-right"
              >
                <span className="font-display text-3xl sm:text-4xl font-semibold text-graphite">
                  {formatPrice(total)}
                </span>
                <span className="text-muted text-lg ml-2">₸</span>
              </motion.div>
            </div>

            <a
              href="#contact"
              className="block text-center bg-accent text-white py-4 text-[12px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/10 mt-6"
            >
              Получить точный расчёт
            </a>

            <p className="text-center text-muted text-[11px] mt-4">
              Окончательная стоимость определяется после консультации и осмотра объекта
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
