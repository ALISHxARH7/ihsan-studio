export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-graphite text-white/60 py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl text-white tracking-[0.15em] font-light mb-2">
              IHSAN
            </h3>
            <p className="text-[10px] tracking-[0.3em] uppercase text-white/30 mb-4">
              Architecture &amp; Design Studio
            </p>
            <p className="text-sm leading-relaxed max-w-xs">
              Создаём пространства, наполненные смыслом, красотой
              и искренностью исполнения.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] text-white/40 uppercase mb-6">
              Навигация
            </h4>
            <ul className="space-y-3">
              {[
                { href: '#portfolio', label: 'Портфолио' },
                { href: '#services', label: 'Услуги' },
                { href: '#contact', label: 'Контакты' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 hover:text-accent transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] text-white/40 uppercase mb-6">
              Контакты
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/77055098634"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-accent transition-colors duration-300"
                >
                  +7 705 509 8634
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ihsan.studio.arh/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-accent transition-colors duration-300"
                >
                  @ihsan.studio.arh
                </a>
              </li>
              <li className="text-white/50">
                Алматы, Казахстан
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            &copy; {year} Ihsan Studio. Все права защищены.
          </p>
          <p className="text-xs text-white/20">
            Ихсан — наилучшее исполнение
          </p>
        </div>
      </div>
    </footer>
  );
}
