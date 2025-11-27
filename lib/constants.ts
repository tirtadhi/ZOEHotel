// Navigation Links
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/room', label: 'Rooms' },
  { href: '/contact', label: 'Contact' },
  { href: '/myreservation', label: 'My Reservation' },
];

export const ADMIN_LINKS = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/room', label: 'Manage Rooms' },
];

// Room Categories
export const ROOM_CATEGORIES = [
  { value: 'standard', label: 'Standard' },
  { value: 'deluxe', label: 'Deluxe' },
  { value: 'suite', label: 'Suite' },
  { value: 'family', label: 'Family' },
];

// Price Ranges
export const PRICE_RANGES = [
  { value: 'all', label: 'All Prices' },
  { value: 'budget', label: 'Budget (< Rp 750K)', min: 0, max: 750000 },
  {
    value: 'mid',
    label: 'Mid-Range (Rp 750K - 1.5M)',
    min: 750000,
    max: 1500000,
  },
  { value: 'luxury', label: 'Luxury (> Rp 1.5M)', min: 1500000, max: Infinity },
];

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// Contact Info
export const CONTACT_INFO = {
  address: '123 Booking Street, City Center, Jakarta 12345',
  phone: '+62 812-3456-7890',
  email: 'info@booking.com',
  supportEmail: 'support@booking.com',
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
  linkedin: '#',
};

// Business Hours
export const BUSINESS_HOURS = {
  weekday: '8:00 AM - 8:00 PM',
  saturday: '9:00 AM - 6:00 PM',
  sunday: '10:00 AM - 4:00 PM',
};

// Common Amenities
export const COMMON_AMENITIES = [
  'Free Wi-Fi',
  'Air Conditioning',
  'Smart TV',
  'Mini Bar',
  'Coffee Maker',
  'Safe Box',
  'Bathtub',
  'Rain Shower',
  'Work Desk',
  'Mini Fridge',
  'Room Service',
  'Daily Housekeeping',
];

// Features
export const FEATURES = [
  { icon: '📶', title: 'Free Wi-Fi', desc: 'High-speed internet throughout' },
  { icon: '🔔', title: '24/7 Service', desc: 'Round the clock support' },
  { icon: '🅿️', title: 'Free Parking', desc: 'Complimentary parking space' },
  { icon: '☕', title: 'Breakfast', desc: 'Delicious daily breakfast' },
  { icon: '🏊', title: 'Swimming Pool', desc: 'Outdoor heated pool' },
  { icon: '💪', title: 'Fitness Center', desc: 'Modern gym equipment' },
  { icon: '🔒', title: 'Security', desc: '24-hour security service' },
  { icon: '🍽️', title: 'Room Service', desc: 'In-room dining available' },
];

export default {
  NAV_LINKS,
  ADMIN_LINKS,
  ROOM_CATEGORIES,
  PRICE_RANGES,
  BOOKING_STATUS,
  CONTACT_INFO,
  SOCIAL_LINKS,
  BUSINESS_HOURS,
  COMMON_AMENITIES,
  FEATURES,
};
