"use client";

import { useRef } from "react";
import GamesCard from "@/components/ui/GamesCard";

export default function GamesCarousel({ items = [] }) {
  const ref = useRef(null);

  function scroll(amount) {
    if (!ref.current) return;
    ref.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div className="overflow-x-hidden">
        <div
          ref={ref}
          className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar py-4"
        >
          {items.map((it, idx) => (
            <div key={idx} className="">
              <GamesCard {...it} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
