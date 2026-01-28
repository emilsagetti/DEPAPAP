import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Loader2, Search, CheckCircle, Sparkles, User } from 'lucide-react';

// DaData Party API for company lookup
const DADATA_PARTY_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
const DADATA_TOKEN = import.meta.env.VITE_DADATA_API_KEY;

const CompanyLookup = ({ onCompanySelect, currentValue }) => {
    const [query, setQuery] = useState(currentValue || '');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const wrapperRef = useRef(null);
    const debounceRef = useRef(null);

    // Close suggestions on click outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setSuggestions([]);
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch company suggestions from DaData
    const fetchCompanies = async (searchQuery) => {
        if (!searchQuery || searchQuery.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(DADATA_PARTY_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${DADATA_TOKEN}`
                },
                body: JSON.stringify({
                    query: searchQuery,
                    count: 7
                    // No type filter - search both LEGAL and INDIVIDUAL
                })
            });

            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || []);
            } else {
                console.error('DaData Party API error:', response.status);
                setSuggestions([]);
            }
        } catch (err) {
            console.error('DaData fetch error:', err);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle input change with debounce
    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setQuery(newValue);
        setSelectedCompany(null);

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchCompanies(newValue);
        }, 300);
    };

    // Handle company select - extract all data
    const handleSelect = (suggestion) => {
        const data = suggestion.data;

        const companyData = {
            company_name: data.name?.short_with_opf || data.name?.full_with_opf || suggestion.value,
            inn: data.inn || '',
            ogrn: data.ogrn || '',
            kpp: data.kpp || '',
            legal_address: data.address?.unrestricted_value || data.address?.value || ''
        };

        setQuery(companyData.company_name);
        setSelectedCompany(companyData);
        setSuggestions([]);
        onCompanySelect(companyData);
    };

    // Get company status badge
    const getStatusBadge = (data) => {
        if (data.state?.status === 'ACTIVE') {
            return { text: 'Действует', color: 'bg-green-100 text-green-700' };
        } else if (data.state?.status === 'LIQUIDATING') {
            return { text: 'Ликвидируется', color: 'bg-yellow-100 text-yellow-700' };
        } else if (data.state?.status === 'LIQUIDATED') {
            return { text: 'Ликвидирована', color: 'bg-red-100 text-red-700' };
        }
        return null;
    };

    // Check if individual entrepreneur
    const isIndividual = (data) => {
        return data.type === 'INDIVIDUAL';
    };

    return (
        <div className="space-y-1.5" ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700">
                Название компании
                <span className="ml-2 text-xs text-blue-500 font-normal">
                    ✨ Введите название или ИНН для автозаполнения
                </span>
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <Building2 size={18} className="text-slate-400" />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onFocus={() => {
                        setIsFocused(true);
                        if (query && query.length >= 2 && !selectedCompany) {
                            fetchCompanies(query);
                        }
                    }}
                    placeholder="ООО «Компания» или ИНН"
                    autoComplete="off"
                    className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${selectedCompany
                        ? 'border-green-300 focus:ring-green-100 focus:border-green-500 bg-green-50/30'
                        : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isLoading && <Loader2 size={18} className="text-blue-500 animate-spin" />}
                    {!isLoading && selectedCompany && <CheckCircle size={18} className="text-green-500" />}
                    {!isLoading && !selectedCompany && <Search size={18} className="text-slate-300" />}
                </div>

                {/* Glassmorphism Company Suggestions */}
                <AnimatePresence>
                    {suggestions.length > 0 && isFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute z-50 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden"
                            style={{
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="px-4 py-2.5 border-b border-slate-100/80 bg-gradient-to-r from-blue-50/80 to-purple-50/80">
                                <p className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                                    <Sparkles size={12} className="text-blue-500" />
                                    Найдено компаний: {suggestions.length}
                                </p>
                            </div>
                            <div className="p-2 max-h-80 overflow-y-auto">
                                {suggestions.map((suggestion, index) => {
                                    const status = getStatusBadge(suggestion.data);
                                    return (
                                        <motion.button
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.04 }}
                                            type="button"
                                            onClick={() => handleSelect(suggestion)}
                                            className="w-full px-3 py-3 text-left hover:bg-blue-50/80 active:bg-blue-100/80 transition-all rounded-xl group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 ${isIndividual(suggestion.data)
                                                        ? 'bg-gradient-to-br from-purple-100 to-pink-100 group-hover:from-purple-200 group-hover:to-pink-200'
                                                        : 'bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200'
                                                    }`}>
                                                    {isIndividual(suggestion.data)
                                                        ? <User size={18} className="text-purple-600" />
                                                        : <Building2 size={18} className="text-blue-600" />
                                                    }
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <p className="text-sm font-medium text-slate-800 group-hover:text-slate-900">
                                                            {suggestion.data.name?.short_with_opf || suggestion.value}
                                                        </p>
                                                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${isIndividual(suggestion.data)
                                                                ? 'bg-purple-100 text-purple-700'
                                                                : 'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {isIndividual(suggestion.data) ? 'ИП' : 'ООО'}
                                                        </span>
                                                        {status && (
                                                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.color}`}>
                                                                {status.text}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-xs text-slate-500 mt-0.5">
                                                        ИНН: {suggestion.data.inn}
                                                        {suggestion.data.ogrn && ` • ОГРН: ${suggestion.data.ogrn}`}
                                                    </p>
                                                    {suggestion.data.address?.value && (
                                                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                                                            📍 {suggestion.data.address.value}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>
                            <div className="px-4 py-2.5 border-t border-slate-100/80 bg-slate-50/60">
                                <p className="text-xs text-slate-400 text-center">
                                    Данные из ЕГРЮЛ/ЕГРИП ФНС России
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {selectedCompany && (
                <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-green-600 flex items-center gap-1"
                >
                    <CheckCircle size={12} />
                    Все поля заполнены автоматически
                </motion.p>
            )}
        </div>
    );
};

export default CompanyLookup;
