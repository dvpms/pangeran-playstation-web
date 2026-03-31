import Image from "next/image";
import Link from "next/link";

export default function GamesCard({
  title,
  category,
  subtitle,
  image,
  href,
  className = "",
}) {
  const genre = category || subtitle || "";

  const CardInner = (
    <div
      className={`relative bg-surface-container rounded-4xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-secondary-container/20 border border-transparent ${className}`}
    >
      <div className="w-full h-68 md:h-100 relative hover:scale-105 transition-transform duration-300">
        {image ? (
          <Image
            src={image}
            alt={title}
            loading="eager"
            sizes="(min-width: 768px) 300px, 170px"
            fill
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 text-left ">
          {genre && (
            <span className="text-secondary-container font-bold text-xs tracking-widest uppercase mb-1 block">
              {genre}
            </span>
          )}
          <h4 className="text-white text-xs md:text-2xl text-wrap font-extrabold">
            {title}
          </h4>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-48 md:min-w-75 snap-center group">
      {href ? (
        <Link href={href} aria-label={title}>
          {CardInner}
        </Link>
      ) : (
        CardInner
      )}
    </div>
  );
}
