'use client';

import { useState, useEffect } from 'react';
import { getAllBookings } from '@/services/booking';
import PageHeader from '../components/PageHeader';
import BookingTable from '../components/BookingTable';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try { 
                const data = await getAllBookings();
                setBookings(data || []);
            } catch (error) {
                console.error('Failed to fetch bookings:', error);
                setBookings([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBookings();
    }, []);

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Bookings Management"
        subtitle="Manage all customer rental bookings and their status."
      />

      {/* Loading or Table State */}
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
