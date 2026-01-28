import { useState } from 'react';

const CreateOrderModal = ({ isOpen, onClose, onSubmit }) => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        service_type: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const serviceTypes = [
        {
            value: 'consultation',
            label: 'Консультация',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
            ),
            color: 'from-blue-500 to-cyan-500',
        },
        {
            value: 'outsourcing',
            label: 'Правовой аутсорсинг',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
            ),
            color: 'from-purple-500 to-pink-500',
        },
        {
            value: 'contract',
            label: 'Проверка договора',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
            ),
            color: 'from-teal-500 to-emerald-500',
        },
        {
            value: 'crisis',
            label: 'Антикризисное управление',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
            ),
            color: 'from-orange-500 to-red-500',
        },
    ];

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const selectService = (serviceValue) => {
        setFormData({
            ...formData,
            service_type: serviceValue,
        });
        setStep(2);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await onSubmit(formData);

        if (result.success) {
            setFormData({ title: '', service_type: '', description: '' });
            setStep(1);
            onClose();
        } else {
            setError(result.error?.title?.[0] || result.error?.service_type?.[0] || 'Ошибка создания заказа');
        }

        setLoading(false);
    };

    const handleClose = () => {
        setFormData({ title: '', service_type: '', description: '' });
        setStep(1);
        setError('');
        onClose();
    };

    if (!isOpen) return null;

    const selectedService = serviceTypes.find(s => s.value === formData.service_type);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full mx-4 animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="border-b border-gray-100 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-extrabold tracking-tight text-primary">Создать заказ</h2>
                            <p className="text-sm text-secondary mt-1">Шаг {step} из 2</p>
                        </div>
                        <button
                            onClick={handleClose}
                            className="text-secondary hover:text-primary transition-colors p-2 hover:bg-gray-100 rounded-full"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-2xl text-sm mb-6">
                            {error}
                        </div>
                    )}

                    {/* Step 1: Service Selection - Visual Grid */}
                    {step === 1 && (
                        <div>
                            <h3 className="text-lg font-bold text-primary mb-6">Выберите тип услуги</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {serviceTypes.map((service) => (
                                    <button
                                        key={service.value}
                                        onClick={() => selectService(service.value)}
                                        className={`
                      relative overflow-hidden rounded-3xl p-6 text-left
                      bg-gradient-to-br ${service.color}
                      hover:shadow-lg hover:-translate-y-1
                      transition-all duration-200
                      group
                    `}
                                    >
                                        <div className="relative z-10">
                                            <div className="text-white mb-3 opacity-90 group-hover:opacity-100 transition-opacity">
                                                {service.icon}
                                            </div>
                                            <h4 className="text-white font-bold text-sm leading-tight">
                                                {service.label}
                                            </h4>
                                        </div>
                                        {/* Shine effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Title & Description */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Selected Service Badge */}
                            {selectedService && (
                                <div className={`bg-gradient-to-r ${selectedService.color} rounded-2xl p-4 text-white flex items-center justify-between`}>
                                    <div className="flex items-center gap-3">
                                        {selectedService.icon}
                                        <span className="font-semibold">{selectedService.label}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-white/80 hover:text-white text-sm underline"
                                    >
                                        Изменить
                                    </button>
                                </div>
                            )}

                            {/* Title Field */}
                            <div>
                                <label htmlFor="title" className="block text-sm font-bold text-primary mb-3">
                                    Краткая суть вопроса
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-full focus:border-accent focus:outline-none focus:ring-0 transition-colors"
                                    placeholder="Например: Проверка трудового договора"
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="description" className="block text-sm font-bold text-primary mb-3">
                                    Подробное описание
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    required
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-3xl focus:border-accent focus:outline-none focus:ring-0 transition-colors resize-none"
                                    placeholder="Опишите детали вашего запроса..."
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-8 py-4 font-bold rounded-full hover:shadow-lg transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Создание...' : 'Создать заказ'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="px-8 py-4 font-semibold text-secondary hover:bg-gray-100 rounded-full transition-all"
                                >
                                    Назад
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateOrderModal;
