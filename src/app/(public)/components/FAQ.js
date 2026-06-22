'use client';

import { useState } from 'react';
import Container from "@/components/ui/Container";
import { ScrollReveal, StaggerContainer } from "@/components/animations";
import { MdKeyboardArrowDown } from 'react-icons/md';

import { faqData } from "@/lib/faqData";

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
