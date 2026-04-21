'use client';

import { MdMail, MdPhone, MdChat, MdDescription, MdSend, MdExpandMore } from 'react-icons/md';
import PageHeader from '../components/PageHeader';

export default function SupportPage() {
  const faqs = [
    {
      id: 1,
      question: 'How do I manage bookings?',
      answer:
        'You can view all bookings in the Bookings section. Click on any booking to view details, update status, or manage payment information.',
    },
    {
      id: 2,
      question: 'How can I track inventory?',
      answer:
        'The Inventory section shows all units with their current status. You can filter by unit type and maintenance status.',
    },
    {
      id: 3,
      question: 'How do I generate financial reports?',
      answer:
        'Visit the Finance section and click "Export Report" to download comprehensive financial statements and transaction history.',
    },
    {
      id: 4,
      question: 'How can I manage customer information?',
      answer:
        'The Customers section displays all customer profiles. Search or filter by location, rental history, and status.',
    },
    {
      id: 5,
      question: 'How do I add new inventory?',
      answer:
        'Go to Inventory → Add New Unit and fill in the unit details, serial code, and condition information.',
    },
    {
      id: 6,
      question: 'How can I contact technical support?',
      answer:
        'Use the contact form below or email support@pangeranps.com with your issue details and account information.',
    },
  ];

  const supportChannels = [
    {
      icon: 'mail',
      title: 'Email Support',
      description: 'support@pangeranps.com',
      response: 'Response time: 24 hours',
    },
    {
      icon: 'phone',
      title: 'Phone Support',
      description: '+62-812-3456-7890',
      response: 'Available: Mon-Fri, 9am-6pm',
    },
    {
      icon: 'chat',
      title: 'Live Chat',
      description: 'Chat with our team',
      response: 'Available during business hours',
    },
    {
      icon: 'description',
      title: 'Documentation',
      description: 'View knowledge base',
      response: 'Available 24/7',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Support & Help"
        subtitle="Get help with your admin dashboard and manage your account."
      />

      {/* Support Channels */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {supportChannels.map((channel) => (
          <div
            key={channel.title}
            className="bg-surface-container-lowest rounded-xl p-4 md:p-6 border border-surface-container-high hover:border-primary/50 transition-colors">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              {channel.icon === 'mail' && <MdMail size={20} className="md:w-6 md:h-6 text-primary" />}
              {channel.icon === 'phone' && <MdPhone size={20} className="md:w-6 md:h-6 text-primary" />}
              {channel.icon === 'chat' && <MdChat size={20} className="md:w-6 md:h-6 text-primary" />}
              {channel.icon === 'description' && <MdDescription size={20} className="md:w-6 md:h-6 text-primary" />}
            </div>
            <h3 className="font-bold text-sm md:text-base text-on-surface mb-1.5 md:mb-2">{channel.title}</h3>
            <p className="text-xs md:text-sm text-on-surface-variant mb-2 md:mb-3">
              {channel.description}
            </p>
            <p className="text-xs text-primary font-medium">
              {channel.response}
            </p>
          </div>
        ))}
      </div>

      {/* Contact Form */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8">
        <h2 className="text-lg md:text-headline-md font-bold text-on-surface mb-4 md:mb-6">
          Send us a Message
        </h2>

        <form className="space-y-3 md:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help?"
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Describe your issue or question..."
              className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 pt-3 md:pt-4">
            <button
              type="button"
              className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-xs md:text-base text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-xs md:text-base text-on-primary bg-primary hover:opacity-90 transition-opacity shadow-[0_12px_24px_-6px_rgba(0,102,138,0.2)] flex items-center justify-center gap-1.5 md:gap-2"
            >
              <MdSend size={16} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Send Message</span>
              <span className="sm:hidden">Send</span>
            </button>
          </div>
        </form>
      </div>

      {/* FAQs */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8">
        <h2 className="text-lg md:text-headline-md font-bold text-on-surface mb-4 md:mb-6">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2 md:space-y-4">
          {faqs.map((faq, index) => (
            <details
              key={faq.id}
              className="group border border-surface-container-high rounded-lg p-3 md:p-4 open:bg-primary-fixed/10 cursor-pointer"
            >
              <summary className="flex items-start justify-between font-medium text-xs md:text-base text-on-surface cursor-pointer gap-2">
                <span className="text-left">{faq.question}</span>
                <MdExpandMore size={18} className="md:w-6 md:h-6 transition-transform flex-shrink-0 group-open:rotate-180" />
              </summary>
              <p className="mt-2.5 md:mt-4 text-xs md:text-sm text-on-surface-variant">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
