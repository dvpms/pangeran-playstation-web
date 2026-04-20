'use client';

import { useState, useEffect } from 'react';
import { getAllBookings } from '@/services/booking';
import { MdAddCircle, MdFilterList } from 'react-icons/md';
import PageHeader from '../components/PageHeader';
import BookingTable from '../components/BookingTable';

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

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

    // Map database status to UI status
    const mapStatus = (dbStatus) => {
        const statusMap = {
            PENDING: "pending",
            WAITING_PAYMENT: "pending",
            CONFIRMED: "on-delivery",
            ACTIVE: "active",
            COMPLETED: "completed",
            CANCELLED: "cancelled",
        };
        return statusMap[dbStatus] || "pending";
    };

    // Filter bookings based on status and search
    const filteredBookings = bookings.filter((booking) => {
        // Status filter
        const bookingStatus = mapStatus(booking.status);
        const statusMatch = statusFilter === 'all' || bookingStatus === statusFilter;

        // Search filter - search by customer name or phone number
        const searchLower = searchQuery.toLowerCase();
        const searchMatch = 
            booking.customerName.toLowerCase().includes(searchLower) ||
            booking.whatsappNumber.includes(searchQuery);

        return statusMatch && searchMatch;
    });

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Bookings Management"
        subtitle="Manage all customer rental bookings and their status."
      />

      {/* Filter Section */}
      <div className="flex gap-4 items-center">
        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Filter by Status
          </label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">All Bookings</option>
            <option value="pending">Pending</option>
            <option value="on-delivery">On Delivery</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex-1 max-w-xs">
          <label className="block text-sm font-medium text-on-surface-variant mb-2">
            Search Customer
          </label>
          <input
            type="text"
            placeholder="Enter name or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Results counter */}
        <div className="text-sm text-on-surface-variant pt-6">
        {isLoading ? (
          <span>Loading...</span>
        ) : (
          <span>{filteredBookings.length} results</span>
        )}
      </div>
      </div>

      {/* Loading, Empty, or Table State */}
      {isLoading ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
          <p className="text-on-surface-variant">Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl p-8 text-center">
          <p className="text-on-surface-variant">No bookings found</p>
        </div>
      ) : (
        <BookingTable bookings={filteredBookings} />
      )}
    </>
  );
}
