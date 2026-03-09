import React from 'react';
import { Plus, Search } from 'lucide-react';
import { mockInvoices } from '../data/mockData';

export const Billing: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Billing & Invoices</h2>
                <button className="btn-primary">
                    <Plus size={18} />
                    <span>Create Invoice</span>
                </button>
            </div>

            <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search invoices..."
                            className="input-field pl-10"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="table-header">Invoice ID</th>
                                <th className="table-header">Date</th>
                                <th className="table-header">Guest</th>
                                <th className="table-header">Room Res.</th>
                                <th className="table-header">Total Amount</th>
                                <th className="table-header">Status</th>
                                <th className="table-header text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockInvoices.map(inv => (
                                <tr key={inv.id} className="table-row">
                                    <td className="table-cell font-bold text-gray-900">{inv.id.toUpperCase()}</td>
                                    <td className="table-cell text-gray-600">{inv.created_at}</td>
                                    <td className="table-cell">{inv.guest?.full_name}</td>
                                    <td className="table-cell">#{inv.reservation?.id}</td>
                                    <td className="table-cell font-bold text-orange-600">₱{inv.total.toLocaleString()}</td>
                                    <td className="table-cell">
                                        <span className={`badge ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' :
                                                inv.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'
                                            }`}>
                                            {inv.status}
                                        </span>
                                    </td>
                                    <td className="table-cell text-right">
                                        <button className="text-orange-500 hover:text-orange-700 font-medium text-sm mr-3">Print</button>
                                        <button className="text-orange-500 hover:text-orange-700 font-medium text-sm">View</button>
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
