import React from 'react';
import { Plus, Search } from 'lucide-react';
import { mockStaff } from '../data/mockData';

export const Staff: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Staff Management</h2>
                <button className="btn-primary">
                    <Plus size={18} />
                    <span>Add Staff</span>
                </button>
            </div>

            <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search staff..."
                            className="input-field pl-10"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="table-header">Name</th>
                                <th className="table-header">Role</th>
                                <th className="table-header">Department</th>
                                <th className="table-header">Contact</th>
                                <th className="table-header">Status</th>
                                <th className="table-header text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockStaff.map(staff => (
                                <tr key={staff.id} className="table-row">
                                    <td className="table-cell font-bold text-gray-900">{staff.full_name}</td>
                                    <td className="table-cell">{staff.role}</td>
                                    <td className="table-cell text-gray-600">{staff.department}</td>
                                    <td className="table-cell">{staff.phone}</td>
                                    <td className="table-cell">
                                        <span className={`badge ${staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {staff.status}
                                        </span>
                                    </td>
                                    <td className="table-cell text-right">
                                        <button className="text-orange-500 hover:text-orange-700 font-medium text-sm">Manage</button>
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
