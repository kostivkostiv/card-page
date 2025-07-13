import { Outlet } from '@tanstack/react-router';
import { Header } from '../Header/Header';


export function RootLayout() {
  return (
    <div className="flex dark:bg-gray-900 min-h-screen flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex-row mx-auto">
        <Outlet />
      </main>
    </div>
  );
}