'use client';

import { MdAddCircle, MdFilterList } from 'react-icons/md';
import PageHeader from '../components/PageHeader';
import BookingTable from '../components/BookingTable';

export default function BookingsPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Bookings Management"
        subtitle="Manage all customer rental bookings and their status."
        actionButton={{
          icon: <MdAddCircle className='w-5 h-5'/>,
          label: 'Create Booking',
          onClick: () => console.log('Create booking'),
        }}
      />

      {/* Filter Section */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Filter by Status
          </label>
          <select className="w-full px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent">
            <option>All Bookings</option>
            <option>Pending</option>
            <option>On Delivery</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
        </div>

        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Search Customer
          </label>
          <input
            type="text"
            placeholder="Enter name or phone..."
            className="w-full px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Bookings Table */}
      <BookingTable />
    </>
  );
}
