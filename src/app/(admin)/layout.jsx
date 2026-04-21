import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import { MenuProvider } from './context/MenuContext';

export default function AdminLayout({ children }) {
  return (
    <MenuProvider>
      <div className="bg-surface text-on-surface min-h-screen font-body flex">
        {/* Sidebar Navigation */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 md:ml-72 flex flex-col">
          {/* Top Navigation */}
          <TopBar />

          {/* Main Content */}
          <main className="flex-1 pt-24 md:pt-28 px-4 md:px-8 pb-12 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-8">{children}</div>
          </main>
        </div>
      </div>
    </MenuProvider>
  );
}
