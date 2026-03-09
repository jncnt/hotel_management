import type { User } from '../types/auth';

export type Permission = 
  | 'view_dashboard'
  | 'view_rooms'
  | 'manage_rooms'
  | 'view_reservations'
  | 'manage_reservations'
  | 'view_guests'
  | 'manage_guests'
  | 'view_billing'
  | 'manage_billing'
  | 'view_staff'
  | 'manage_staff'
  | 'view_reports'
  | 'manage_settings'
  | 'manage_users';

export interface RolePermissions {
  [key: string]: Permission[];
}

export const ROLE_PERMISSIONS: RolePermissions = {
  admin: [
    'view_dashboard',
    'view_rooms',
    'manage_rooms',
    'view_reservations',
    'manage_reservations',
    'view_guests',
    'manage_guests',
    'view_billing',
    'manage_billing',
    'view_staff',
    'manage_staff',
    'view_reports',
    'manage_settings',
    'manage_users', // Permission to create user accounts
  ],
  manager: [
    'view_dashboard',
    'view_rooms',
    'manage_rooms',
    'view_reservations',
    'manage_reservations',
    'view_guests',
    'manage_guests',
    'view_billing',
    'manage_billing',
    'view_staff',
    'manage_staff',
    'view_reports',
  ],
  staff: [
    'view_dashboard',
    'view_rooms',
    'view_reservations',
    'view_guests',
    'view_billing',
  ],
};

export const rbacUtils = {
  // Check if user has a specific permission
  hasPermission: (user: User | null, permission: Permission): boolean => {
    if (!user) return false;
    const userPermissions = ROLE_PERMISSIONS[user.role] || [];
    return userPermissions.includes(permission);
  },

  // Check if user has any of the specified permissions
  hasAnyPermission: (user: User | null, permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.some(permission => rbacUtils.hasPermission(user, permission));
  },

  // Check if user has all specified permissions
  hasAllPermissions: (user: User | null, permissions: Permission[]): boolean => {
    if (!user) return false;
    return permissions.every(permission => rbacUtils.hasPermission(user, permission));
  },

  // Get all permissions for a user
  getUserPermissions: (user: User | null): Permission[] => {
    if (!user) return [];
    return ROLE_PERMISSIONS[user.role] || [];
  },

  // Check if user can access a specific route
  canAccessRoute: (user: User | null, route: string): boolean => {
    if (!user) return false;
    
    const routePermissions: Record<string, Permission[]> = {
      '/': ['view_dashboard'],
      '/dashboard': ['view_dashboard'],
      '/rooms': ['view_rooms'],
      '/reservations': ['view_reservations'],
      '/guests': ['view_guests'],
      '/billing': ['view_billing'],
      '/staff': ['view_staff'],
    };

    const requiredPermissions = routePermissions[route] || [];
    return rbacUtils.hasAnyPermission(user, requiredPermissions);
  },

  // Check if user can manage a specific resource
  canManage: (user: User | null, resource: string): boolean => {
    if (!user) return false;
    
    const managementPermissions: Record<string, Permission> = {
      'rooms': 'manage_rooms',
      'reservations': 'manage_reservations',
      'guests': 'manage_guests',
      'billing': 'manage_billing',
      'staff': 'manage_staff',
    };

    const requiredPermission = managementPermissions[resource];
    return requiredPermission ? rbacUtils.hasPermission(user, requiredPermission) : false;
  },
};
