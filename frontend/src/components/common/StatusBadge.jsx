import React from 'react';

// Map status keys to styles
const STATUS_STYLES = {
    pending: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    in_progress: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    done: 'bg-green-500/20 text-green-300 border-green-500/30',
    canceled: 'bg-red-500/20 text-red-300 border-red-500/30',
    waiting_user: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    active: 'bg-green-500/20 text-green-300 border-green-500/30',
    closed: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    paid: 'bg-green-500/20 text-green-300 border-green-500/30',
    unpaid: 'bg-red-500/20 text-red-300 border-red-500/30'
};

const StatusBadge = ({ status, label }) => {
    const styles = STATUS_STYLES[status] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles} whitespace-nowrap`}>
            {label || status}
        </span>
    );
};

export default StatusBadge;
