import React from 'react';
import { useLocation } from 'react-router-dom';

const NewCourtCase = () => {
    const location = useLocation();
    const { placeholder } = location.state || {};

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-8">
            <h1 className="text-3xl font-bold text-slate-800">Новое судебное дело</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                    Описание ситуации
                </label>
                <textarea
                    className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-depa-brand focus:border-depa-brand outline-none transition-all"
                    placeholder={placeholder || "Опишите суть спора или укажите номер дела..."}
                />

                <button className="mt-6 px-6 py-3 bg-depa-brand text-white font-medium rounded-lg hover:bg-[#0F2837] transition-colors">
                    Отправить заявку
                </button>
            </div>
        </div>
    );
};

export default NewCourtCase;
