// components/Alert.tsx
import React, { useEffect, useState } from 'react';

interface AlertProps {
    type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
    title?: string;
    message: string;
    onClose: () => void; // Añadido para manejar el cierre del alerta
}

const alertStyles = {
    info: {
        text: 'text-blue-800',
        border: 'border-blue-300',
        bg: 'bg-blue-50',
        darkText: 'dark:text-blue-400',
        darkBorder: 'dark:border-blue-800',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
    },
    danger: {
        text: 'text-red-800',
        border: 'border-red-300',
        bg: 'bg-red-50',
        darkText: 'dark:text-red-400',
        darkBorder: 'dark:border-red-800',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
    },
    success: {
        text: 'text-green-800',
        border: 'border-green-300',
        bg: 'bg-green-50',
        darkText: 'dark:text-green-400',
        darkBorder: 'dark:border-green-800',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
    },
    warning: {
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        bg: 'bg-yellow-50',
        darkText: 'dark:text-yellow-300',
        darkBorder: 'dark:border-yellow-800',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
    },
    dark: {
        text: 'text-gray-800',
        border: 'border-gray-300',
        bg: 'bg-gray-50',
        darkText: 'dark:text-gray-300',
        darkBorder: 'dark:border-gray-600',
        iconPath: 'M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z',
    },
};

const Alert: React.FC<AlertProps> = ({ type, title, message, onClose }) => {
    const { text, border, bg, darkText, darkBorder, iconPath } = alertStyles[type];
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Espera a que la animación de salida termine
        }, 8000); // Duración visible del alert en milisegundos

        return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }, [onClose]);

    return (
        <div
            className={`absolute left-10 p-4 text-sm ${text} border ${border} rounded-lg ${bg} dark:bg-gray-800 ${darkText} dark:border-gray-800 transition-transform transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
                }`}
            role="alert"
        >
            <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d={iconPath} />
            </svg>
            <span className="sr-only">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            <div>
                {title && (<span className="font-medium">{title}</span>)} {message}
            </div>
        </div>
    );
};

export default Alert;
