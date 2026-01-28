import React, { useState } from 'react';
import axiosInstance from '../api/axios';
import { X, CreditCard, Smartphone, CheckCircle, Loader2 } from 'lucide-react';

const PaymentModal = ({ isOpen, onClose, selectedPlan, onPaymentComplete }) => {
    const [step, setStep] = useState('method'); // method, processing, success
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [agreed, setAgreed] = useState(false);

    if (!isOpen || !selectedPlan) return null;

    const handleProcessPayment = async () => {
        setStep('processing');
        console.log('STARTING PAYMENT (v2)');
        try {
            // Call Backend to Init Payment via Axios (handles Auth automatically)
            const response = await axiosInstance.post('/payments/init', {
                userId: 'current-user', // Backend gets user from Token
                amount: selectedPlan.price,
                method: paymentMethod === 'sbp' ? 'INVOICE' : 'CARD',
                description: `Подписка ${selectedPlan.name}`,
                successUrl: window.location.origin + '/cabinet?payment=success',
                failUrl: window.location.origin + '/cabinet?payment=fail',
            });

            console.log('RESPONSE:', response);
            const data = response.data;

            if (data.paymentUrl) {
                // Redirect user to T-Bank
                console.log('REDIRECTING TO:', data.paymentUrl);
                window.location.href = data.paymentUrl;
            } else {
                throw new Error('No payment URL received');
            }

        } catch (error) {
            console.error('Payment Error:', error);
            // Show more detailed error if available from backend
            const backendError = error.response?.data?.error || 'Ошибка создания платежа. Попробуйте еще раз.';
            alert(backendError);
            setStep('method'); // Go back
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-[#0F172A] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">
                        {step === 'success' ? 'Оплата проведена' : 'Оформление подписки'}
                    </h3>
                    {step !== 'processing' && (
                        <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                            <X size={20} />
                        </button>
                    )}
                </div>

                {/* Content */}
                <div className="p-6">
                    {step === 'method' && (
                        <div className="space-y-6">
                            <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                                <p className="text-sm text-white/50 mb-1">Тариф</p>
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-xl font-bold text-white">{selectedPlan.name}</h4>
                                    <span className="text-[#06B6D4] font-medium">{selectedPlan.price.toLocaleString()} ₽</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <p className="text-sm font-medium text-white/70">Выберите способ оплаты</p>

                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod === 'card'
                                        ? 'bg-[#06B6D4]/10 border-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                                        <CreditCard size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-medium">Банковская карта</div>
                                        <div className="text-white/40 text-xs">Visa, MasterCard, MIR</div>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#06B6D4] bg-[#06B6D4]' : 'border-white/20'
                                        }`}>
                                        {paymentMethod === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </button>

                                <button
                                    onClick={() => setPaymentMethod('sbp')}
                                    className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all ${paymentMethod === 'sbp'
                                        ? 'bg-[#06B6D4]/10 border-[#06B6D4] shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">
                                        <Smartphone size={20} />
                                    </div>
                                    <div className="text-left">
                                        <div className="text-white font-medium">СБП</div>
                                        <div className="text-white/40 text-xs">Быстрый платеж по QR</div>
                                    </div>
                                    <div className={`ml-auto w-5 h-5 rounded-full border flex items-center justify-center ${paymentMethod === 'sbp' ? 'border-[#06B6D4] bg-[#06B6D4]' : 'border-white/20'
                                        }`}>
                                        {paymentMethod === 'sbp' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                    </div>
                                </button>
                            </div>

                            <div className="flex items-start gap-3 py-2">
                                <div className="flex items-center h-5 mt-0.5">
                                    <input
                                        id="payment-agree"
                                        type="checkbox"
                                        checked={agreed}
                                        onChange={(e) => setAgreed(e.target.checked)}
                                        className="w-4 h-4 rounded border-white/20 bg-white/5 text-[#06B6D4] focus:ring-[#06B6D4] focus:ring-offset-[#0F172A]"
                                    />
                                </div>
                                <div className="text-xs text-white/50 leading-snug">
                                    <div className="flex items-center gap-1">
                                        <label htmlFor="payment-agree" className="cursor-pointer hover:text-white/80 transition-colors">
                                            Оплачивая, вы принимаете условия
                                        </label>
                                        <a href="/offer" target="_blank" className="text-[#06B6D4] hover:underline z-10 relative">публичной оферты</a>
                                        <span>и даете</span>
                                        <a href="/consent" target="_blank" className="text-[#06B6D4] hover:underline z-10 relative">согласие на обработку персональных данных</a>.
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleProcessPayment}
                                disabled={!paymentMethod || !agreed}
                                className={`w-full py-3.5 rounded-xl font-bold transition-all ${paymentMethod && agreed
                                    ? 'bg-[#06B6D4] text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transform hover:-translate-y-0.5'
                                    : 'bg-white/5 text-white/30 cursor-not-allowed'
                                    }`}
                            >
                                Оплатить {selectedPlan.price.toLocaleString()} ₽
                            </button>
                        </div>
                    )}

                    {step === 'processing' && (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <Loader2 size={48} className="text-[#06B6D4] animate-spin mb-4" />
                            <h4 className="text-xl font-bold text-white mb-2">Обработка платежа</h4>
                            <p className="text-white/50">Пожалуйста, не закрывайте окно...</p>
                        </div>
                    )}

                    {step === 'success' && (
                        <div className="py-8 flex flex-col items-center justify-center text-center animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-6 border border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                                <CheckCircle size={32} />
                            </div>
                            <h4 className="text-2xl font-bold text-white mb-2">Оплата прошла успешно!</h4>
                            <p className="text-white/50 mb-8">Подписка {selectedPlan.name} активирована.</p>
                            {/* Wait for parent to redirect */}
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-6 h-6 rounded-full border-2 border-[#06B6D4]/30 border-t-[#06B6D4] animate-spin"></div>
                                <p className="text-[#06B6D4]/60 text-xs font-medium">Обновление кабинета...</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default PaymentModal;
