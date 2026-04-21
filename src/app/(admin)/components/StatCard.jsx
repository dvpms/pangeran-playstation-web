'use client';

import { ReactNode } from 'react';

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  variant = 'default',
  actionButton = null,
}) {
  const baseClasses =
    'rounded-xl p-4 md:p-6 relative overflow-hidden group';

  const variantClasses = {
    default:
      'bg-surface-container-lowest',
    primary:
      'bg-primary text-on-primary',
  };

  const contentClasses = {
    default: 'text-on-surface',
    primary: 'text-white',
  };

  const glowColors = {
    default: 'bg-primary-container/20',
    primary: 'bg-white/10',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      {/* Glow Effect */}
      <div
        className={`absolute -right-6 -top-6 w-24 h-24 ${glowColors[variant]} rounded-full blur-xl group-hover:scale-150 transition-transform duration-500`}
      ></div>

      {/* Header */}
      <div
        className={`flex items-center justify-between mb-3 md:mb-4 relative z-10 ${
          variant === 'primary'
            ? 'text-white'
            : 'text-on-surface-variant'
        }`}
      >
        <span className="font-medium text-xs md:text-sm">{title}</span>
        <div
          className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-lg md:text-xl ${
            variant === 'primary'
              ? 'bg-white/20 text-white'
              : 'bg-primary-container/30 text-primary'
          }`}
        >

          {icon}

        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3
          className={`text-2xl md:text-3xl font-extrabold ${contentClasses[variant]}`}
        >
          {value}
        </h3>

        {/* Subtitle / Action Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mt-2">
          <div
            className={`flex items-center gap-1 text-xs md:text-sm font-medium ${
              variant === 'primary'
                ? 'text-white'
                : 'text-primary'
            }`}
          >
            <span>{subtitle.text}</span>
          </div>

          {actionButton && (
            <button
              onClick={actionButton.onClick}
              className="w-full md:w-auto bg-secondary-container text-on-secondary-container px-3 md:px-4 py-1.5 md:py-2 rounded-lg font-bold text-xs md:text-sm hover:opacity-90 transition-opacity"
            >
              {actionButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
