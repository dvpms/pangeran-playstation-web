'use client';

import { useBookings } from '@/hooks/useBookings';
import PageHeader from '../components/PageHeader';
import BookingTable from '../components/BookingTable';

export default function BookingsPage() {
  const { data: bookings = [], isLoading } = useBookings();

  return (
    <>
      <PageHeader
        title="Bookings Management"
        subtitle="Manage all customer rental bookings and their status."
      />

      {isLoading ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
          <p className="text-on-surface-variant">Loading bookings...</p>
        </div>
      ) : (
        <BookingTable bookings={bookings} />
      )}
    </>
  );
}
