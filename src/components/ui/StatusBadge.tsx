import React from 'react';
import type { ReservationStatus, RoomStatus, StaffRole, PaymentMethod } from '../../types';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'purple' | 'gold';

const variantClasses: Record<BadgeVariant, string> = {
    success: 'bg-green-100 text-green-700 border border-green-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    danger: 'bg-red-100 text-red-700 border border-red-200',
    info: 'bg-orange-100 text-orange-700 border border-orange-200',
    neutral: 'bg-gray-100 text-gray-600 border border-gray-200',
    purple: 'bg-purple-100 text-purple-700 border border-purple-200',
    gold: 'bg-amber-50 text-amber-600 border border-amber-200',
};

interface StatusBadgeProps {
    label: string;
    variant?: BadgeVariant;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ label, variant = 'neutral' }) => (
    <span className={`badge ${variantClasses[variant]}`}>{label}</span>
);

export function reservationStatusBadge(status: ReservationStatus) {
    const map: Record<ReservationStatus, BadgeVariant> = {
        'Pending': 'warning',
        'Confirmed': 'info',
        'Checked-In': 'success',
        'Checked-Out': 'neutral',
        'Cancelled': 'danger',
    };
    return <StatusBadge label={status} variant={map[status]} />;
}

export function roomStatusBadge(status: RoomStatus) {
    const map: Record<RoomStatus, BadgeVariant> = {
        'Available': 'success',
        'Occupied': 'danger',
        'Maintenance': 'warning',
        'Reserved': 'info',
    };
    return <StatusBadge label={status} variant={map[status]} />;
}

export function roleBadge(role: StaffRole) {
    const map: Record<StaffRole, BadgeVariant> = {
        'Admin': 'purple',
        'Receptionist': 'info',
        'Housekeeping': 'gold',
    };
    return <StatusBadge label={role} variant={map[role]} />;
}

export function paymentMethodBadge(method: PaymentMethod) {
    const map: Record<PaymentMethod, BadgeVariant> = {
        'Cash': 'success',
        'Card': 'info',
        'GCash': 'purple',
        'Bank Transfer': 'gold',
    };
    return <StatusBadge label={method} variant={map[method]} />;
}
