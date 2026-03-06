'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PriceItem {
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  popular?: boolean;
}

const fallbackData: PriceItem[] = [
  {
    name: 'Обмерный план',
    price: '1 500',
    unit: '₸/м²',
    description: 'Точные замеры помещения с выездом специалиста',
    features: ['Выезд на объект', 'Обмерный чертёж', 'Фотофиксация', 'Срок: 2-3 дня'],
  },
  {
    name: 'Дизайн-проект',
    price: '5 000',
    unit: '₸/м²',
    description: 'Полный дизайн-проект интерьера под ключ',
    features: [
      'Планировочное решение',
      '3D-визуализация',
      'Рабочая документация',
      'Подбор материалов',
      'Спецификация мебели',
    ],
    popular: true,
  },
  {
    name: 'Авторский надзор',
    price: '3 000',
    unit: '₸/м²',
    description: 'Контроль реализации проекта на всех этапах',
    features: [
      'Выезды на объект',
      'Контроль качества',
      'Корректировки проекта',
      'Согласование материалов',
    ],
  },
  {
    name: '3D-визуализация',
    price: '50 000',
    unit: '₸/ракурс',
    description: 'Фотореалистичная визуализация вашего пространства',
    features: ['Фотореализм', '2 варианта стилистики', '2 корректировки', 'Срок: 5-7 дней'],
  },
];

export default function PriceList() {
  const [prices, setPrices] = useState<PriceItem[]>(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch('/api/prices');
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        if (data.prices && data.prices.length > 0) {
          setPrices(data.prices);
        }
      } catch {
        // Use fallback data — already set
      } finally {
        setLoading(false);
      }
    }
    fetchPrices();
  }, []);

  return (
    <section id="services" className="py-24 sm:py-32 bg-warm-gray/50">
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
            Стоимость
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-graphite tracking-wide">
            Услуги
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        {/* Price cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {prices.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative group bg-white p-8 border transition-all duration-500 hover:shadow-xl hover:shadow-accent/5 ${
                item.popular
                  ? 'border-accent/30 shadow-lg shadow-accent/5'
                  : 'border-warm-gray-dark/50 hover:border-accent/20'
              }`}
            >
              {item.popular && (
                <span className="absolute -top-3 left-8 bg-accent text-white text-[9px] tracking-[0.2em] uppercase px-4 py-1">
                  Популярное
                </span>
              )}

              <h3 className="font-display text-xl text-graphite mb-2">
                {item.name}
              </h3>
              <p className="text-muted text-sm mb-6 leading-relaxed">
                {item.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span className="font-display text-3xl text-graphite font-semibold">
                  {loading ? '...' : item.price}
                </span>
                <span className="text-muted text-sm">{item.unit}</span>
              </div>

              <div className="w-full h-px bg-warm-gray-dark/50 mb-6" />

              <ul className="space-y-3 mb-8">
                {item.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-muted-dark"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block text-center py-3 text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                  item.popular
                    ? 'bg-accent text-white hover:bg-accent-dark'
                    : 'border border-accent/30 text-accent hover:bg-accent hover:text-white'
                }`}
              >
                Заказать
              </a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center text-muted text-xs mt-10 tracking-wider"
        >
          Точная стоимость рассчитывается индивидуально после консультации
        </motion.p>
      </div>
    </section>
  );
}
