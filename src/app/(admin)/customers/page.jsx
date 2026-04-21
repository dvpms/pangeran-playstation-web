'use client';

import { MdFilterList, MdGroup, MdPerson, MdSavings, MdTrendingUp } from 'react-icons/md';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

export default function CustomersPage() {
  const customers = [
    {
      id: 1,
      name: 'Ahmad Fauzi',
      email: 'ahmad.fauzi@email.com',
      phone: '+62-812-3456-7890',
      area: 'Jakarta Selatan',
      totalRentals: 5,
      totalSpent: 'Rp 2.5M',
      lastRental: '2 days ago',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Budi Santoso',
      email: 'budi.santoso@email.com',
      phone: '+62-821-9876-5432',
      area: 'Bandung',
      totalRentals: 12,
      totalSpent: 'Rp 6.8M',
      lastRental: '1 week ago',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Citra Dewi',
      email: 'citra.dewi@email.com',
      phone: '+62-856-4321-0987',
      area: 'Surabaya',
      totalRentals: 3,
      totalSpent: 'Rp 1.2M',
      lastRental: '3 weeks ago',
      status: 'Inactive',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Customers Management"
        subtitle="View and manage all customer profiles and rental history."
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Total Customers"
          value="284"
          icon={MdGroup}
          subtitle={{
            icon: <MdTrendingUp className='w-5 h-5' />,
            text: '+18 this month',
          }}
        />

        <StatCard
          title="Active Customers"
          value="156"
          icon={MdPerson}
          subtitle={{
            text: '55% engagement rate',
          }}
        />

        <StatCard
          title="Average Spending"
          value="Rp 850K"
          icon={MdSavings}
          subtitle={{
            text: 'Per customer',
          }}
        />
      </div>

      {/* Customers Table */}
      <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8 overflow-hidden">
        <div className="flex flex-col gap-3 md:gap-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-3 md:gap-6">
            <h2 className="text-lg md:text-headline-lg font-bold text-on-surface">
              Customer List
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <input
              type="text"
              placeholder="Search customers..."
              className="flex-1 px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-xs md:text-sm"
            />
            <button className="px-3 md:px-4 py-2 rounded-lg bg-surface-container text-on-surface font-medium text-xs md:text-sm hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 whitespace-nowrap">
              <MdFilterList size={16} className="md:w-4 md:h-4" />
              <span className="hidden sm:inline">Filter</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-surface-container-low text-on-surface-variant font-semibold text-xs md:text-sm">
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium">Name</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium hidden md:table-cell">Contact</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium hidden lg:table-cell">Area</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium hidden lg:table-cell">Total Rentals</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium hidden lg:table-cell">Total Spent</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium hidden md:table-cell">Last Rental</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium">Status</th>
                <th className="py-2 md:py-4 px-2 md:px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50"
                >
                  <td className="py-2 md:py-4 px-2 md:px-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">
                        {customer.name.charAt(0)}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-xs md:text-sm text-on-surface truncate">
                          {customer.name}
                        </span>
                        <span className="text-xs text-on-surface-variant truncate md:hidden">
                          {customer.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 md:py-4 px-2 md:px-4 hidden md:table-cell">
                    <div className="flex flex-col text-xs md:text-sm text-on-surface-variant">
                      <span className="truncate">{customer.email}</span>
                      <span className="truncate">{customer.phone}</span>
                    </div>
                  </td>
                  <td className="py-2 md:py-4 px-2 md:px-4 text-on-surface-variant hidden lg:table-cell text-xs md:text-sm">
                    {customer.area}
                  </td>
                  <td className="py-2 md:py-4 px-2 md:px-4 text-on-surface font-semibold hidden lg:table-cell text-xs md:text-sm">
                    {customer.totalRentals}
                  </td>
                  <td className="py-2 md:py-4 px-2 md:px-4 text-on-surface font-semibold hidden lg:table-cell text-xs md:text-sm">
                    {customer.totalSpent}
                  </td>
                  <td className="py-2 md:py-4 px-2 md:px-4 text-on-surface-variant hidden md:table-cell text-xs md:text-sm">
                    {customer.lastRental}
                  </td>
                  <td className="py-2 md:py-4 px-2 md:px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs md:text-xs font-bold ${
                        customer.status === 'Active'
                          ? 'bg-primary-container/20 text-primary'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {customer.status}
                    </span>
                  </td>
                    <td className="py-2 md:py-4 px-2 md:px-4 text-right">
                      <button className="text-primary hover:text-primary-container p-1.5 md:p-2 rounded-lg hover:bg-surface-container transition-colors">
                        <span className="text-xs md:text-base">⋮</span>
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
