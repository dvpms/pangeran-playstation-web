'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Container from './Container'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <nav className="w-full bg-surface text-on-surface border-b border-outline-variant">
      <Container>
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Pangeran" width={40} height={40} className="rounded-lg" />
            <span className="font-extrabold tracking-tight">PANGERAN PLAYSTATION</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="#area" className="text-sm hover:text-primary">Area</Link>
            <Link href="#sk" className="text-sm hover:text-primary">S&amp;K</Link>
            <Link href="#cara-pesan" className="text-sm hover:text-primary">Cara Pesan</Link>
            <Link href="#booking" className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-full font-bold text-sm">Booking</Link>
          </div>

          <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              className="p-2 rounded-md bg-surface-container-low"
              onClick={() => setOpen((s) => !s)}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="md:hidden border-t border-outline-variant bg-surface">
          <Container>
            <div className="flex flex-col gap-3 py-4">
              <Link href="#area" onClick={() => setOpen(false)} className="block">Area</Link>
              <Link href="#sk" onClick={() => setOpen(false)} className="block">S&amp;K</Link>
              <Link href="#cara-pesan" onClick={() => setOpen(false)} className="block">Cara Pesan</Link>
              <Link href="#booking" onClick={() => setOpen(false)} className="block font-bold">Booking</Link>
            </div>
          </Container>
        </div>
      )}
    </nav>
  )
}
