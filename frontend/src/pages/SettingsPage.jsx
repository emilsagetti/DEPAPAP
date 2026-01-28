import React, { useState, useEffect } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { User, Building2, Shield, Camera, Eye, EyeOff, Check, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../api/services';
import ImageCropModal from '../components/ImageCropModal';
import AddressInput from '../components/AddressInput';
import CompanyLookup from '../components/CompanyLookup';

const tabs = [
    { id: 'profile', label: 'Профиль', icon: User },
    { id: 'company', label: 'Компания', icon: Building2 },
    { id: 'security', label: 'Безопасность', icon: Shield }
];

// Toast Notification Component
const Toast = ({ message, type, onClose }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg z-50 ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
            }`}
    >
        {type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
        <span className="text-sm font-medium">{message}</span>
        <button onClick={onClose} className="ml-2 hover:opacity-80">&times;</button>
    </motion.div>
);

// Input Component
const FormInput = ({ label, type = 'text', value, onChange, name, placeholder, disabled = false }) => (
    <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
        <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={`w-full h-12 px-4 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${disabled ? 'opacity-60 cursor-not-allowed' : ''
                }`}
        />
    </div>
);

// Password Input with Toggle
const PasswordInput = ({ label, placeholder, value, onChange, name }) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
            <div className="relative">
                <input
                    type={show ? 'text' : 'password'}
                    name={name}
                    value={value || ''}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="w-full h-12 px-4 pr-12 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                    {show ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
};

// Profile Tab Content
const ProfileTab = ({ user, formData, setFormData, onSave, isSaving, onFileSelect, isUploading }) => {
    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Get user initials for avatar
    const getInitials = () => {
        if (formData.first_name && formData.last_name) {
            return `${formData.first_name[0]}${formData.last_name[0]}`.toUpperCase();
        }
        if (formData.first_name) return formData.first_name[0].toUpperCase();
        if (user?.email) return user.email[0].toUpperCase();
        return 'U';
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });
    };

    // Handle file selection
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type and size
            if (!file.type.startsWith('image/')) {
                alert('Пожалуйста, выберите изображение');
                return;
            }
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                alert('Размер файла не должен превышать 5MB');
                return;
            }
            onFileSelect(file);
        }
    };

    return (
        <div className="space-y-8">
            {/* Avatar Section */}
            <div className="flex items-center gap-6">
                <div className="relative">
                    {user?.avatar_url ? (
                        <img
                            src={user.avatar_url}
                            alt="Avatar"
                            className="w-24 h-24 rounded-2xl object-cover"
                        />
                    ) : (
                        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                            {getInitials()}
                        </div>
                    )}
                    <input
                        type="file"
                        id="avatar-upload"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                    />
                    <label
                        htmlFor="avatar-upload"
                        className={`absolute -bottom-2 -right-2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 cursor-pointer ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                        {isUploading ? (
                            <Loader2 size={14} className="text-slate-500 animate-spin" />
                        ) : (
                            <Camera size={14} className="text-slate-500" />
                        )}
                    </label>
                </div>
                <div>
                    <h3 className="font-bold text-slate-900">
                        {formData.first_name} {formData.last_name}
                    </h3>
                    <p className="text-sm text-slate-500">
                        Клиент с {formatDate(user?.date_joined)}
                    </p>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                    label="Имя"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                />
                <FormInput
                    label="Фамилия"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                />
                <FormInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled
                />
                <FormInput
                    label="Телефон"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+7 (999) 123-45-67"
                />
            </div>

            <motion.button
                onClick={onSave}
                disabled={isSaving}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-depa-cta hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
                {isSaving && <Loader2 size={18} className="animate-spin" />}
                {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </motion.button>
        </div>
    );
};

