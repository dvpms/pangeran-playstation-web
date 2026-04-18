'use client';

import { MdDownload, MdLibraryBooks, MdSportsEsports, MdPayments, MdVerifiedUser, MdTrendingUp, MdElectricBolt } from 'react-icons/md';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';
import BookingTable from '../components/BookingTable';
import { TbTrendingUp } from 'react-icons/tb';

export default function DashboardPage() {
  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Pangeran Dashboard"
        subtitle="Welcome back, here's what's happening today."
        actionButton={{
          icon: <MdDownload className='w-5 h-5' />,
          label: 'Export Report',
          onClick: () => console.log('Export Report'),
        }}
      />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Bookings"
          value="1,248"
          icon={MdLibraryBooks}
          subtitle={{
            icon: <TbTrendingUp/>,
            text: '+12.5% from last month',
          }}
        />

        <StatCard
          title="Active Rentals"
          value="342"
          icon={MdSportsEsports}
          subtitle={{
            icon: <MdElectricBolt />,
            text: '45 Consoles Available',
          }}
        />

        <StatCard
          title="Total Revenue"
          value="Rp 45.2M"
          icon={MdPayments}
          subtitle={{
            icon: <MdTrendingUp />,
            text: '+8.2% from last month',
          }}
        />

        <StatCard
          title="Pending Verifications"
          value="18"
          icon={MdVerifiedUser}
          variant="primary"
          subtitle={{
            text: 'Requires immediate action',
          }}
          actionButton={{
            label: 'Review',
            onClick: () => console.log('Review pending'),
          }}
        />
      </div>

      {/* Recent Bookings Table */}
      <BookingTable />
    </>
  );
}
