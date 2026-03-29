'use client'

import { useRef } from 'react'
import GamesCard from '@/components/ui/GamesCard'

export default function GamesCarousel({ items = [] }) {
  const ref = useRef(null)

  function scroll(amount) {
    if (!ref.current) return
    ref.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar py-4">
          {items.map((it, idx) => (
            <div key={idx} className="min-w-[220px] w-[220px]">
              <GamesCard {...it} />
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:flex gap-2 absolute right-2 top-1/2 -translate-y-1/2">
        <button onClick={() => scroll(-400)} className="p-2 bg-white rounded-full shadow">‹</button>
        <button onClick={() => scroll(400)} className="p-2 bg-white rounded-full shadow">›</button>
      </div>
    </div>
  )
}
