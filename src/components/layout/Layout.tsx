import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar, TopBar } from './Sidebar';

export const Layout: React.FC = () => {
    const location = useLocation();

    const getPageTitle = (path: string) => {
        if (path === '/') return { title: 'Dashboard', subtitle: 'Overview & Analytics' };
        if (path.startsWith('/rooms')) return { title: 'Rooms Management', subtitle: 'Manage hotel rooms and statuses' };
        if (path.startsWith('/reservations')) return { title: 'Reservations', subtitle: 'Manage guest bookings' };
        if (path.startsWith('/guests')) return { title: 'Guest Directory', subtitle: 'Manage guest profiles and history' };
        if (path.startsWith('/billing')) return { title: 'Billing & Invoices', subtitle: 'Manage payments and invoices' };
        if (path.startsWith('/staff')) return { title: 'Staff Management', subtitle: 'Manage employees and shifts' };
        return { title: 'LuxeStay', subtitle: 'Management System' };
    };

    const { title, subtitle } = getPageTitle(location.pathname);

    return (
        <div className="flex h-screen overflow-hidden font-sans" style={{ background: 'linear-gradient(135deg, #fefcfb 0%, #fdf6ee 50%, #fefcfb 100%)' }}>
            <Sidebar />
            <main className="flex-1 flex flex-col min-w-0 relative">
                {/* Ambient background accents */}
                <div className="absolute top-[-15%] right-[-5%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-orange-200/30 to-amber-200/20 blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[25%] h-[25%] rounded-full bg-gradient-to-tr from-amber-200/20 to-orange-100/20 blur-[80px] pointer-events-none" />

                <TopBar title={title} subtitle={subtitle} />

                <div className="flex-1 overflow-y-auto p-6 z-10 scrollbar-hide">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
