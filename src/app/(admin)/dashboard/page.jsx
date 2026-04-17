// src/app/admin/dashboard/page.jsx
import { getAllBookings } from "@/services/booking";
import AdminTable from "../components/AdminTable";

export default async function AdminDashboard() {
  const bookings = await getAllBookings();

  return (
    <div className="p-8 bg-surface min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-surface-on">
          Manajemen Pesanan
        </h1>
        <p className="text-surface-on/60">
          Verifikasi pembayaran dan kelola status unit fisik.
        </p>
      </header>

      <AdminTable initialData={bookings} />
    </div>
  );
}
