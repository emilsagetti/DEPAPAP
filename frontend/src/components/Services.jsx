function Services() {
  return (
    <section id="services" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">Наши услуги</h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Полный спектр юридической поддержки для вашего бизнеса
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Service Card 1 - Outsourcing */}
          <div className="service-card bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(14,116,144,0.1)] transition-all duration-500 hover:-translate-y-2">
            <div className="mb-6">
              {/* Shield Icon */}
              <div className="w-16 h-16 bg-cyan-50 rounded-lg flex items-center justify-center">
                <svg className="w-9 h-9 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Правовой аутсорсинг</h3>
            <p className="text-secondary leading-relaxed mb-6">
              Полное юридическое сопровождение бизнеса: договоры, сделки, корпоративное право. Ваш штатный юрист онлайн.
            </p>
            <a href="#" className="text-accent font-semibold inline-flex items-center hover:gap-3 gap-2 transition-all">
              Подробнее
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>

          {/* Service Card 2 - Crisis Management */}
          <div className="service-card bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(14,116,144,0.1)] transition-all duration-500 hover:-translate-y-2">
            <div className="mb-6">
              {/* Alert Icon */}
              <div className="w-16 h-16 bg-cyan-50 rounded-lg flex items-center justify-center">
                <svg className="w-9 h-9 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Антикризисное управление</h3>
            <p className="text-secondary leading-relaxed mb-6">
              Юридическая поддержка в сложных ситуациях: банкротство, рестру ктуризация, судебные споры, взыскание долгов.
            </p>
            <a href="#" className="text-accent font-semibold inline-flex items-center hover:gap-3 gap-2 transition-all">
              Подробнее
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>

          {/* Service Card 3 - Freelance Support */}
          <div className="service-card bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(14,116,144,0.1)] transition-all duration-500 hover:-translate-y-2">
            <div className="mb-6">
              {/* Chat Icon */}
              <div className="w-16 h-16 bg-cyan-50 rounded-lg flex items-center justify-center">
                <svg className="w-9 h-9 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-4">Юрист на фрилансе</h3>
            <p className="text-secondary leading-relaxed mb-6">
              Разовые консультации и экспертная помощь по конкретным вопросам. Оплата за результат, без долгосрочных обязательств.
            </p>
            <a href="#" className="text-accent font-semibold inline-flex items-center hover:gap-3 gap-2 transition-all">
              Подробнее
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Services;
