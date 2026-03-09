import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    maxWidth?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={`modal-content ${maxWidth} w-full`}>
                <div className="flex items-center justify-between p-6 border-b border-orange-200">
                    <h2 className="text-lg font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-orange-50 transition-colors text-gray-400 hover:text-orange-600">
                        <X size={18} />
                    </button>
                </div>
                <div className="p-6">{children}</div>
            </div>
        </div>
    );
};
