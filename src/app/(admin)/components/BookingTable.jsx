'use client';

import { MdFilterList, MdMoreVert } from 'react-icons/md';

export default function BookingTable({ bookings = [] }) {
  const getStatusBadgeColor = (status) => {
    const statusConfig = {
      pending: 'bg-secondary-container text-on-secondary-container',
      'on-delivery':
        'bg-primary-container/20 text-primary',
      completed:
        'bg-surface-container-highest text-on-surface-variant',
      active:
        'bg-primary-container/20 text-primary',
      cancelled:
        'bg-error/20 text-error',
    };
    return statusConfig[status] || statusConfig.pending;
  };

  const sampleData = [
    {
      id: 1,
      customer: { name: 'Ahmad Fauzi', avatar: 'A' },
      unit: 'PS5 Pro',
      duration: '2 Days',
      area: 'Jakarta Selatan',
      status: 'pending',
      statusLabel: 'Pending',
    },
    {
      id: 2,
      customer: { name: 'Budi Santoso', avatar: 'B' },
      unit: 'PS4 Slim',
      duration: '1 Week',
      area: 'Bandung',
      status: 'on-delivery',
      statusLabel: 'On Delivery',
    },
    {
      id: 3,
      customer: { name: 'Citra Dewi', avatar: 'C' },
      unit: 'PS5 Standard',
      duration: '3 Days',
      area: 'Surabaya',
      status: 'completed',
      statusLabel: 'Completed',
    },
  ];

  const displayData = bookings.length > 0 ? bookings : sampleData;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-headline-lg font-bold text-on-surface">
          Recent Bookings
        </h2>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-surface-container text-on-surface font-medium text-sm hover:bg-surface-container-high transition-colors flex items-center gap-2">
            <MdFilterList size={18} />
            Filter
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-fixed text-on-primary-fixed-variant font-medium text-sm hover:opacity-90 transition-colors">
            View All
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-surface-container-low text-on-surface-variant font-semibold text-sm">
              <th className="py-4 px-4 font-medium">Customer</th>
              <th className="py-4 px-4 font-medium">Unit</th>
              <th className="py-4 px-4 font-medium">Duration</th>
              <th className="py-4 px-4 font-medium">Delivery Area</th>
              <th className="py-4 px-4 font-medium">Status</th>
              <th className="py-4 px-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {displayData.map((booking) => (
              <tr
                key={booking.id}
                className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50"
              >
                {/* Customer */}
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary flex items-center justify-center font-bold">
                      {booking.customer.avatar}
                    </div>
                    <span className="font-semibold text-on-surface">
                      {booking.customer.name}
                    </span>
                  </div>
                </td>

                {/* Unit */}
                <td className="py-4 px-4 text-on-surface-variant font-medium">
                  {booking.unit}
                </td>

                {/* Duration */}
                <td className="py-4 px-4 text-on-surface-variant">
                  {booking.duration}
                </td>

                {/* Area */}
                <td className="py-4 px-4 text-on-surface-variant">
                  {booking.area}
                </td>

                {/* Status */}
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${getStatusBadgeColor(
                      booking.status
                    )}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    {booking.statusLabel}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 px-4 text-right">
                  <button className="text-primary hover:text-primary-container p-2 rounded-lg hover:bg-surface-container transition-colors">
                    <MdMoreVert size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
