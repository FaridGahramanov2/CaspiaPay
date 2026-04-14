import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DocsHeader from './DocsHeader';
import DocsSidebar from './DocsSidebar';

export default function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DocsHeader onMenuClick={() => setSidebarOpen(true)} />
      <div className="flex">
        <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
