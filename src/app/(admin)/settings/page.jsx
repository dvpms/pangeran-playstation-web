'use client';

import PageHeader from '../components/PageHeader';
import { useState } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Pangeran Playstation',
    email: 'admin@pangeranps.com',
    phone: '+62-812-3456-7890',
    address: 'Jakarta, Indonesia',
    enableNotifications: true,
    enableEmailAlerts: true,
    maintenanceMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSave = () => {
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Settings"
        subtitle="Manage your system and business settings."
      />

      {/* Settings Sections */}
      <div className="space-y-4 md:space-y-6">
        {/* Business Information */}
        <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8">
          <h2 className="text-lg md:text-headline-md font-bold text-on-surface mb-4 md:mb-6">
            Business Information
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              <div>
                <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={settings.phone}
                  onChange={handleChange}
                  className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium text-on-surface-variant mb-1.5 md:mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={settings.address}
                onChange={handleChange}
                rows="3"
                className="w-full px-3 md:px-4 py-2 rounded-lg bg-surface-container border border-surface-container-high focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8">
          <h2 className="text-lg md:text-headline-md font-bold text-on-surface mb-4 md:mb-6">
            Notifications
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base text-on-surface">
                  Enable Notifications
                </p>
                <p className="text-xs md:text-sm text-on-surface-variant">
                  Receive in-app notifications for bookings and updates
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="enableNotifications"
                  checked={settings.enableNotifications}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base text-on-surface">
                  Email Alerts
                </p>
                <p className="text-xs md:text-sm text-on-surface-variant">
                  Send email notifications for important events
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="enableEmailAlerts"
                  checked={settings.enableEmailAlerts}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="bg-surface-container-lowest rounded-xl p-4 md:p-8">
          <h2 className="text-lg md:text-headline-md font-bold text-on-surface mb-4 md:mb-6">
            System
          </h2>

          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm md:text-base text-on-surface">
                  Maintenance Mode
                </p>
                <p className="text-xs md:text-sm text-on-surface-variant">
                  Temporarily disable the system for maintenance
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
          <button className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-xs md:text-base text-on-surface bg-surface-container hover:bg-surface-container-high transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 md:px-6 py-2 md:py-3 rounded-xl font-medium text-xs md:text-base text-on-primary bg-primary hover:opacity-90 transition-opacity shadow-[0_12px_24px_-6px_rgba(0,102,138,0.2)]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
}
