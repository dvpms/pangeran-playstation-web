"use client";

import { MdEdit, MdDelete, MdAddCircle } from "react-icons/md";

const TYPE_BADGE = {
  CONSOLE: "bg-blue-100 text-blue-700",
  ADDON: "bg-green-100 text-green-700",
};

function formatRupiah(amount) {
  return `Rp ${Number(amount).toLocaleString("id-ID")}`;
}

export default function CatalogCard({
  catalog,
  onEditCatalog,
  onEditTier,
  onAddTier,
  onDeleteTier,
}) {
  const { id, name, type, description, tiers = [] } = catalog;

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-ambient-blue border border-outline-variant/20">
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-lg font-bold text-surface-on truncate">{name}</h2>
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                TYPE_BADGE[type] ?? "bg-surface-container text-surface-on"
              }`}
            >
              {type}
            </span>
          </div>
          {description && (
            <p className="text-sm text-surface-on/60 mt-0.5">{description}</p>
          )}
        </div>

        <button
          onClick={() => onEditCatalog(catalog)}
          className="flex items-center gap-1.5 bg-secondary-container text-secondary-on-container py-2 px-4 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-95 transition-all shrink-0"
        >
          <MdEdit className="w-4 h-4" />
          Edit Katalog
        </button>
      </div>

      {/* Tier Table */}
      {tiers.length === 0 ? (
        <p className="text-sm text-surface-on/50 italic py-4 text-center border border-dashed border-outline-variant/40 rounded-xl">
          Belum ada paket harga. Tambahkan paket pertama.
        </p>
      ) : (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-outline-variant/30 text-surface-on/60 text-xs font-semibold">
                <th className="py-2 px-3 text-left">Label</th>
                <th className="py-2 px-3 text-left">Durasi</th>
                <th className="py-2 px-3 text-left">Harga</th>
                <th className="py-2 px-3 text-left">Harga Coret</th>
                <th className="py-2 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier) => (
                <tr
                  key={tier.id}
                  className="border-b border-outline-variant/20 hover:bg-surface-container/50 transition-colors"
                >
                  <td className="py-3 px-3 font-medium text-surface-on">
                    {tier.label}
                  </td>
                  <td className="py-3 px-3 text-surface-on/70">{tier.duration}</td>
                  <td className="py-3 px-3 font-semibold text-primary">
                    {formatRupiah(tier.price)}
                  </td>
                  <td className="py-3 px-3 text-surface-on/50">
                    {tier.oldPrice != null ? (
                      <span className="line-through">{formatRupiah(tier.oldPrice)}</span>
                    ) : (
                      <span className="text-surface-on/30">—</span>
                    )}
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => onEditTier(tier)}
                        className="p-1.5 rounded-lg text-surface-on/50 hover:text-primary hover:bg-surface-container transition-colors"
                        title={`Edit paket ${tier.label}`}
                      >
                        <MdEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTier(tier)}
                        className="p-1.5 rounded-lg text-surface-on/50 hover:text-red-500 hover:bg-red-50 transition-colors"
                        title={`Hapus paket ${tier.label}`}
                      >
                        <MdDelete className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Tier Button */}
      <button
        onClick={() => onAddTier(id)}
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-dashed border-primary/40 text-primary text-sm font-semibold hover:bg-primary/5 hover:border-primary transition-all"
      >
        <MdAddCircle className="w-4 h-4" />
        Tambah Paket
      </button>
    </div>
  );
}
