import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';

export default function AdminLayout({ children }) {
  return (
    <div className="bg-surface text-on-surface min-h-screen font-body flex">
      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 md:ml-72 flex flex-col">
        {/* Top Navigation */}
        <TopBar />

        {/* Main Content */}
        <main className="flex-1 pt-28 px-8 pb-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
