import { Outlet } from 'react-router-dom';
import DocsHeader from './DocsHeader';
import DocsSidebar from './DocsSidebar';

export default function DocsLayout() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <DocsHeader />
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1 p-8 max-w-4xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
