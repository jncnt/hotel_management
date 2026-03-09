import React from 'react';
import { Plus, Search } from 'lucide-react';
import { mockGuests } from '../data/mockData';

export const Guests: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Guest Directory</h2>
                <button className="btn-primary">
                    <Plus size={18} />
                    <span>Add Guest</span>
                </button>
            </div>

            <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search guests by name or email..."
                            className="input-field pl-10"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="table-header">Name</th>
                                <th className="table-header">Email</th>
                                <th className="table-header">Phone</th>
                                <th className="table-header">Nationality</th>
                                <th className="table-header">ID/Passport</th>
                                <th className="table-header">Loyalty Pts</th>
                                <th className="table-header text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockGuests.map(guest => (
                                <tr key={guest.id} className="table-row">
                                    <td className="table-cell font-bold text-gray-900">{guest.full_name}</td>
                                    <td className="table-cell">{guest.email}</td>
                                    <td className="table-cell">{guest.phone}</td>
                                    <td className="table-cell text-gray-600">{guest.nationality}</td>
                                    <td className="table-cell font-mono text-xs">{guest.id_number}</td>
                                    <td className="table-cell text-orange-600 font-semibold">{guest.loyalty_points.toLocaleString()}</td>
                                    <td className="table-cell text-right">
                                        <button className="text-orange-500 hover:text-orange-700 font-medium text-sm">Profile</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
