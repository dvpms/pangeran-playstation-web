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
    'rounded-xl p-6 relative overflow-hidden group';

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
        className={`flex items-center justify-between mb-4 relative z-10 ${
          variant === 'primary'
            ? 'text-white'
            : 'text-on-surface-variant'
        }`}
      >
        <span className="font-medium text-sm">{title}</span>
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            variant === 'primary'
              ? 'bg-white/20 text-white'
              : 'bg-primary-container/30 text-primary'
          }`}
        >
          {typeof icon === 'function' ? icon({ size: 24 }) : typeof icon === 'string' ? <span>{icon}</span> : icon}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3
          className={`text-3xl font-extrabold ${contentClasses[variant]}`}
        >
          {value}
        </h3>

        {/* Subtitle / Action Row */}
        <div className="flex items-center justify-between gap-1 mt-2">
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              variant === 'primary'
                ? 'text-white'
                : 'text-primary'
            }`}
          >
            {subtitle.icon && (
              <span className="material-symbols-outlined text-[16px]">
                {subtitle.icon}
              </span>
            )}
            <span>{subtitle.text}</span>
          </div>

          {actionButton && (
            <button
              onClick={actionButton.onClick}
              className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity"
            >
              {actionButton.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
