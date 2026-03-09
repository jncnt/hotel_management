import type { Guest, Invoice, InvoiceItem, Payment, Reservation, Room, Shift, Staff, Task } from '../types';

export const mockRooms: Room[] = [
    { id: 'r1', room_number: '101', type: 'Single', floor: 1, price_per_night: 2500, status: 'Available', amenities: ['WiFi', 'AC', 'TV'], description: 'Cozy single room with city view', capacity: 1, created_at: '2025-01-01' },
    { id: 'r2', room_number: '102', type: 'Single', floor: 1, price_per_night: 2500, status: 'Occupied', amenities: ['WiFi', 'AC', 'TV'], description: 'Cozy single room', capacity: 1, created_at: '2025-01-01' },
    { id: 'r3', room_number: '201', type: 'Double', floor: 2, price_per_night: 4500, status: 'Available', amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'], description: 'Spacious double room', capacity: 2, created_at: '2025-01-01' },
    { id: 'r4', room_number: '202', type: 'Double', floor: 2, price_per_night: 4500, status: 'Reserved', amenities: ['WiFi', 'AC', 'TV', 'Mini Bar'], description: 'Spacious double room with garden view', capacity: 2, created_at: '2025-01-01' },
    { id: 'r5', room_number: '301', type: 'Deluxe', floor: 3, price_per_night: 7500, status: 'Available', amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi'], description: 'Premium deluxe room', capacity: 2, created_at: '2025-01-01' },
    { id: 'r6', room_number: '302', type: 'Deluxe', floor: 3, price_per_night: 7500, status: 'Maintenance', amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi'], description: 'Premium deluxe room', capacity: 2, created_at: '2025-01-01' },
    { id: 'r7', room_number: '401', type: 'Suite', floor: 4, price_per_night: 15000, status: 'Available', amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'Private Balcony', 'Butler Service'], description: 'Luxury suite with panoramic view', capacity: 4, created_at: '2025-01-01' },
    { id: 'r8', room_number: '402', type: 'Suite', floor: 4, price_per_night: 15000, status: 'Occupied', amenities: ['WiFi', 'AC', 'TV', 'Mini Bar', 'Jacuzzi', 'Private Balcony', 'Butler Service'], description: 'Presidential suite', capacity: 4, created_at: '2025-01-01' },
    { id: 'r9', room_number: '203', type: 'Double', floor: 2, price_per_night: 4500, status: 'Available', amenities: ['WiFi', 'AC', 'TV'], description: 'Standard double room', capacity: 2, created_at: '2025-01-01' },
    { id: 'r10', room_number: '103', type: 'Single', floor: 1, price_per_night: 2500, status: 'Available', amenities: ['WiFi', 'AC'], description: 'Budget single room', capacity: 1, created_at: '2025-01-01' },
];

export const mockGuests: Guest[] = [
    { id: 'g1', full_name: 'Maria Santos', email: 'maria.santos@email.com', phone: '09171234567', nationality: 'Filipino', id_number: 'PH123456', loyalty_points: 1250, special_requests: 'Non-smoking room', created_at: '2025-06-01' },
    { id: 'g2', full_name: 'John Smith', email: 'john.smith@email.com', phone: '09189876543', nationality: 'American', id_number: 'US789012', loyalty_points: 850, special_requests: 'High floor preferred', created_at: '2025-07-15' },
    { id: 'g3', full_name: 'Yuki Tanaka', email: 'yuki.tanaka@email.com', phone: '09201112233', nationality: 'Japanese', id_number: 'JP345678', loyalty_points: 3200, special_requests: 'Vegetarian meals', created_at: '2025-05-20' },
    { id: 'g4', full_name: 'Ana Reyes', email: 'ana.reyes@email.com', phone: '09154445566', nationality: 'Filipino', id_number: 'PH901234', loyalty_points: 450, special_requests: '', created_at: '2025-08-10' },
    { id: 'g5', full_name: 'Carlos Mendoza', email: 'carlos.m@email.com', phone: '09167778899', nationality: 'Mexican', id_number: 'MX567890', loyalty_points: 2100, special_requests: 'Late check-out', created_at: '2025-04-05' },
    { id: 'g6', full_name: 'Sophie Laurent', email: 'sophie.l@email.com', phone: '09130001122', nationality: 'French', id_number: 'FR123789', loyalty_points: 675, created_at: '2025-09-01' },
];

export const mockReservations: Reservation[] = [
    { id: 'res1', guest_id: 'g1', room_id: 'r2', check_in: '2026-03-01', check_out: '2026-03-05', status: 'Checked-In', special_requests: 'Extra pillows', total_amount: 10000, created_at: '2026-02-20', guest: mockGuests[0], room: mockRooms[1] },
    { id: 'res2', guest_id: 'g2', room_id: 'r4', check_in: '2026-03-05', check_out: '2026-03-08', status: 'Confirmed', special_requests: '', total_amount: 13500, created_at: '2026-02-25', guest: mockGuests[1], room: mockRooms[3] },
    { id: 'res3', guest_id: 'g3', room_id: 'r8', check_in: '2026-03-02', check_out: '2026-03-07', status: 'Checked-In', special_requests: 'Vegetarian breakfast', total_amount: 75000, created_at: '2026-02-15', guest: mockGuests[2], room: mockRooms[7] },
    { id: 'res4', guest_id: 'g4', room_id: 'r3', check_in: '2026-03-10', check_out: '2026-03-12', status: 'Pending', special_requests: '', total_amount: 9000, created_at: '2026-03-01', guest: mockGuests[3], room: mockRooms[2] },
    { id: 'res5', guest_id: 'g5', room_id: 'r7', check_in: '2026-02-20', check_out: '2026-02-25', status: 'Checked-Out', special_requests: 'Airport transfer', total_amount: 75000, created_at: '2026-02-10', guest: mockGuests[4], room: mockRooms[6] },
    { id: 'res6', guest_id: 'g6', room_id: 'r5', check_in: '2026-03-15', check_out: '2026-03-18', status: 'Confirmed', special_requests: '', total_amount: 22500, created_at: '2026-03-01', guest: mockGuests[5], room: mockRooms[4] },
    { id: 'res7', guest_id: 'g1', room_id: 'r1', check_in: '2026-02-10', check_out: '2026-02-13', status: 'Checked-Out', special_requests: '', total_amount: 7500, created_at: '2026-02-01', guest: mockGuests[0], room: mockRooms[0] },
];

const mockInvoiceItems: InvoiceItem[] = [
    { id: 'ii1', invoice_id: 'inv1', description: 'Room Charge (4 nights × ₱2,500)', quantity: 4, unit_price: 2500, total: 10000 },
    { id: 'ii2', invoice_id: 'inv1', description: 'Room Service', quantity: 1, unit_price: 1200, total: 1200 },
    { id: 'ii3', invoice_id: 'inv1', description: 'Laundry', quantity: 1, unit_price: 500, total: 500 },
    { id: 'ii4', invoice_id: 'inv2', description: 'Room Charge (5 nights × ₱15,000)', quantity: 5, unit_price: 15000, total: 75000 },
    { id: 'ii5', invoice_id: 'inv2', description: 'Mini Bar', quantity: 1, unit_price: 2800, total: 2800 },
    { id: 'ii6', invoice_id: 'inv2', description: 'Spa Services', quantity: 2, unit_price: 3500, total: 7000 },
];

export const mockInvoices: Invoice[] = [
    { id: 'inv1', reservation_id: 'res7', guest_id: 'g1', subtotal: 11700, discount: 500, tax: 1140, total: 12340, status: 'Paid', created_at: '2026-02-13', reservation: mockReservations[6], guest: mockGuests[0], items: mockInvoiceItems.filter(i => i.invoice_id === 'inv1') },
    { id: 'inv2', reservation_id: 'res5', guest_id: 'g5', subtotal: 84800, discount: 0, tax: 8480, total: 93280, status: 'Paid', created_at: '2026-02-25', reservation: mockReservations[4], guest: mockGuests[4], items: mockInvoiceItems.filter(i => i.invoice_id === 'inv2') },
];

export const mockPayments: Payment[] = [
    { id: 'p1', invoice_id: 'inv1', amount: 12340, method: 'Card', reference: 'TXN-20260213-001', paid_at: '2026-02-13' },
    { id: 'p2', invoice_id: 'inv2', amount: 50000, method: 'Bank Transfer', reference: 'TXN-20260225-002', paid_at: '2026-02-24' },
    { id: 'p3', invoice_id: 'inv2', amount: 43280, method: 'Card', reference: 'TXN-20260225-003', paid_at: '2026-02-25' },
];

export const mockStaff: Staff[] = [
    { id: 's1', full_name: 'Ricardo Cruz', email: 'ricardo@luxestay.com', phone: '09171110001', role: 'Admin', department: 'Management', hire_date: '2023-01-15', status: 'Active', created_at: '2023-01-15' },
    { id: 's2', full_name: 'Jenny Garcia', email: 'jenny@luxestay.com', phone: '09172220002', role: 'Receptionist', department: 'Front Desk', hire_date: '2023-03-20', status: 'Active', created_at: '2023-03-20' },
    { id: 's3', full_name: 'Mark Ramos', email: 'mark@luxestay.com', phone: '09173330003', role: 'Receptionist', department: 'Front Desk', hire_date: '2023-06-10', status: 'Active', created_at: '2023-06-10' },
    { id: 's4', full_name: 'Lisa Reyes', email: 'lisa@luxestay.com', phone: '09174440004', role: 'Housekeeping', department: 'Housekeeping', hire_date: '2024-01-05', status: 'Active', created_at: '2024-01-05' },
    { id: 's5', full_name: 'Pedro Bautista', email: 'pedro@luxestay.com', phone: '09175550005', role: 'Housekeeping', department: 'Housekeeping', hire_date: '2024-02-14', status: 'Active', created_at: '2024-02-14' },
    { id: 's6', full_name: 'Grace Domingo', email: 'grace@luxestay.com', phone: '09176660006', role: 'Housekeeping', department: 'Housekeeping', hire_date: '2024-03-01', status: 'Inactive', created_at: '2024-03-01' },
];

export const mockShifts: Shift[] = [
    { id: 'sh1', staff_id: 's2', date: '2026-03-02', start_time: '07:00', end_time: '15:00', notes: 'Morning shift', staff: mockStaff[1] },
    { id: 'sh2', staff_id: 's3', date: '2026-03-02', start_time: '15:00', end_time: '23:00', notes: 'Afternoon shift', staff: mockStaff[2] },
    { id: 'sh3', staff_id: 's4', date: '2026-03-02', start_time: '08:00', end_time: '16:00', notes: 'Floor 1 & 2', staff: mockStaff[3] },
    { id: 'sh4', staff_id: 's5', date: '2026-03-02', start_time: '08:00', end_time: '16:00', notes: 'Floor 3 & 4', staff: mockStaff[4] },
    { id: 'sh5', staff_id: 's2', date: '2026-03-03', start_time: '07:00', end_time: '15:00', notes: 'Morning shift', staff: mockStaff[1] },
    { id: 'sh6', staff_id: 's3', date: '2026-03-03', start_time: '15:00', end_time: '23:00', notes: 'Afternoon shift', staff: mockStaff[2] },
    { id: 'sh7', staff_id: 's4', date: '2026-03-03', start_time: '08:00', end_time: '16:00', notes: 'All floors', staff: mockStaff[3] },
];

export const mockTasks: Task[] = [
    { id: 't1', staff_id: 's4', room_id: 'r2', title: 'Room Cleaning', description: 'Deep clean after checkout', priority: 'High', status: 'In Progress', due_date: '2026-03-02', staff: mockStaff[3], room: mockRooms[1] },
    { id: 't2', staff_id: 's5', room_id: 'r6', title: 'Maintenance Check', description: 'Check AC unit and bathroom plumbing', priority: 'High', status: 'Pending', due_date: '2026-03-02', staff: mockStaff[4], room: mockRooms[5] },
    { id: 't3', staff_id: 's4', room_id: 'r8', title: 'Turndown Service', description: 'Evening turndown for Suite 402', priority: 'Medium', status: 'Pending', due_date: '2026-03-02', staff: mockStaff[3], room: mockRooms[7] },
    { id: 't4', staff_id: 's5', room_id: 'r3', title: 'Linen Change', description: 'Replace bed linen and towels', priority: 'Low', status: 'Completed', due_date: '2026-03-02', staff: mockStaff[4], room: mockRooms[2] },
];
