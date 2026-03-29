import Image from 'next/image'

export default function GamesCard({ title, subtitle, price = [], image }) {
  const first = Array.isArray(price) && price.length ? price[0] : null

  return (
    <article className="bg-surface-container rounded-xl p-3 shadow-sm">
      <div className="w-full h-36 rounded-lg overflow-hidden bg-surface-container">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={400}
            height={240}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            No Image
          </div>
        )}
      </div>
      <div className="mt-3">
        <h4 className="text-sm font-bold text-on-surface">{title}</h4>
        {subtitle && <p className="text-xs text-on-surface-variant mt-1">{subtitle}</p>}
        {first && (
          <div className="text-sm font-extrabold text-primary mt-3">
            Mulai Rp {first.cost} / {first.duration}
          </div>
        )}
      </div>
    </article>
  )
}
