"use client";

import { useRef, useEffect, useState } from "react";
import GamesCard from "@/components/ui/GamesCard";
import { HoverScale } from "@/components/animations";
import { motion } from "framer-motion";

export default function GamesCarousel({ items = [] }) {
  const ref = useRef(null);
  const [canScroll, setCanScroll] = useState(false);

  // Check if carousel can scroll
  useEffect(() => {
    const checkScroll = () => {
      if (ref.current) {
        const hasScroll = ref.current.scrollWidth > ref.current.clientWidth;
        setCanScroll(hasScroll);
      }
    };

    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [items]);

  // Auto-scroll animation
  useEffect(() => {
    if (!ref.current || !canScroll) return;

    const scrollContainer = ref.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    const scrollDistance = scrollWidth - clientWidth;

    const scroll = () => {
      scrollContainer.scrollBy({ left: 1, behavior: "auto" });

      // Reset to start when reaches end
      if (scrollContainer.scrollLeft >= scrollDistance - 10) {
        scrollContainer.scrollLeft = 0;
      }
    };

    const interval = setInterval(scroll, 30); // Smooth scroll

    return () => clearInterval(interval);
  }, [canScroll]);

  return (
    <div className="relative">
      <div className="overflow-x-hidden">
        <div
          ref={ref}
          className="flex gap-3 md:gap-5 overflow-x-auto no-scrollbar py-4"
        >
          {items.map((it, idx) => (
            <div key={idx} className="">
              <HoverScale scale={1.05} className="overflow-hidden rounded-lg">
                <GamesCard {...it} />
              </HoverScale>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
