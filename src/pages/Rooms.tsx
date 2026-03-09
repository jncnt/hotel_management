import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit } from 'lucide-react';
import { Modal } from '../components/ui/Modal';
import { supabase } from '../lib/supabase';
import type { Room, RoomType, RoomStatus } from '../types';

export const Rooms: React.FC = () => {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editingRoom, setEditingRoom] = useState<Room | null>(null);

    const [formData, setFormData] = useState({
        room_number: '',
        type: 'Single' as RoomType,
        floor: 1,
        price_per_night: 0,
        status: 'Available' as RoomStatus,
        capacity: 1,
        description: '',
        amenities: ''
    });

    useEffect(() => {
        fetchRooms();
    }, []);

    const fetchRooms = async () => {
        try {
            const { data, error } = await supabase
                .from('rooms')
                .select('*')
                .order('room_number');

            if (error) throw error;
            setRooms(data || []);
        } catch (error) {
            console.error('Error fetching rooms: ', error);
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
            room_number: '',
            type: 'Single',
            floor: 1,
            price_per_night: 0,
            status: 'Available',
            capacity: 1,
            description: '',
            amenities: ''
        });
        setEditingRoom(null);
    };

    const handleEditClick = (room: Room) => {
        setEditingRoom(room);
        setFormData({
            room_number: room.room_number,
            type: room.type,
            floor: room.floor,
            price_per_night: room.price_per_night,
            status: room.status,
            capacity: room.capacity,
            description: room.description || '',
            amenities: room.amenities ? room.amenities.join(', ') : ''
        });
        setIsAddModalOpen(true);
    };

    const handleSaveRoom = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const roomData = {
                room_number: formData.room_number,
                type: formData.type,
                floor: formData.floor,
                price_per_night: formData.price_per_night,
                status: formData.status,
                capacity: formData.capacity,
                description: formData.description,
                amenities: formData.amenities.split(',').map(a => a.trim()).filter(a => a !== '')
            };

            if (editingRoom) {
                const { error } = await supabase
                    .from('rooms')
                    .update(roomData)
                    .eq('id', editingRoom.id);

                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('rooms')
                    .insert([roomData]);

                if (error) throw error;
            }

            setIsAddModalOpen(false);
            resetForm();
            fetchRooms();
        } catch (error: any) {
            console.error('Error saving room:', error);
            alert(`Failed to save room: ${error?.message || 'Unknown error'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredRooms = rooms.filter(room =>
        room.room_number.includes(searchTerm) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Rooms Management</h2>
                <button
                    onClick={() => {
                        resetForm();
                        setIsAddModalOpen(true);
                    }}
                    className="btn-primary"
                >
                    <Plus size={18} />
                    <span>Add Room</span>
                </button>
            </div>

            <div className="glass-card p-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search rooms..."
                            className="input-field pl-10"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Loading rooms...</div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr>
                                    <th className="table-header">Room N°</th>
                                    <th className="table-header">Type</th>
                                    <th className="table-header">Price/Night</th>
                                    <th className="table-header">Status</th>
                                    <th className="table-header">Capacity</th>
                                    <th className="table-header text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRooms.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-gray-500">
                                            No rooms found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredRooms.map(room => (
                                        <tr key={room.id} className="table-row hover:bg-orange-50/50 transition-colors">
                                            <td className="table-cell font-bold text-gray-900">{room.room_number}</td>
                                            <td className="table-cell">{room.type}</td>
                                            <td className="table-cell font-medium text-orange-600">₱{room.price_per_night.toLocaleString()}</td>
                                            <td className="table-cell">
                                                <span className={`badge ${room.status === 'Available' ? 'bg-green-100 text-green-700' :
                                                    room.status === 'Occupied' ? 'bg-orange-100 text-orange-700' :
                                                        room.status === 'Reserved' ? 'bg-blue-100 text-blue-700' :
                                                            'bg-red-100 text-red-700'
                                                    }`}>
                                                    {room.status}
                                                </span>
                                            </td>
                                            <td className="table-cell">{room.capacity} Pax</td>
                                            <td className="table-cell text-right">
                                                <button
                                                    onClick={() => handleEditClick(room)}
                                                    className="p-2 text-orange-500 hover:text-orange-700 hover:bg-orange-100 rounded-lg transition-colors inline-flex items-center gap-1"
                                                    title="Edit Room"
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
                title={editingRoom ? "Edit Room" : "Add New Room"}
            >
                <form onSubmit={handleSaveRoom} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room Number *</label>
                            <input
                                required
                                name="room_number"
                                type="text"
                                className="input-field"
                                value={formData.room_number}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Floor *</label>
                            <input
                                required
                                name="floor"
                                type="number"
                                className="input-field"
                                value={formData.floor}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Room Type *</label>
                            <select
                                name="type"
                                className="input-field"
                                value={formData.type}
                                onChange={handleInputChange}
                            >
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                                <option value="Deluxe">Deluxe</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                            <select
                                name="status"
                                className="input-field"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="Available">Available</option>
                                <option value="Occupied">Occupied</option>
                                <option value="Maintenance">Maintenance</option>
                                <option value="Reserved">Reserved</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price per Night (₱) *</label>
                            <input
                                required
                                name="price_per_night"
                                type="number"
                                className="input-field"
                                value={formData.price_per_night}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Capacity (Pax) *</label>
                            <input
                                required
                                name="capacity"
                                type="number"
                                className="input-field"
                                value={formData.capacity}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Amenities (comma-separated)</label>
                        <input
                            name="amenities"
                            type="text"
                            placeholder="e.g. WiFi, AC, TV"
                            className="input-field"
                            value={formData.amenities}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            rows={3}
                            className="input-field resize-none"
                            value={formData.description}
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
                            {isSubmitting ? 'Saving...' : (editingRoom ? 'Update Room' : 'Add Room')}
                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
