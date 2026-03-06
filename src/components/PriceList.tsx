'use client';

import { motion } from 'framer-motion';
import { designServices, objectTypesDesign, formatPrice } from '@/data/pricing';

const serviceCards = [
  {
    name: 'Дизайн-проект',
    description: 'Полный комплект чертежей и планировочных решений для вашего пространства',
    price: formatPrice(designServices[0].prices['Квартира']),
    unit: '₸/м²',
    features: [
      'Обмер и техническое задание',
      'Планировочные решения',
      'Чертежи всех помещений',
      'Спецификация материалов',
    ],
    popular: true,
  },
  {
    name: '3D-визуализация',
    description: 'Фотореалистичные рендеры вашего будущего интерьера',
    price: formatPrice(designServices[1].prices['Квартира']),
    unit: '₸/м²',
    features: [
      'Фотореалистичные рендеры',
      '2–3 ракурса на помещение',
      '2 варианта стилистики',
      'Корректировки включены',
    ],
  },
  {
    name: 'Авторский надзор',
    description: 'Контроль реализации проекта на всех этапах строительства',
    price: formatPrice(designServices[3].prices['Квартира']),
    unit: '₸/м²',
    features: [
      'Регулярные выезды на объект',
      'Контроль качества работ',
      'Согласование с подрядчиками',
      'Корректировки проекта',
    ],
  },
  {
    name: 'Комплектация',
    description: 'Полный подбор материалов, мебели и декора для вашего проекта',
    price: formatPrice(designServices[4].prices['Квартира']),
    unit: '₸/м²',
    features: [
      'Спецификации материалов',
      'Шоурум-туры',
      'Сопровождение закупок',
      'Контроль поставок',
    ],
  },
];

export default function PriceList() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-warm-gray/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
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
          <div className="w-12 h-px bg-accent mx-auto mt-6 mb-6" />
          <p className="text-muted-dark text-sm max-w-lg mx-auto">
            Цены указаны для квартир. Стоимость зависит от типа объекта — воспользуйтесь
            калькулятором ниже для точного расчёта
          </p>
        </motion.div>

        {/* Price cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {serviceCards.map((item, idx) => (
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
                <span className="text-[11px] text-muted uppercase tracking-wider">от</span>
                <span className="font-display text-3xl text-graphite font-semibold ml-1">
                  {item.price}
                </span>
                <span className="text-muted text-sm">{item.unit}</span>
              </div>

              <div className="w-full h-px bg-warm-gray-dark/50 mb-6" />

              <ul className="space-y-3 mb-8">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-dark">
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

        {/* Object type price table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 overflow-x-auto"
        >
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-warm-gray-dark/40">
                <th className="text-left py-4 text-[11px] tracking-[0.15em] text-muted uppercase font-normal">
                  Услуга
                </th>
                {objectTypesDesign.map((t) => (
                  <th
                    key={t}
                    className="text-right py-4 text-[11px] tracking-[0.15em] text-muted uppercase font-normal px-3"
                  >
                    {t}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {designServices.map((svc) => (
                <tr key={svc.name} className="border-b border-warm-gray-dark/20">
                  <td className="py-3 text-graphite">{svc.name}</td>
                  {objectTypesDesign.map((t) => (
                    <td key={t} className="py-3 text-right text-muted-dark px-3">
                      {svc.prices[t] === 0 ? (
                        <span className="text-accent text-xs">Бесплатно</span>
                      ) : (
                        <>{formatPrice(svc.prices[t])} ₸</>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <p className="text-center text-muted text-xs mt-8 tracking-wider">
          Точная стоимость рассчитывается индивидуально после консультации
        </p>
      </div>
    </section>
  );
}
