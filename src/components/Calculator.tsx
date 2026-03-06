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

interface ModalState {
  open: boolean;
  name: string;
  contact: string;
  submitting: boolean;
  done: boolean;
}

export default function Calculator() {
  const [mode, setMode] = useState<Mode>('design');

  // Design state
  const [designType, setDesignType] = useState<DesignObjectType>('Квартира');
  const [area, setArea] = useState<number>(80);
  const [selectedDesignServices, setSelectedDesignServices] = useState<Set<number>>(new Set([0]));

  // Architecture state
  const [archType, setArchType] = useState<ArchObjectType>('Жилой дом');
  const [selectedArchSections, setSelectedArchSections] = useState<Set<number>>(new Set([0]));

  // Modal state
  const [modal, setModal] = useState<ModalState>({
    open: false,
    name: '',
    contact: '',
    submitting: false,
    done: false,
  });

  const toggleDesignService = (idx: number) => {
    setSelectedDesignServices((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const toggleArchSection = (idx: number) => {
    setSelectedArchSections((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  };

  const designTotal = useMemo(() => {
    let t = 0;
    selectedDesignServices.forEach((idx) => {
      const svc = designServices[idx];
      if (svc) t += svc.prices[designType] * area;
    });
    return t;
  }, [selectedDesignServices, designType, area]);

  const archTotal = useMemo(() => {
    let t = 0;
    selectedArchSections.forEach((idx) => {
      const sec = archSections[idx];
      if (sec) t += sec.prices[archType];
    });
    return t;
  }, [selectedArchSections, archType]);

  const total = mode === 'design' ? designTotal : archTotal;

  // Prepare summary for modal and telegram
  const selectedSummary = useMemo(() => {
    if (mode === 'design') {
      return Array.from(selectedDesignServices).map((idx) => {
        const svc = designServices[idx];
        const rate = svc.prices[designType];
        return {
          name: svc.name,
          price: rate === 0 ? 'Бесплатно' : `${formatPrice(rate * area)} ₸ (${formatPrice(rate)} ₸/м² × ${area} м²)`,
        };
      });
    } else {
      return Array.from(selectedArchSections).map((idx) => {
        const sec = archSections[idx];
        return {
          name: sec.name,
          price: `${formatPrice(sec.prices[archType])} ₸`,
        };
      });
    }
  }, [mode, selectedDesignServices, selectedArchSections, designType, archType, area]);

  const openModal = () => setModal((m) => ({ ...m, open: true, done: false }));
  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setModal((m) => ({ ...m, submitting: true }));
    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modal.name,
          contact: modal.contact,
          calculatorData: {
            tab: mode,
            objectType: mode === 'design' ? designType : archType,
            area: mode === 'design' ? area : null,
            services: selectedSummary,
            total: `${formatPrice(total)}`,
          },
        }),
      });
      setModal((m) => ({ ...m, submitting: false, done: true }));
    } catch {
      setModal((m) => ({ ...m, submitting: false, done: true }));
    }
  };

  return (
    <>
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
              {(['design', 'arch'] as Mode[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMode(tab)}
                  className={`flex-1 pb-4 text-[12px] sm:text-[13px] tracking-[0.15em] uppercase transition-all duration-300 border-b-2 -mb-px ${
                    mode === tab
                      ? 'border-accent text-accent'
                      : 'border-transparent text-muted hover:text-graphite'
                  }`}
                >
                  {tab === 'design' ? 'Дизайн интерьера' : 'Архитектура'}
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
                                  <span className="text-sm font-semibold text-graphite">{formatPrice(rate)}</span>
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

            {/* Total + CTA */}
            <div className="border-t border-warm-gray-dark/40 pt-6 mt-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-muted uppercase">
                    Предварительная стоимость
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {mode === 'design'
                      ? `${area} м² · ${selectedDesignServices.size} услуг(и)`
                      : `${selectedArchSections.size} раздел(ов)`}
                  </p>
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

              {/* CTA — opens modal */}
              <button
                onClick={openModal}
                className="group w-full relative overflow-hidden bg-graphite text-white py-5 text-[12px] tracking-[0.25em] uppercase transition-all duration-500 hover:bg-accent"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.82m2.56-5.84a14.98 14.98 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  </svg>
                  Получить расчёт бесплатно
                </span>
              </button>

              <p className="text-center text-muted text-[11px] mt-4">
                Укажите контакт — мы подготовим детальную смету и ответим на вопросы
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-graphite/60 backdrop-blur-sm z-50"
            />

            {/* Modal panel */}
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{ duration: 0.4, type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 top-1/2 -translate-y-1/2 sm:w-full sm:max-w-lg bg-white z-50 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-muted hover:text-graphite transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="p-7 sm:p-10">
                {modal.done ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 border border-accent/40 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl font-light text-graphite mb-3">
                      Заявка принята
                    </h3>
                    <p className="text-muted text-sm">
                      Мы получили ваш расчёт и свяжемся с вами в ближайшее время.
                    </p>
                    <button
                      onClick={closeModal}
                      className="mt-8 border border-graphite/30 text-graphite px-8 py-3 text-[11px] tracking-[0.2em] uppercase hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      Закрыть
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Header */}
                    <p className="text-[11px] tracking-[0.3em] text-accent uppercase mb-2">
                      Ваш расчёт
                    </p>
                    <h3 className="font-display text-2xl font-light text-graphite mb-6">
                      {mode === 'design' ? 'Дизайн интерьера' : 'Архитектура'}
                      {mode === 'design' && ` · ${designType}`}
                      {mode === 'arch' && ` · ${archType}`}
                    </h3>

                    {/* Services summary */}
                    <div className="bg-warm-gray rounded-none p-4 mb-6 space-y-1.5">
                      {selectedSummary.length === 0 ? (
                        <p className="text-muted text-sm">Услуги не выбраны</p>
                      ) : (
                        selectedSummary.map((s, i) => (
                          <div key={i} className="flex justify-between gap-4 text-sm">
                            <span className="text-muted-dark">{s.name}</span>
                            <span className="text-graphite font-medium shrink-0">{s.price}</span>
                          </div>
                        ))
                      )}
                      <div className="border-t border-warm-gray-dark/40 pt-2 mt-2 flex justify-between font-medium">
                        <span className="text-[11px] tracking-[0.15em] uppercase text-muted">Итого</span>
                        <span className="text-graphite font-semibold">{formatPrice(total)} ₸</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted mb-6 leading-relaxed">
                      Оставьте контакт — мы подготовим точную смету, ответим на вопросы
                      и расскажем о процессе работы. Без давления.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[11px] tracking-[0.15em] text-muted uppercase mb-2">
                          Ваше имя *
                        </label>
                        <input
                          type="text"
                          required
                          value={modal.name}
                          onChange={(e) => setModal((m) => ({ ...m, name: e.target.value }))}
                          placeholder="Алишер"
                          className="w-full border border-warm-gray-dark/40 bg-transparent px-4 py-3 text-sm text-graphite placeholder-muted/50 outline-none focus:border-accent transition-colors duration-300"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.15em] text-muted uppercase mb-2">
                          Телефон / WhatsApp *
                        </label>
                        <input
                          type="text"
                          required
                          value={modal.contact}
                          onChange={(e) => setModal((m) => ({ ...m, contact: e.target.value }))}
                          placeholder="+7 705 000 0000"
                          className="w-full border border-warm-gray-dark/40 bg-transparent px-4 py-3 text-sm text-graphite placeholder-muted/50 outline-none focus:border-accent transition-colors duration-300"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={modal.submitting}
                        className="w-full bg-accent text-white py-4 text-[12px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-accent-dark disabled:opacity-60 disabled:cursor-not-allowed mt-2"
                      >
                        {modal.submitting ? 'Отправка...' : 'Отправить заявку'}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
