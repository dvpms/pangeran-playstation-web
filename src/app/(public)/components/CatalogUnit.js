import Image from "next/image";
import { HoverScale } from "@/components/animations";

function formatRupiah(amount) {
  return Number(amount).toLocaleString("id-ID");
}

export default function CatalogUnit({
  title,
  subtitle,
  tiers = [],
  image,
  label = "Unit",
}) {
  return (
    <article className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6">
      <div className="md:w-1/2 rounded-xl overflow-hidden">
        {image ? (
          <HoverScale scale={1.08}>
            <Image
              src={image}
              alt={title}
              loading="lazy"
              width={800}
              height={600}
              className="object-cover w-full h-full"
            />
          </HoverScale>
        ) : (
          <div className="w-full h-44 bg-surface-container flex items-center justify-center">
            No Image
          </div>
        )}
      </div>
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-3">
            <div className="space-y-1">
              <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant text-xs font-bold uppercase">
                {label}
              </span>
              <h3 className="text-xl font-extrabold text-on-surface">
                {title}
              </h3>
              {subtitle && (
                <p className="text-on-surface-variant text-sm mt-2">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4 text-center">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className="p-3 rounded-xl border-2 border-primary"
              >
                <div className="text-[10px] font-bold text-primary uppercase">
                  {tier.duration}
                </div>
                {tier.oldPrice != null && (
                  <div className="text-xs text-surface-on/40 line-through">
                    Rp {formatRupiah(tier.oldPrice)}
                  </div>
                )}
                <div className="text-lg font-bold text-primary">
                  Rp {formatRupiah(tier.price)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <a
          href="booking"
          className="mt-6 block text-center py-3 rounded-xl bg-primary text-white font-bold"
        >
          Booking Sekarang
        </a>
      </div>
    </article>
  );
}
