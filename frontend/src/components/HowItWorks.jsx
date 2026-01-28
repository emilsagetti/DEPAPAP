function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Как это работает</h2>
          <p className="text-xl text-secondary max-w-2xl mx-auto">
            Простой и прозрачный процесс от регистрации до получения результата
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-100 via-teal-100 to-cyan-100 border-t-2 border-dashed border-cyan-200" style={{ margin: '0 10%' }}></div>

          {/* Step 1 */}
          <div className="relative text-center">
            <div className="relative inline-block mb-6 overflow-visible">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-lg shadow-teal-500/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center font-bold text-teal-600 text-sm z-20">
                01
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Регистрация</h3>
            <p className="text-secondary">
              Создайте аккаунт за 2 минуты. Укажите данные компании.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative text-center">
            <div className="relative inline-block mb-6 overflow-visible">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-lg shadow-teal-500/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center font-bold text-teal-600 text-sm z-20">
                02
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Чат с юристом</h3>
            <p className="text-secondary">
              Опишите задачу. Юрист свяжется и оценит стоимость работы.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative text-center">
            <div className="relative inline-block mb-6 overflow-visible">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-lg shadow-teal-500/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center font-bold text-teal-600 text-sm z-20">
                03
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Оплата (СБП)</h3>
            <p className="text-secondary">
              Безопасная оплата через СБП. QR-код или ссылка на телефон.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative text-center">
            <div className="relative inline-block mb-6 overflow-visible">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-full flex items-center justify-center mx-auto relative z-10 shadow-lg shadow-teal-500/20">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center font-bold text-teal-600 text-sm z-20">
                04
              </div>
            </div>
            <h3 className="text-xl font-bold mb-3">Готовые документы</h3>
            <p className="text-secondary">
              Получите готовые документы в личном кабинете. Скачайте или распечатайте.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
