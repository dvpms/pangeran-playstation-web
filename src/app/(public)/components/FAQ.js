'use client';

import { useState } from 'react';
import Container from "@/components/ui/Container";
import { ScrollReveal, StaggerContainer } from "@/components/animations";
import { MdKeyboardArrowDown } from 'react-icons/md';

export const faqData = [
  {
    question: "Bagaimana cara pesan / booking rental PS?",
    answer: "Anda cukup memilih unit dari katalog di web. Tim Admin kami akan segera menghubungi Anda melalui WhatsApp untuk konfirmasi identitas dan pembayaran, lalu unit akan langsung diantar oleh kurir ke rumah Anda."
  },
  {
    question: "Apakah ada biaya ongkos kirim?",
    answer: "Kami memberikan layanan Gratis Ongkir untuk jarak pengiriman hingga 7 kilometer pertama dari Base Station kami. Untuk jarak selebihnya, akan ada penyesuaian tarif tambahan per kilometer."
  },
  {
    question: "Kapan saja jam operasional pengiriman?",
    answer: "Pengiriman unit dilakukan setiap hari pada jam operasional toko, yaitu mulai pukul 09:00 hingga 22:00 WIB."
  },
  {
    question: "Apa syarat jaminan untuk menyewa?",
    answer: "Penyewa diwajibkan untuk menitipkan identitas asli berupa KTP (Kartu Tanda Penduduk) atau SIM yang masih berlaku selama masa sewa sebagai jaminan. Pastikan identitas penerima juga cocok saat kurir datang."
  },
  {
    question: "Bagaimana jika terjadi kerusakan atau keterlambatan?",
    answer: "Penyewa bertanggung jawab penuh atas segala kerusakan unit fisik selama masa sewa. Denda keterlambatan juga akan dikenakan sebesar biaya sewa harian jika pengembalian unit melebihi batas toleransi waktu 1 jam."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-surface-container-lowest" id="faq">
      <Container>
        <div className="max-w-3xl mx-auto flex flex-col gap-10">
          <ScrollReveal animation="fadeInUp" duration={0.6} className="text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-surface-on mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-surface-on-variant text-lg">
              Temukan jawaban untuk pertanyaan yang paling sering ditanyakan seputar rental Pangeran Playstation.
            </p>
          </ScrollReveal>

          <StaggerContainer staggerDelay={0.1} duration={0.5} className="flex flex-col gap-4">
            {faqData.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div 
                  key={index} 
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-primary/50 bg-primary-container/10' : 'border-surface-variant/30 bg-surface'}`}
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none"
                  >
                    <span className="font-bold text-surface-on md:text-lg pr-4">{faq.question}</span>
                    <MdKeyboardArrowDown 
                      className={`text-2xl text-primary transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-surface-on-variant leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
