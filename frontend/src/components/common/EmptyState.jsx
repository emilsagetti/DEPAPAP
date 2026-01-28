import React from 'react';
import { Archive } from 'lucide-react'; // Assuming lucide-react is available, or use a text icon

const EmptyState = ({ title, description, action }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-4 text-3xl">
                <Archive className="w-8 h-8 text-white/50" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
            <p className="text-gray-400 max-w-sm mb-6">{description}</p>
            {action}
        </div>
    );
};

export default EmptyState;
