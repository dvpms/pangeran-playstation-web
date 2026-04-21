'use client';

export default function PageHeader({ title, subtitle, actionButton = null }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
      <div>
        <h1 className="text-2xl md:text-display-lg font-extrabold tracking-[-0.02em] text-on-surface">
          {title}
        </h1>
        <p className="text-sm md:text-body-lg text-on-surface-variant mt-2">{subtitle}</p>
      </div>

      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="w-full md:w-auto bg-primary text-white px-4 md:px-6 py-2 md:py-3 rounded-xl font-label text-sm md:text-base flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_12px_24px_-6px_rgba(0,102,138,0.2)]"
        >
          {actionButton.icon}
          {actionButton.label}
        </button>
      )}
    </div>
  );
}
