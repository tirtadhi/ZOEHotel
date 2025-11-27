// Room Types
export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: number; // in square meters
  bedType: string;
  images: string[];
  amenities: string[];
  availability: boolean;
  rating: number;
  reviews: number;
  category: 'standard' | 'deluxe' | 'suite' | 'family';
}

// Booking/Reservation Types
export interface Booking {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  roomId: string;
  roomName: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  specialRequests?: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'user' | 'admin';
  avatar?: string;
}

// Contact Form
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: 'new' | 'read' | 'replied';
}

// Stats for Dashboard
export interface DashboardStats {
  totalBookings: number;
  totalRevenue: number;
  occupancyRate: number;
  activeGuests: number;
  pendingBookings: number;
  totalRooms: number;
}
