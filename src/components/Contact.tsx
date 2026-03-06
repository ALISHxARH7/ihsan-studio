'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          contact: data.get('contact'),
          message: data.get('message'),
        }),
      });
    } catch {
      // fail silently — user still sees success
    }
    setSubmitted(true);
    form.reset();
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-warm-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-[11px] tracking-[0.4em] text-accent uppercase mb-4">
            Связаться
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-light text-graphite tracking-wide">
            Контакты
          </h2>
          <div className="w-12 h-px bg-accent mx-auto mt-6" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl mx-auto">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div>
              <h3 className="font-display text-2xl text-graphite mb-6 font-light">
                Давайте создадим что&#8209;то прекрасное
              </h3>
              <p className="text-muted-dark leading-relaxed">
                Свяжитесь с нами для бесплатной консультации.
                Мы обсудим вашу идею и предложим оптимальное решение.
              </p>
            </div>

            <div className="space-y-6">
              {/* Phone / WhatsApp */}
              <a
                href="https://wa.me/77055098634"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="w-12 h-12 border border-warm-gray-dark flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                  <svg className="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-muted uppercase mb-0.5">
                    Телефон / WhatsApp
                  </p>
                  <p className="text-graphite group-hover:text-accent transition-colors">
                    +7 705 509 8634
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/ihsan.studio.arh/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <span className="w-12 h-12 border border-warm-gray-dark flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-all duration-300">
                  <svg className="w-5 h-5 text-muted group-hover:text-accent transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-muted uppercase mb-0.5">
                    Instagram
                  </p>
                  <p className="text-graphite group-hover:text-accent transition-colors">
                    @ihsan.studio.arh
                  </p>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4">
                <span className="w-12 h-12 border border-warm-gray-dark flex items-center justify-center">
                  <svg className="w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div>
                  <p className="text-[11px] tracking-[0.2em] text-muted uppercase mb-0.5">
                    Локация
                  </p>
                  <p className="text-graphite">
                    Алматы, Казахстан
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact form (Netlify Forms) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 border border-accent/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl text-graphite mb-3">
                    Спасибо за заявку
                  </h3>
                  <p className="text-muted-dark">
                    Мы свяжемся с вами в ближайшее время
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div>
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-warm-gray-dark py-3 text-graphite placeholder:text-muted/40 focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="Ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
                    Телефон или email
                  </label>
                  <input
                    type="text"
                    name="contact"
                    required
                    className="w-full bg-transparent border-b border-warm-gray-dark py-3 text-graphite placeholder:text-muted/40 focus:border-accent focus:outline-none transition-colors duration-300"
                    placeholder="+7 (___) ___ __ __ или email"
                  />
                </div>

                <div>
                  <label className="block text-[11px] tracking-[0.2em] text-muted uppercase mb-2">
                    Сообщение
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    className="w-full bg-transparent border-b border-warm-gray-dark py-3 text-graphite placeholder:text-muted/40 focus:border-accent focus:outline-none transition-colors duration-300 resize-none"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-4 text-[12px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-accent-dark hover:shadow-lg hover:shadow-accent/10 mt-4"
                >
                  Отправить заявку
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
