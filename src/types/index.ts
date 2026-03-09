export type RoomType = 'Single' | 'Double' | 'Suite' | 'Deluxe';
export type RoomStatus = 'Available' | 'Occupied' | 'Maintenance' | 'Reserved';
export type ReservationStatus = 'Pending' | 'Confirmed' | 'Checked-In' | 'Checked-Out' | 'Cancelled';
export type PaymentMethod = 'Cash' | 'Card' | 'GCash' | 'Bank Transfer';
export type StaffRole = 'Admin' | 'Receptionist' | 'Housekeeping';

export interface Room {
    id: string;
    room_number: string;
    type: RoomType;
    floor: number;
    price_per_night: number;
    status: RoomStatus;
    amenities: string[];
    description: string;
    capacity: number;
    created_at: string;
}

export interface Guest {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    nationality: string;
    id_number: string;
    loyalty_points: number;
    special_requests?: string;
    created_at: string;
}

export interface Reservation {
    id: string;
    guest_id: string;
    room_id: string;
    check_in: string;
    check_out: string;
    status: ReservationStatus;
    special_requests?: string;
    total_amount: number;
    created_at: string;
    guest?: Guest;
    room?: Room;
}

export interface InvoiceItem {
    id: string;
    invoice_id: string;
    description: string;
    quantity: number;
    unit_price: number;
    total: number;
}

export interface Invoice {
    id: string;
    reservation_id: string;
    guest_id: string;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
    status: 'Pending' | 'Paid' | 'Partially Paid';
    created_at: string;
    reservation?: Reservation;
    guest?: Guest;
    items?: InvoiceItem[];
    payments?: Payment[];
}

export interface Payment {
    id: string;
    invoice_id: string;
    amount: number;
    method: PaymentMethod;
    reference?: string;
    paid_at: string;
}

export interface Staff {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    role: StaffRole;
    department: string;
    hire_date: string;
    status: 'Active' | 'Inactive';
    created_at: string;
}

export interface Shift {
    id: string;
    staff_id: string;
    date: string;
    start_time: string;
    end_time: string;
    notes?: string;
    staff?: Staff;
}

export interface Task {
    id: string;
    staff_id: string;
    room_id: string;
    title: string;
    description?: string;
    priority: 'Low' | 'Medium' | 'High';
    status: 'Pending' | 'In Progress' | 'Completed';
    due_date: string;
    staff?: Staff;
    room?: Room;
}
