"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "./Container";
import { BsFillLightningChargeFill } from "react-icons/bs";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-surface text-on-surface sticky top-0 left-0 z-50 shadow-md py-3">
      <Container>
        <div className="flex items-center justify-between ">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="Pangeran"
              loading="eager"
              width={50}
              height={50}
              className="rounded-lg"
            />
            <span className="font-bold hidden md:inline-block text-primary-container text-xl">
              PANGERAN PLAYSTATION
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-tight">
            <Link href="#area" className="text-slate-600 text-sm hover:text-sky-500 transition-colors">
              Area
            </Link>
            <Link href="#sk" className="text-slate-600 text-sm hover:text-sky-500 transition-colors">
              S&amp;K
            </Link>
            <Link href="#cara-pesan" className="text-slate-600 text-sm hover:text-sky-500 transition-colors">
              Cara Pesan
            </Link>
          </div>

          <Link
            href="#booking"
            className="bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-full font-bold text-sm scale-95 active:scale-90 transition-transform shadow-lg shadow-secondary/20 w-auto"
          >
            <BsFillLightningChargeFill className="w-5 h-5 inline-block" /> Sewa
          </Link>

          {/* Mobile menu button */}
          {/* <div className="md:hidden">
            <button
              aria-label="Toggle menu"
              className="p-2 rounded-md bg-surface-container-low"
              onClick={() => setOpen((s) => !s)}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div> */}
        </div>
      </Container>

      {/* Mobile menu */}
      {/* {open && (
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
      )} */}
    </nav>
  );
}
