function CTASection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Начните работу прямо сейчас
        </h2>
        <p className="text-xl text-gray-300 mb-10">
          Присоединяйтесь к сотням компаний, которые доверяют нам защиту своих интересов
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-accent text-white px-10 py-4 text-lg font-semibold rounded-sm hover:bg-accent-dark transition-all shadow-lg">
            Перейти в личный кабинет
          </button>
          <button className="border-2 border-white text-white px-10 py-4 text-lg font-semibold rounded-sm hover:bg-white hover:text-slate-900 transition-all">
            Узнать больше
          </button>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
