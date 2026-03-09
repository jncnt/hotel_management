import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { supabase } from '../lib/supabase';
import type { Reservation, ReservationStatus, Room, Guest } from '../types';

export const Reservations: React.FC = () => {
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [rooms, setRooms] = useState<Room[]>([]);
    const [guests, setGuests] = useState<Guest[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingRes, setEditingRes] = useState<Reservation | null>(null);

    const [formData, setFormData] = useState({
        guest_id: '',
        room_id: '',
        check_in: '',
        check_out: '',
        status: 'Pending' as ReservationStatus,
        special_requests: '',
        total_amount: 0
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);

            // Fetch Rooms for the dropdown
            const { data: roomsData, error: roomsError } = await supabase
                .from('rooms')
                .select('*');
            if (roomsError) throw roomsError;
            setRooms(roomsData || []);

            // Fetch Guests for the dropdown
            const { data: guestsData, error: guestsError } = await supabase
                .from('guests')
                .select('*');
            if (guestsError) throw guestsError;
            setGuests(guestsData || []);

            // Fetch Reservations with joined relations (if foreign keys are set up)
            // If the join fails due to no foreign key, we fall back to fetching raw reservations
            const { data: resData, error: resError } = await supabase
                .from('reservations')
                .select('*, guest:guests(*), room:rooms(*)');

            if (resError) {
                console.warn("Could not fetch reservations with joins. Fetching raw reservations:", resError);
                const { data: rawRes, error: rawError } = await supabase
                    .from('reservations')
                    .select('*');
                if (rawError) throw rawError;

                // Map the relationships manually if foreign keys are not configured in Supabase
                const mappedRes = (rawRes || []).map(r => ({
                    ...r,
                    guest: guestsData?.find(g => g.id === r.guest_id),
                    room: roomsData?.find(rm => rm.id === r.room_id)
                }));
                setReservations(mappedRes);
            } else {
                setReservations(resData || []);
            }

        } catch (error) {
            console.error('Error fetching data: ', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const resetForm = () => {
        setFormData({
            guest_id: '',
            room_id: '',
            check_in: '',
            check_out: '',
            status: 'Pending',
            special_requests: '',
            total_amount: 0
        });
        setEditingRes(null);
    };

    const handleEditClick = (res: Reservation) => {
        setEditingRes(res);
        setFormData({
            guest_id: res.guest_id || '',
            room_id: res.room_id || '',
            check_in: res.check_in || '',
            check_out: res.check_out || '',
            status: res.status,
            special_requests: res.special_requests || '',
            total_amount: res.total_amount || 0
        });
        setIsAddModalOpen(true);
    };

    const handleSaveReservation = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const resData = {
                guest_id: formData.guest_id,
                room_id: formData.room_id,
                check_in: formData.check_in,
                check_out: formData.check_out,
                status: formData.status,
                special_requests: formData.special_requests,
                total_amount: formData.total_amount
            };

            if (editingRes) {
                const { error } = await supabase
                    .from('reservations')
                    .update(resData)
                    .eq('id', editingRes.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('reservations')
                    .insert([resData]);

                if (error) throw error;
            }

            setIsAddModalOpen(false);
            resetForm();
            fetchData();
        } catch (error: any) {
            console.error('Error saving reservation:', error);
            alert(`Failed to save reservation: ${error?.message || 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredReservations = reservations.filter(res =>
        res.guest?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.room?.room_number?.includes(searchTerm) ||
        res.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Reservations</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsAddModalOpen(true);
                    }}
                    className="btn-primary"
                >
                    <Plus size={18} />
                    <span>New Reservation</span>
                </button>
            </div>

            <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by guest, room, or status..."
                            className="input-field pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Loading reservations...</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="table-header">Guest Name</th>
                                    <th className="table-header">Room</th>
                                    <th className="table-header">Check-in</th>
                                    <th className="table-header">Check-out</th>
                                    <th className="table-header">Status</th>
                                    <th className="table-header">Amount</th>
                                    <th className="table-header text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReservations.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4 text-gray-500">
                                            No reservations found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredReservations.map(res => (
                                        <tr key={res.id} className="table-row hover:bg-orange-50/50 transition-colors">
                                            <td className="table-cell font-bold text-gray-900">
                                                {res.guest?.full_name || 'Unknown Guest'}
                                            </td>
                                            <td className="table-cell font-medium text-orange-600">
                                                {res.room ? `${res.room.room_number} (${res.room.type})` : 'Unknown Room'}
                                            </td>
                                            <td className="table-cell">{new Date(res.check_in).toLocaleDateString()}</td>
                                            <td className="table-cell">{new Date(res.check_out).toLocaleDateString()}</td>
                                            <td className="table-cell">
                                                <span className={`badge ${res.status === 'Checked-In' ? 'bg-orange-100 text-orange-700' :
                                                        res.status === 'Confirmed' ? 'bg-green-100 text-green-700' :
                                                            res.status === 'Checked-Out' ? 'bg-gray-100 text-gray-700' :
                                                                res.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                                                                    'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                    {res.status}
                                                </span>
                                            </td>
                                            <td className="table-cell font-medium">₱{Number(res.total_amount).toLocaleString()}</td>
                                            <td className="table-cell text-right">
                                                <button
                                                    onClick={() => handleEditClick(res)}
                                                    className="p-2 text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg transition-colors inline-flex items-center gap-1"
                                                    title="Edit Reservation"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <Modal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                }}
                title={editingRes ? "Edit Reservation" : "Add New Reservation"}
            >
                <form onSubmit={handleSaveReservation} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Guest *</label>
                            <select
                                required
                                name="guest_id"
                                className="input-field"
                                value={formData.guest_id}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select a guest</option>
                                {guests.map(guest => (
                                    <option key={guest.id} value={guest.id}>{guest.full_name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room *</label>
                            <select
                                required
                                name="room_id"
                                className="input-field"
                                value={formData.room_id}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select a room</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.room_number} - {room.type} (₱{room.price_per_night})
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date *</label>
                            <input
                                required
                                name="check_in"
                                type="date"
                                className="input-field"
                                value={formData.check_in}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date *</label>
                            <input
                                required
                                name="check_out"
                                type="date"
                                className="input-field"
                                value={formData.check_out}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                            <select
                                name="status"
                                className="input-field"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Checked-In">Checked-In</option>
                                <option value="Checked-Out">Checked-Out</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount (₱) *</label>
                            <input
                                required
                                name="total_amount"
                                type="number"
                                className="input-field"
                                value={formData.total_amount}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
                        <textarea
                            name="special_requests"
                            rows={3}
                            className="input-field resize-none"
                            placeholder="Optional requests..."
                            value={formData.special_requests}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            onClick={() => {
                                setIsAddModalOpen(false);
                                resetForm();
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Saving...' : (editingRes ? 'Update Reservation' : 'Create Reservation')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
