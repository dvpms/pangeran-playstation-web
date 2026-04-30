'use client';

import { MdDownload, MdLibraryBooks, MdSportsEsports, MdVerifiedUser, MdElectricBolt } from 'react-icons/md';
import { useBookings } from '@/hooks/useBookings';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

export default function DashboardPage() {
  const { data: bookings = [] } = useBookings();

  const activeCount = bookings.filter((b) => b.status === 'ACTIVE').length;
  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;

  return (
    <>
      <PageHeader
        title="Pangeran Dashboard"
        subtitle="Welcome back, here's what's happening today."
        actionButton={{
          icon: <MdDownload size={20} />,
          label: 'Export Report',
          onClick: () => console.log('Export Report'),
        }}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard
          title="Total Bookings"
          value={bookings.length.toLocaleString()}
          icon={<MdLibraryBooks />}
          subtitle={{ text: 'All time' }}
        />

        <StatCard
          title="Active Rentals"
          value={activeCount.toLocaleString()}
          icon={<MdSportsEsports />}
          subtitle={{ icon: <MdElectricBolt size={16} />, text: 'Consoles Available' }}
        />

        <StatCard
          title="Pending Verifications"
          value={pendingCount.toLocaleString()}
          icon={<MdVerifiedUser />}
          variant="primary"
          subtitle={{ text: 'Requires action' }}
        />
      </div>
    </>
  );
}
