import React from 'react';

const CabinetPageHeader = ({ title, parent, children }) => {
    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                {parent && (
                    <div className="text-sm text-gray-400 mb-1">{parent}</div>
                )}
                <h1 className="text-2xl font-semibold text-white tracking-wide">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
                {children}
            </div>
        </div>
    );
};

export default CabinetPageHeader;
