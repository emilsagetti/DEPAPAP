import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Loader2, CheckCircle, Building2 } from 'lucide-react';

// DaData API Configuration
const DADATA_URL = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const DADATA_TOKEN = import.meta.env.VITE_DADATA_API_KEY;

const AddressInput = ({ label, value, onChange, placeholder, error: externalError }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isValidAddress, setIsValidAddress] = useState(null);
    const [selectedFromList, setSelectedFromList] = useState(false);
    const inputRef = useRef(null);
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

    // Fetch suggestions from DaData
    const fetchSuggestions = async (query) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(DADATA_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${DADATA_TOKEN}`
                },
                body: JSON.stringify({
                    query,
                    count: 7,
                    locations: [{ country_iso_code: 'RU' }]
                })
            });

            if (response.ok) {
                const data = await response.json();
                setSuggestions(data.suggestions || []);
            } else {
                console.error('DaData API error:', response.status);
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
        onChange({ target: { name: 'legal_address', value: newValue } });
        setSelectedFromList(false);
        setIsValidAddress(null);

        // Debounce API calls
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchSuggestions(newValue);
        }, 300);
    };

    // Handle suggestion select
    const handleSelect = (suggestion) => {
        onChange({ target: { name: 'legal_address', value: suggestion.value } });
        setSuggestions([]);
        setSelectedFromList(true);

        // Check if address is complete (fias_level 7+ = street/house level)
        const fiasLevel = parseInt(suggestion.data?.fias_level || '0');
        if (fiasLevel >= 7 || suggestion.data?.house) {
            setIsValidAddress(true);
        } else {
            setIsValidAddress(null);
        }
    };

    // Validate on blur
    const handleBlur = () => {
        setTimeout(() => {
            if (!value || value.length < 5) {
                setIsValidAddress(null);
                return;
            }
            if (selectedFromList) {
                setIsValidAddress(true);
            }
        }, 150);
    };

    // Get address type icon/description
    const getAddressInfo = (data) => {
        if (data?.house) return 'Дом';
        if (data?.street) return 'Улица';
        if (data?.city) return 'Город';
        if (data?.settlement) return 'Населённый пункт';
        if (data?.region) return 'Регион';
        return 'Адрес';
    };

    return (
        <div className="space-y-1.5" ref={wrapperRef}>
            <label className="block text-sm font-medium text-slate-700">
                {label}
            </label>
            <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                    <MapPin size={18} className="text-slate-400" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => {
                        setIsFocused(true);
                        if (value && value.length >= 3) {
                            fetchSuggestions(value);
                        }
                    }}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    autoComplete="off"
                    className={`w-full pl-10 pr-10 py-3 border rounded-xl focus:outline-none focus:ring-2 transition-all ${isValidAddress === true
                            ? 'border-green-300 focus:ring-green-100 focus:border-green-500'
                            : 'border-slate-200 focus:ring-blue-100 focus:border-blue-500'
                        }`}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isLoading && <Loader2 size={18} className="text-blue-500 animate-spin" />}
                    {!isLoading && isValidAddress === true && <CheckCircle size={18} className="text-green-500" />}
                </div>

                {/* Glassmorphism Suggestions dropdown */}
                <AnimatePresence>
                    {suggestions.length > 0 && isFocused && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                            className="absolute z-50 w-full mt-2 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-2xl overflow-hidden"
                            style={{
                                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <div className="p-2 max-h-72 overflow-y-auto">
                                {suggestions.map((suggestion, index) => (
                                    <motion.button
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.04 }}
                                        type="button"
                                        onClick={() => handleSelect(suggestion)}
                                        className="w-full px-3 py-3 text-left hover:bg-blue-50/80 active:bg-blue-100/80 transition-all flex items-start gap-3 rounded-xl group"
                                    >
                                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 group-hover:from-blue-200 group-hover:to-blue-100 flex items-center justify-center transition-all flex-shrink-0 mt-0.5">
                                            {suggestion.data?.house ? (
                                                <Building2 size={16} className="text-blue-600" />
                                            ) : (
                                                <MapPin size={16} className="text-blue-600" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-slate-800 group-hover:text-slate-900 leading-snug">
                                                {suggestion.value}
                                            </p>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {getAddressInfo(suggestion.data)}
                                            </p>
                                        </div>
                                        {suggestion.data?.house && (
                                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex-shrink-0">
                                                Полный
                                            </span>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                            <div className="px-4 py-2.5 border-t border-slate-100/80 bg-slate-50/60">
                                <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1.5">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                                    Данные из базы ФИАС России
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {externalError && (
                <p className="text-xs text-red-500 mt-1">{externalError}</p>
            )}
        </div>
    );
};

export default AddressInput;
