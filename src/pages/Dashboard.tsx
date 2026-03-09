import React from 'react';
import { Home, CalendarCheck, Users, Banknote, ArrowUpRight, Clock, BedDouble } from 'lucide-react';
import { mockRooms, mockReservations, mockGuests, mockInvoices } from '../data/mockData';

export const Dashboard: React.FC = () => {
    const availableRooms = mockRooms.filter(r => r.status === 'Available').length;
    const activeReservations = mockReservations.filter(r => r.status === 'Checked-In').length;
    const totalGuests = mockGuests.length;
    const totalRevenue = mockInvoices.reduce((sum, inv) => sum + inv.total, 0);
    const pendingReservations = mockReservations.filter(r => r.status === 'Pending').length;
    const occupancyRate = Math.round(
        (mockRooms.filter(r => r.status === 'Occupied').length / mockRooms.length) * 100
    );

    const statCards = [
        {
            label: 'Available Rooms',
            value: `${availableRooms} / ${mockRooms.length}`,
            icon: Home,
            change: '+2 today',
            color: 'from-orange-400 to-amber-500',
            bgLight: 'bg-orange-50',
        },
        {
            label: 'Active Check-ins',
            value: activeReservations.toString(),
            icon: CalendarCheck,
            change: `${pendingReservations} pending`,
            color: 'from-emerald-400 to-teal-500',
            bgLight: 'bg-emerald-50',
        },
        {
            label: 'Total Guests',
            value: totalGuests.toString(),
            icon: Users,
            change: 'All time',
            color: 'from-violet-400 to-purple-500',
            bgLight: 'bg-violet-50',
        },
        {
            label: 'Total Revenue',
            value: `₱${totalRevenue.toLocaleString()}`,
            icon: Banknote,
            change: '+12.5%',
            color: 'from-sky-400 to-blue-500',
            bgLight: 'bg-sky-50',
        },
    ];

    const statusColors: Record<string, string> = {
        'Available': 'bg-emerald-500',
        'Occupied': 'bg-orange-500',
        'Maintenance': 'bg-rose-500',
        'Reserved': 'bg-sky-500',
    };

    const statusBg: Record<string, string> = {
        'Checked-In': 'bg-emerald-100 text-emerald-700',
        'Confirmed': 'bg-sky-100 text-sky-700',
        'Checked-Out': 'bg-gray-100 text-gray-600',
        'Pending': 'bg-amber-100 text-amber-700',
        'Cancelled': 'bg-red-100 text-red-700',
    };

    return (
        <div className="space-y-6 animate-fade-in-up">
            {/* Quick Stats Row */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {occupancyRate}% Occupancy
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-semibold">
                    <Clock size={12} />
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </div>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((card, i) => (
                    <div
                        key={card.label}
                        className="stat-card group"
                        style={{ animationDelay: `${i * 80}ms` }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-1">
                                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">{card.label}</p>
                                <p className="text-2xl font-bold text-gray-900 tracking-tight animate-count-up"
                                    style={{ animationDelay: `${i * 100 + 200}ms` }}>
                                    {card.value}
                                </p>
                            </div>
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${card.color} shadow-lg shadow-orange-200/30 group-hover:shadow-orange-300/40 transition-shadow`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                            <ArrowUpRight size={14} className="text-emerald-500" />
                            <span className="text-xs font-medium text-gray-500">{card.change}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent Reservations — wider */}
                <div className="lg:col-span-3 glass-card overflow-hidden">
                    <div className="flex items-center justify-between p-5 pb-0">
                        <div>
                            <h3 className="section-header">Recent Reservations</h3>
                            <p className="text-xs text-gray-400 mt-0.5">Latest guest bookings</p>
                        </div>
                        <button className="text-xs font-semibold text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1">
                            View All <ArrowUpRight size={12} />
                        </button>
                    </div>
                    <div className="overflow-x-auto p-5 pt-4">
                        <table className="w-full text-left">
                            <thead>
                                <tr>
                                    <th className="table-header rounded-tl-lg">Guest</th>
                                    <th className="table-header">Room</th>
                                    <th className="table-header">Check-in</th>
                                    <th className="table-header rounded-tr-lg">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mockReservations.slice(0, 5).map((res, i) => (
                                    <tr key={res.id} className="table-row animate-fade-in-up" style={{ animationDelay: `${i * 60}ms` }}>
                                        <td className="table-cell">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-xs font-bold text-white">
                                                        {res.guest?.full_name.split(' ').map(n => n[0]).join('')}
                                                    </span>
                                                </div>
                                                <span className="font-semibold text-gray-900 text-sm">{res.guest?.full_name}</span>
                                            </div>
                                        </td>
                                        <td className="table-cell">
                                            <div className="flex items-center gap-1.5">
                                                <BedDouble size={14} className="text-gray-400" />
                                                <span className="font-medium text-gray-700">{res.room?.room_number}</span>
                                            </div>
                                        </td>
                                        <td className="table-cell text-gray-500 text-sm">{res.check_in}</td>
                                        <td className="table-cell">
                                            <span className={`badge ${statusBg[res.status] || 'bg-gray-100 text-gray-700'}`}>
                                                {res.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Room Status — narrower sidebar card */}
                <div className="lg:col-span-2 glass-card overflow-hidden">
                    <div className="p-5 pb-0">
                        <h3 className="section-header">Room Status</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{mockRooms.length} rooms total</p>
                    </div>
                    <div className="p-5 space-y-5">
                        {/* Visual occupancy donut summary */}
                        <div className="flex items-center justify-center py-3">
                            <div className="relative w-28 h-28">
                                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                                    <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f3f4f6" strokeWidth="3" />
                                    <circle
                                        cx="18" cy="18" r="15.915" fill="none"
                                        stroke="url(#occupancyGradient)" strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeDasharray={`${occupancyRate}, 100`}
                                        className="transition-all duration-1000 ease-out"
                                    />
                                    <defs>
                                        <linearGradient id="occupancyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#fb923c" />
                                            <stop offset="100%" stopColor="#f97316" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-900">{occupancyRate}%</span>
                                    <span className="text-[10px] text-gray-400 font-medium">Occupied</span>
                                </div>
                            </div>
                        </div>

                        {/* Status breakdown */}
                        {['Available', 'Occupied', 'Reserved', 'Maintenance'].map((status) => {
                            const count = mockRooms.filter(r => r.status === status).length;
                            const percentage = Math.round((count / mockRooms.length) * 100) || 0;
                            return (
                                <div key={status} className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2.5 h-2.5 rounded-full ${statusColors[status]}`} />
                                            <span className="font-medium text-gray-700">{status}</span>
                                        </div>
                                        <span className="text-gray-500 text-xs font-semibold tabular-nums">{count} ({percentage}%)</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${statusColors[status]} progress-bar-fill`}
                                            style={{ '--progress-width': `${percentage}%`, width: `${percentage}%` } as React.CSSProperties}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-card p-5">
                <h3 className="section-header mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                        { label: 'New Booking', icon: CalendarCheck, color: 'from-orange-400 to-amber-500' },
                        { label: 'Walk-in Guest', icon: Users, color: 'from-emerald-400 to-teal-500' },
                        { label: 'Check-out', icon: Home, color: 'from-violet-400 to-purple-500' },
                        { label: 'Create Invoice', icon: Banknote, color: 'from-sky-400 to-blue-500' },
                    ].map((action) => (
                        <button
                            key={action.label}
                            className="flex flex-col items-center gap-2.5 p-4 rounded-xl border border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/50 transition-all duration-200 group cursor-pointer"
                        >
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${action.color} shadow-sm group-hover:shadow-md transition-shadow`}>
                                <action.icon size={18} className="text-white" />
                            </div>
                            <span className="text-xs font-semibold text-gray-600 group-hover:text-orange-600 transition-colors">{action.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
