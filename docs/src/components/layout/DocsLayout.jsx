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
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Product prototype. Banking connections, certifications and production APIs are not established. See Investor sandbox for implemented local endpoints.</div>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