// Company Tab Content
// Company Tab Content
const CompanyTab = ({ user, onUpdate }) => {
    const [companyData, setCompanyData] = useState({
        company_name: user?.company_name || '',
        inn: user?.inn || '',
        ogrn: user?.ogrn || '',
        kpp: user?.kpp || '',
        legal_address: user?.legal_address || ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCompanyData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setSuccess('');
        setError('');
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        try {
            const updated = await userAPI.updateProfile(companyData);
            onUpdate(updated);
            setSuccess('Данные компании сохранены');
        } catch (err) {
            setError('Ошибка при сохранении данных');
        } finally {
            setIsSaving(false);
        }
    };

    // Handle auto-fill from CompanyLookup
    const handleCompanySelect = (data) => {
        setCompanyData(prev => ({
            ...prev,
            ...data
        }));
        setSuccess('');
        setError('');
    };

    return (
        <div className="space-y-6">
            {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {error}
                </div>
            )}

            {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 flex items-center gap-2">
                    <Check size={16} />
                    {success}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                    <CompanyLookup
                        onCompanySelect={handleCompanySelect}
                        currentValue={companyData.company_name}
                    />
                </div>
                <FormInput
                    label="ИНН"
                    name="inn"
                    value={companyData.inn}
                    onChange={handleChange}
                    placeholder="1234567890"
                />
                <FormInput
                    label="ОГРН"
                    name="ogrn"
                    value={companyData.ogrn}
                    onChange={handleChange}
                    placeholder="ОГРН/ОГРНИП"
                />
                <FormInput
                    label="КПП"
                    name="kpp"
                    value={companyData.kpp}
                    onChange={handleChange}
                    placeholder="123456789"
                />
                <div className="md:col-span-2">
                    <AddressInput
                        label="Юридический адрес"
                        value={companyData.legal_address}
                        onChange={handleChange}
                        placeholder="Начните вводить адрес..."
                    />
                </div>
            </div>

            <motion.button
                onClick={handleSave}
                disabled={isSaving}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-depa-cta hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
                {isSaving && <Loader2 size={18} className="animate-spin" />}
                {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
            </motion.button>
        </div>
    );
};

// Security Tab Content
const SecurityTab = () => {
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: ''
    });
    const [isChanging, setIsChanging] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setPasswords(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
        setError('');
        setSuccess('');
    };

    const handlePasswordChange = async () => {
        // Validation
        if (!passwords.current || !passwords.new || !passwords.confirm) {
            setError('Заполните все поля');
            return;
        }
        if (passwords.new.length < 8) {
            setError('Новый пароль должен быть не менее 8 символов');
            return;
        }
        if (passwords.new !== passwords.confirm) {
            setError('Пароли не совпадают');
            return;
        }

        setIsChanging(true);
        setError('');

        try {
            await userAPI.changePassword(passwords.current, passwords.new);
            setSuccess('Пароль успешно изменён');
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (err) {
            if (err.response?.status === 400) {
                setError('Неверный текущий пароль');
            } else {
                setError('Ошибка при смене пароля');
            }
        } finally {
            setIsChanging(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Change Password */}
            <div className="bg-slate-50 rounded-2xl p-6">
                <h3 className="font-bold text-slate-900 mb-4">Сменить пароль</h3>

                {error && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 flex items-center gap-2">
                        <AlertCircle size={16} />
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-sm text-green-600 flex items-center gap-2">
                        <Check size={16} />
                        {success}
                    </div>
                )}

                <div className="space-y-4 max-w-md">
                    <PasswordInput
                        label="Текущий пароль"
                        name="current"
                        value={passwords.current}
                        onChange={handleChange}
                        placeholder="Введите текущий пароль"
                    />
                    <PasswordInput
                        label="Новый пароль"
                        name="new"
                        value={passwords.new}
                        onChange={handleChange}
                        placeholder="Минимум 8 символов"
                    />
                    <PasswordInput
                        label="Подтвердите пароль"
                        name="confirm"
                        value={passwords.confirm}
                        onChange={handleChange}
                        placeholder="Повторите новый пароль"
                    />
                </div>
                <motion.button
                    onClick={handlePasswordChange}
                    disabled={isChanging}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 px-6 py-3 bg-depa-cta hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
                >
                    {isChanging && <Loader2 size={18} className="animate-spin" />}
                    {isChanging ? 'Сохранение...' : 'Обновить пароль'}
                </motion.button>
            </div>

            {/* Two-Factor */}
            <div className="bg-slate-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-slate-900">Двухфакторная аутентификация</h3>
                        <p className="text-sm text-slate-500 mt-1">Дополнительный уровень защиты для вашего аккаунта</p>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-200 text-slate-600 rounded-full text-sm font-semibold">
                        Выключена
                    </div>
                </div>
            </div>
        </div>
    );
};

const SettingsPage = () => {
    const { user, updateProfile } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: ''
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [toast, setToast] = useState(null);

    // Cropping state
    const [cropModalOpen, setCropModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Initialize form with user data
    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                email: user.email || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    // Handle save profile
    const handleSave = async () => {
        setIsSaving(true);
        try {
            const result = await updateProfile({
                first_name: formData.first_name,
                last_name: formData.last_name,
                email: formData.email,
                phone: formData.phone
            });

            if (result.success) {
                setToast({ message: 'Профиль успешно обновлен', type: 'success' });
            } else {
                setToast({ message: result.error || 'Ошибка обновления', type: 'error' });
            }
        } catch (err) {
            setToast({ message: 'Ошибка сохранения', type: 'error' });
        } finally {
            setIsSaving(false);
            setTimeout(() => setToast(null), 3000);
        }
    };

    // Handle file selection - open crop modal
    const handleFileSelect = (file) => {
        setSelectedFile(file);
        setCropModalOpen(true);
    };

    // Handle avatar upload after cropping
    const handleAvatarUpload = async (croppedFile) => {
        setIsUploading(true);
        try {
            const result = await userAPI.uploadAvatar(croppedFile);
            // Update user context with new avatar
            await updateProfile({});
            setToast({ message: 'Фото профиля обновлено', type: 'success' });
        } catch (err) {
            setToast({ message: 'Ошибка загрузки фото', type: 'error' });
        } finally {
            setIsUploading(false);
            setSelectedFile(null);
            setTimeout(() => setToast(null), 3000);
        }
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <ProfileTab
                        user={user}
                        formData={formData}
                        setFormData={setFormData}
                        onSave={handleSave}
                        isSaving={isSaving}
                        onFileSelect={handleFileSelect}
                        isUploading={isUploading}
                    />
                );
            case 'company': return <CompanyTab user={user} onUpdate={(data) => setFormData(prev => ({ ...prev, ...data }))} />;
            case 'security': return <SecurityTab />;
            default: return <ProfileTab user={user} formData={formData} setFormData={setFormData} onSave={handleSave} isSaving={isSaving} />;
        }
    };

    return (
        <div className="space-y-6">
            {/* Toast Notification */}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}

            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-900">Настройки</h2>
                <p className="text-slate-500 text-sm">Управление профилем и безопасностью</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Tabs */}
                <div className="lg:w-56 flex-shrink-0">
                    <div className="bg-white border border-slate-200 rounded-2xl p-2 space-y-1 lg:sticky lg:top-28">
                        <LayoutGroup>
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className="relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors"
                                >
                                    {activeTab === tab.id && (
                                        <motion.div
                                            layoutId="settings-tab-active"
                                            className="absolute inset-0 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl border-l-4 border-blue-600 z-0"
                                            transition={{
                                                type: "spring",
                                                bounce: 0.15,
                                                duration: 0.5
                                            }}
                                        />
                                    )}
                                    <span className={`relative z-10 flex items-center gap-3 ${activeTab === tab.id ? 'text-blue-700' : 'text-slate-600 hover:text-slate-800'}`}>
                                        <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'} />
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </LayoutGroup>
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 bg-white border border-slate-200 rounded-2xl p-8">
                    {renderContent()}
                </div>
            </div>

            {/* Image Crop Modal */}
            <ImageCropModal
                isOpen={cropModalOpen}
                onClose={() => {
                    setCropModalOpen(false);
                    setSelectedFile(null);
                }}
                imageFile={selectedFile}
                onCropComplete={handleAvatarUpload}
            />
        </div>
    );
};

export default SettingsPage;
