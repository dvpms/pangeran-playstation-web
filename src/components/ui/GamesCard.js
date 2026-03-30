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
      className={`relative bg-surface-container rounded-[2rem] overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-secondary-container/20 border border-transparent ${className}`}
    >
      <div className="w-full h-52 md:h-[400px] relative hover:scale-105 transition-transform duration-300">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            No Image
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

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
    <div className="w-[170px] md:min-w-[300px] snap-center group">
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
