import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { RemindersBell } from './RemindersBell';

export function AppLayout() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <header className="flex shrink-0 items-center justify-end border-b border-slate-200 bg-white px-8 py-3">
          <RemindersBell />
        </header>
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-6xl px-8 py-8">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
