const StatusBadge = ({ status }) => {
    const statusConfig = {
        pending: {
            label: ' Ожидает',
            className: 'bg-gray-100 text-gray-700',
            dot: 'bg-gray-400',
        },
        awaiting_payment: {
            label: 'Оплата',
            className: 'bg-amber-50 text-amber-700',
            dot: 'bg-amber-400',
        },
        in_progress: {
            label: 'В работе',
            className: 'bg-cyan-50 text-cyan-700',
            dot: 'bg-cyan-500',
        },
        completed: {
            label: 'Завершен',
            className: 'bg-emerald-50 text-emerald-700',
            dot: 'bg-emerald-500',
        },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
        <span
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${config.className}`}
        >
            <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse`}></span>
            {config.label}
        </span>
    );
};

export default StatusBadge;
