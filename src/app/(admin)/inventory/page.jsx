'use client';

import { MdFilterList, MdCheckCircle, MdBuild, MdInventory2, MdSportsEsports, MdAddCircle } from 'react-icons/md';
import PageHeader from '../components/PageHeader';
import StatCard from '../components/StatCard';

export default function InventoryPage() {
  const inventory = [
    {
      id: 1,
      name: 'PS5 Pro',
      quantity: 12,
      available: 8,
      condition: 'Excellent',
      lastMaintenance: '2 weeks ago',
    },
    {
      id: 2,
      name: 'PS5 Standard',
      quantity: 15,
      available: 6,
      condition: 'Good',
      lastMaintenance: '1 week ago',
    },
    {
      id: 3,
      name: 'PS4 Slim',
      quantity: 18,
      available: 12,
      condition: 'Good',
      lastMaintenance: '3 weeks ago',
    },
  ];

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Inventory Management"
        subtitle="Track all gaming consoles and equipment inventory status."
        actionButton={{
          icon: <MdAddCircle className='w-5 h-5'/>,
          label: 'Add New Unit',
          onClick: () => console.log('Add unit'),
        }}
      />

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Units"
          value="45"
          icon={MdSportsEsports}
          subtitle={{
            text: 'All inventory',
          }}
        />

        <StatCard
          title="Available Now"
          value="26"
          icon={MdInventory2}
          subtitle={{
            icon: <MdCheckCircle className='text-primary'/>,
            text: '58% available',
          }}
        />

        <StatCard
          title="Under Maintenance"
          value="4"
          icon={MdBuild}
          subtitle={{
            text: 'Estimated 3 days',
          }}
        />
      </div>

      {/* Inventory Table */}
      <div className="bg-surface-container-lowest rounded-xl p-8 overflow-hidden">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-headline-lg font-bold text-on-surface">
            Equipment Status
          </h2>
          <div className="flex gap-3">
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
                <th className="py-4 px-4 font-medium">Unit Name</th>
                <th className="py-4 px-4 font-medium">Total Quantity</th>
                <th className="py-4 px-4 font-medium">Available</th>
                <th className="py-4 px-4 font-medium">Condition</th>
                <th className="py-4 px-4 font-medium">Last Maintenance</th>
                <th className="py-4 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {inventory.map((item) => (
                <tr
                  key={item.id}
                  className="group hover:bg-surface-container-low/50 transition-colors border-b border-surface-container-low/50"
                >
                  <td className="py-4 px-4">
                    <span className="font-semibold text-on-surface">
                      {item.name}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">
                    {item.quantity}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-primary-container/20 text-primary">
                      {item.available}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">
                    {item.condition}
                  </td>
                  <td className="py-4 px-4 text-on-surface-variant">
                    {item.lastMaintenance}
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
