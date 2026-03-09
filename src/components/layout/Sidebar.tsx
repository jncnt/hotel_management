import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    Hotel, Calendar, Users, CreditCard, UserCog,
    LayoutDashboard, ChevronLeft, ChevronRight, Bell, Search
} from 'lucide-react';

const navItems = [
    { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/rooms', icon: Hotel, label: 'Rooms' },
    { to: '/reservations', icon: Calendar, label: 'Reservations' },
    { to: '/guests', icon: Users, label: 'Guests' },
    { to: '/billing', icon: CreditCard, label: 'Billing' },
    { to: '/staff', icon: UserCog, label: 'Staff' },
];

export const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside className={`${collapsed ? 'w-[72px]' : 'w-64'} flex-shrink-0 h-screen sticky top-0 flex flex-col bg-white/80 backdrop-blur-xl border-r border-gray-200/60 transition-all duration-300 z-30`}>
            {/* Logo */}
            <div className={`flex items-center gap-3 px-4 py-5 ${collapsed ? 'justify-center' : ''}`}>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-300/30">
                    <Hotel size={20} className="text-white" />
                </div>
                {!collapsed && (
                    <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight tracking-tight">LuxeStay</p>
                        <p className="text-[10px] text-gray-400 font-medium tracking-wider uppercase">Hotel Management</p>
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Navigation */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto scrollbar-hide">
                {navItems.map(({ to, icon: Icon, label }) => {
                    const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
                    return (
                        <NavLink
                            key={to}
                            to={to}
                            className={isActive ? 'nav-item-active' : 'nav-item-inactive'}
                            title={collapsed ? label : undefined}
                        >
                            <Icon size={18} className="flex-shrink-0" />
                            {!collapsed && <span>{label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Collapse Toggle */}
            <div className="mx-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="p-3">
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl text-gray-400 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200 text-xs font-medium cursor-pointer"
                >
                    {collapsed ? <ChevronRight size={16} /> : <><ChevronLeft size={16} /><span>Collapse</span></>}
                </button>
            </div>
        </aside>
    );
};

interface TopBarProps {
    title: string;
    subtitle?: string;
}

export const TopBar: React.FC<TopBarProps> = ({ title, subtitle }) => {
    return (
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3.5 bg-white/70 backdrop-blur-xl border-b border-gray-200/50">
            <div>
                <h1 className="text-lg font-bold text-gray-900 leading-tight tracking-tight">{title}</h1>
                {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
            </div>
            <div className="flex items-center gap-2">
                {/* Search */}
                <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                    <Search size={18} />
                </button>
                {/* Notification Bell */}
                <button className="relative p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white" />
                </button>
                {/* Separator */}
                <div className="w-px h-8 bg-gray-200 mx-1" />
                {/* Avatar */}
                <div className="flex items-center gap-2.5 pl-1 cursor-pointer group">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-sm ring-2 ring-orange-200/50 group-hover:ring-orange-300/60 transition-all">
                        <span className="text-xs font-bold text-white">A</span>
                    </div>
                    <div className="hidden sm:block">
                        <p className="text-xs font-semibold text-gray-800 leading-tight">Admin</p>
                        <p className="text-[10px] text-gray-400">Administrator</p>
                    </div>
                </div>
            </div>
        </header>
    );
};
