import React from 'react';
import { Link } from 'react-router-dom';
import { Send, MessageCircle } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    services: [
      { name: 'Аутсорсинг', href: '/services/outsourcing' },
      { name: 'Судебная защита', href: '/services/court-protection' },
      { name: 'Аудит договоров', href: '/services/audit' },
      { name: 'Регистрация бизнеса', href: '/services/registration' }
    ],
    company: [
      { name: 'О компании', href: '/about' }, // Changed from anchor to page
      { name: 'Контакты', href: '/contacts' },
      // Actually user said "enliven all links". #contacts works if we are on landing, but not on other pages.
      // Better to map to /#contact if standard link, or use HashLink. 
      // For now, let's keep it consistent. If I use Link to="/#contact" it might not scroll. 
      // I will leave Contacts as '#contact' for now but handle it in the render logic to go to '/' if not there. 
      // OR better: let's map it to landing page anchor.
      { name: 'Карьера', href: '/careers' },
      { name: 'Блог', href: '/news' }
    ],
    legal: [
      { name: 'Публичная оферта', href: '/offer' },
      { name: 'Политика конфиденциальности', href: '/privacy' },
      { name: 'Согласие на обработку данных', href: '/consent' },
      { name: 'Реквизиты компании', href: '/requisites' }
    ]
  };

  return (
    <footer className="bg-transparent text-[#9EACB7] pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1 text-left">
            <Link to="/">
              <img src="/logo-depa-fixed.png" alt="Depa" className="h-10 w-auto" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#9EACB7]/80">
              Юридический консалтинг нового поколения. Защищаем бизнес, экономим ваше время.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-[#023A55] flex items-center justify-center transition-colors group">
                <Send size={18} className="text-[#9EACB7] group-hover:text-white" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-[#023A55] flex items-center justify-center transition-colors group">
                <MessageCircle size={18} className="text-[#9EACB7] group-hover:text-white" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Услуги</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-sm text-[#9EACB7]/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-[#9EACB7]/80 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Компания</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-sm text-[#9EACB7]/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-[#9EACB7]/80 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Документы</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('/') ? (
                    <Link to={link.href} className="text-sm text-[#9EACB7]/80 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  ) : (
                    <a href={link.href} className="text-sm text-[#9EACB7]/80 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#9EACB7]/60">
            © {new Date().getFullYear()} Depa. Все права защищены.
          </p>
          <p className="text-xs text-[#9EACB7]/40 text-right">
            ИП Бахилин А.А. · ИНН 100123353111 · Петрозаводск, ул. Андропова, 6
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
