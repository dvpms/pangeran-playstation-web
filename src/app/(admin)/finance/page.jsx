'use client';

import { MdFilterList, MdTrendingUp, MdCalendarMonth, MdPendingActions, MdPayments } from 'react-icons/md';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

export default function FinancePage() {
  const transactions = [
    {
      id: 1,
      date: 'Apr 15, 2026',
      customer: 'Ahmad Fauzi',
      amount: 'Rp 1.2M',
      type: 'Rental Payment',
      status: 'Completed',
    },
    {
      id: 2,
      date: 'Apr 14, 2026',
      customer: 'Budi Santoso',
      amount: 'Rp 2.8M',
      type: 'Rental Payment',
      status: 'Completed',
    },
    {
      id: 3,
      date: 'Apr 13, 2026',
      customer: 'Citra Dewi',
      amount: 'Rp 850K',
      type: 'Rental Payment',
      status: 'Pending',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Finance & Revenue"
        subtitle="Monitor financial performance and transaction history."
        actionButton={{
          icon: 'download',
          label: 'Export Report',
          onClick: () => console.log('Export finance report'),
        }}
      />

      {/* Financial Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="Rp 125.4M"
          icon={MdTrendingUp}
          subtitle={{
            text: 'All time',
          }}
        />

        <StatCard
          title="This Month"
          value="Rp 28.7M"
          icon={MdCalendarMonth}
          subtitle={{
            icon: <MdTrendingUp className='w-5 h-5' />,
            text: '+15% growth',
          }}
        />

        <StatCard
          title="Pending Payments"
          value="Rp 4.2M"
          icon={MdPendingActions}
          subtitle={{
            text: '8 transactions',
          }}
        />

        <StatCard
          title="Average Transaction"
          value="Rp 1.8M"
          icon={MdPayments}
          subtitle={{
            text: 'Per booking',
          }}
        />
      </div>

      {/* Transaction History */}
      <div className="bg-surface-container-lowest rounded-xl p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-lg font-bold text-on-surface">
            Recent Transactions
          </h2>
          <div className="flex gap-3">
            <select className="px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm">
              <option>All Transactions</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Refunded</option>
            </select>
            <button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2">
              <MdFilterList size={18} />
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-surface-container-low text-on-surface-variant font-semibold text-sm">
                <th className="py-4 px-4 font-medium">Date</th>
                <th className="py-4 px-4 font-medium">Customer</th>
                <th className="py-4 px-4 font-medium">Type</th>
                <th className="py-4 px-4 font-medium">Amount</th>
                <th className="py-4 px-4 font-medium">Status</th>
                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50"
                >
                  <td className="py-4 px-4 text-on-surface-variant">
                    {transaction.date}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-on-surface">
                      {transaction.customer}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">
                    {transaction.type}
                  </td>
                  <td className="py-4 px-4 font-semibold text-on-surface">
                    {transaction.amount}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        transaction.status === 'Completed'
                          ? 'bg-primary-container/20 text-primary'
                          : 'bg-secondary-container text-on-secondary-container'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button className="text-primary hover:text-primary-container p-2 rounded-lg hover:bg-surface-container transition-colors">
                      <span>⋮</span>
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
