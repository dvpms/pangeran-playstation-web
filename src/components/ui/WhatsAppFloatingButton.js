import React from "react";
import { MdWhatsapp } from "react-icons/md";

export default function WhatsAppFloatingButton({
  phone = "+6285776172812",
  message = "Halo, saya ingin bertanya.",
}) {
  const phoneDigits = phone.replace(/\D/g, "");
  const href = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed right-4 bottom-4 md:right-8 md:bottom-8 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg flex items-center justify-center p-3 transition-transform transform hover:scale-105"
    >
      <MdWhatsapp className="w-14 h-14" />
    </a>
  );
}
