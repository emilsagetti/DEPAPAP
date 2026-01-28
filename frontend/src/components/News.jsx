function News() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Новости и аналитика</h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Актуальная информация о законодательстве и правовых изменениях
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* News Card 1 */}
          <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
            <div className="text-sm text-accent font-medium mb-3">10 Янв 2026</div>
            <h3 className="text-xl font-bold mb-3 leading-tight">
              Налоговая реформа 2026: Что ждет малый бизнес?
            </h3>
            <p className="text-secondary mb-4 leading-relaxed">
              Обзор ключевых изменений в налоговом законодательстве и рекомендации для предпринимателей.
            </p>
            <a href="#" className="text-accent font-semibold inline-flex items-center hover:gap-2 gap-1 transition-all">
              Читать далее
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </article>

          {/* News Card 2 */}
          <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
            <div className="text-sm text-accent font-medium mb-3">05 Янв 2026</div>
            <h3 className="text-xl font-bold mb-3 leading-tight">
              Как правильно оформить сотрудников на удаленке
            </h3>
            <p className="text-secondary mb-4 leading-relaxed">
              Пошаговая инструкция по оформлению трудового договора для дистанционных работников.
            </p>
            <a href="#" className="text-accent font-semibold inline-flex items-center hover:gap-2 gap-1 transition-all">
              Читать далее
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </article>

          {/* News Card 3 */}
          <article className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
            <div className="text-sm text-accent font-medium mb-3">28 Дек 2025</div>
            <h3 className="text-xl font-bold mb-3 leading-tight">
              Изменения в законе о рекламе: Штрафы выросли
            </h3>
            <p className="text-secondary mb-4 leading-relaxed">
              Новые требования к рекламной деятельности и размеры санкций за нарушения с 2026 года.
            </p>
            <a href="#" className="text-accent font-semibold inline-flex items-center hover:gap-2 gap-1 transition-all">
              Читать далее
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

export default News;
