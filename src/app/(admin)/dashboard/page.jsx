'use client';

import { MdDownload, MdLibraryBooks, MdSportsEsports, MdPayments, MdVerifiedUser, MdTrendingUp, MdElectricBolt } from 'react-icons/md';
import { useState, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import { getAllBookings } from '@/services/booking';

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log('DashboardPage bookings:', bookings);

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
        title="Pangeran Dashboard"
        subtitle="Welcome back, here's what's happening today."
        actionButton={{
          icon: <MdDownload size={20} />,
          label: 'Export Report',
          onClick: () => console.log('Export Report'),
        }}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value={bookings.length.toLocaleString()}
          icon={<MdLibraryBooks />}
          subtitle={{
            text: 'All time',
          }}
        />

        <StatCard
          title="Active Rentals"
          value={bookings.filter(b => b.status === 'ACTIVE').length.toLocaleString()}
          icon={<MdSportsEsports />}
          subtitle={{
            icon: <MdElectricBolt size={16} />,
            text: 'Consoles Available',
          }}
        />


        <StatCard
          title="Pending Verifications"
          value={bookings.filter(b => b.status === 'PENDING').length.toLocaleString()}
          icon={<MdVerifiedUser />}
          variant="primary"
          subtitle={{
            text: 'Requires action',
          }}
         
        />
      </div>

    </>
  );
}
