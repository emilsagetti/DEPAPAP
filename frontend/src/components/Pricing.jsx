import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="bg-slate-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Тарифы</h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Прозрачные цены. Без скрытых платежей.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">

          {/* --- Card 1: Standard --- */}
          <div className="flex flex-col h-full bg-white rounded-3xl p-6 pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(14,116,144,0.1)] hover:-translate-y-2 transition-all duration-300">

            {/* Header Area with Fixed Heights for Alignment */}
            <div className="mb-2 text-center">
              {/* Title Container: Fixed Height */}
              <div className="h-8 flex items-end justify-center mb-2">
                <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide">Консультация</h3>
              </div>
              {/* Price Container: Fixed Height */}
              <div className="h-16 flex items-baseline justify-center gap-1 whitespace-nowrap">
                <span className="text-4xl font-bold text-primary">5 000</span>
                <span className="text-2xl text-secondary">₽</span>
              </div>
              {/* Subtitle Placeholder: Fixed Height */}
              <div className="h-6 flex items-start justify-center">
                {/* Empty but reserved space */}
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1 border-t border-gray-100 pt-6">
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-secondary">1 часовая консультация</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-secondary">Письменное заключение</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-secondary">Ответ 24 часа</span>
              </li>
            </ul>

            <button className="w-full mt-auto border-2 border-accent text-accent px-6 py-4 font-bold rounded-full hover:bg-accent hover:text-white transition-all text-center">
              Заказать
            </button>
          </div>

          {/* --- Card 2: Popular --- */}
          <div className="flex flex-col h-full bg-gradient-to-br from-cyan-50 to-white rounded-3xl p-6 pt-12 relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(14,116,144,0.1)] hover:-translate-y-2 transition-all duration-300">
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-full text-center">
              <span className="bg-accent text-white px-4 py-1 text-xs font-bold rounded-full uppercase tracking-wider shadow-sm">
                Популярно
              </span>
            </div>

            <div className="mb-2 text-center">
              {/* Title Container */}
              <div className="h-8 flex items-end justify-center mb-2">
                <h3 className="text-sm font-semibold text-accent uppercase tracking-wide">Абонемент</h3>
              </div>
              {/* Price Container */}
              <div className="h-16 flex items-baseline justify-center gap-1 whitespace-nowrap">
                <span className="text-4xl font-bold text-primary">30 000</span>
                <span className="text-2xl text-secondary">₽/мес</span>
              </div>
              {/* Subtitle Placeholder */}
              <div className="h-6 flex items-start justify-center">
                {/* Empty but reserved space */}
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1 border-t border-accent/20 pt-6">
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-primary font-medium">До 10 часов в месяц</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-primary font-medium">Проверка договоров</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-primary font-medium">Личный юрист</span>
              </li>
            </ul>

            <button className="w-full mt-auto bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-6 py-4 font-bold rounded-full hover:shadow-lg hover:-translate-y-0.5 transition-all text-center">
              Начать работу
            </button>
          </div>

          {/* --- Card 3: Corporate --- */}
          <div className="flex flex-col h-full bg-white rounded-3xl p-6 pt-12 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(14,116,144,0.1)] hover:-translate-y-2 transition-all duration-300">

            <div className="mb-2 text-center">
              {/* Title Container */}
              <div className="h-8 flex items-end justify-center mb-2">
                <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide">Корпоративный</h3>
              </div>
              {/* Price Container */}
              <div className="h-16 flex items-baseline justify-center gap-1 whitespace-nowrap">
                <span className="text-4xl font-bold text-primary">—</span>
              </div>
              {/* Subtitle filled here */}
              <div className="h-6 flex items-start justify-center">
                <span className="text-sm text-secondary">Индивидуально</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1 border-t border-gray-100 pt-6">
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-secondary">Безлимитные консультации</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-secondary">Команда юристов</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 font-bold">✓</span>
                <span className="text-secondary">Суды</span>
              </li>
            </ul>

            <button className="w-full mt-auto border-2 border-accent text-accent px-6 py-4 font-bold rounded-full hover:bg-accent hover:text-white transition-all text-center">
              Связаться
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Pricing;
