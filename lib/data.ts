import { Room, Booking, DashboardStats } from './types';

// Mock Room Data
export const rooms: Room[] = [
  {
    id: '1',
    name: 'Standard Single Room',
    description:
      'Cozy room perfect for solo travelers. Features a comfortable single bed, work desk, and modern amenities.',
    price: 500000,
    capacity: 1,
    size: 20,
    bedType: 'Single Bed',
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'TV',
      'Mini Fridge',
      'Work Desk',
    ],
    availability: true,
    rating: 4.5,
    reviews: 128,
    category: 'standard',
  },
  {
    id: '2',
    name: 'Deluxe Double Room',
    description:
      'Spacious double room with elegant design and premium amenities. Perfect for couples or business travelers.',
    price: 850000,
    capacity: 2,
    size: 30,
    bedType: 'Queen Bed',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Smart TV',
      'Mini Bar',
      'Coffee Maker',
      'Bathtub',
    ],
    availability: true,
    rating: 4.8,
    reviews: 256,
    category: 'deluxe',
  },
  {
    id: '3',
    name: 'Family Suite',
    description:
      'Large family suite with separate living area. Ideal for families with children, featuring two bedrooms.',
    price: 1500000,
    capacity: 4,
    size: 50,
    bedType: '1 King + 2 Single Beds',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Smart TV',
      'Kitchenette',
      'Washing Machine',
      'Dining Area',
    ],
    availability: true,
    rating: 4.9,
    reviews: 189,
    category: 'family',
  },
  {
    id: '4',
    name: 'Executive Suite',
    description:
      'Luxurious executive suite with panoramic city views. Premium furnishings and exclusive amenities.',
    price: 2500000,
    capacity: 2,
    size: 60,
    bedType: 'King Bed',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      '55" Smart TV',
      'Mini Bar',
      'Espresso Machine',
      'Jacuzzi',
      'Butler Service',
    ],
    availability: true,
    rating: 5.0,
    reviews: 94,
    category: 'suite',
  },
  {
    id: '5',
    name: 'Standard Twin Room',
    description:
      'Comfortable twin room perfect for friends traveling together. Two single beds with modern amenities.',
    price: 700000,
    capacity: 2,
    size: 25,
    bedType: '2 Single Beds',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'TV',
      'Mini Fridge',
      'Safe Box',
    ],
    availability: true,
    rating: 4.6,
    reviews: 167,
    category: 'standard',
  },
  {
    id: '6',
    name: 'Deluxe King Room',
    description:
      'Premium king room with modern design and city views. Perfect for a romantic getaway.',
    price: 1200000,
    capacity: 2,
    size: 35,
    bedType: 'King Bed',
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    ],
    amenities: [
      'Free Wi-Fi',
      'Air Conditioning',
      'Smart TV',
      'Mini Bar',
      'Nespresso Machine',
      'Rain Shower',
    ],
    availability: false,
    rating: 4.7,
    reviews: 203,
    category: 'deluxe',
  },
];

// Mock Booking Data
export const bookings: Booking[] = [
  {
    id: 'B001',
    userId: 'U001',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    roomId: '1',
    roomName: 'Standard Single Room',
    checkIn: new Date('2025-12-01'),
    checkOut: new Date('2025-12-03'),
    guests: 1,
    totalPrice: 1000000,
    status: 'confirmed',
    createdAt: new Date('2025-11-20'),
    specialRequests: 'Early check-in if possible',
    guestName: 'John Doe',
    guestEmail: 'john@example.com',
    guestPhone: '+62 812-3456-7890',
  },
  {
    id: 'B002',
    userId: 'U002',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    roomId: '2',
    roomName: 'Deluxe Double Room',
    checkIn: new Date('2025-12-05'),
    checkOut: new Date('2025-12-08'),
    guests: 2,
    totalPrice: 2550000,
    status: 'pending',
    createdAt: new Date('2025-11-22'),
    guestName: 'Jane Smith',
    guestEmail: 'jane@example.com',
    guestPhone: '+62 821-9876-5432',
  },
  {
    id: 'B003',
    userId: 'U003',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    roomId: '3',
    roomName: 'Family Suite',
    checkIn: new Date('2025-11-28'),
    checkOut: new Date('2025-12-02'),
    guests: 4,
    totalPrice: 6000000,
    status: 'confirmed',
    createdAt: new Date('2025-11-15'),
    guestName: 'Mike Johnson',
    guestEmail: 'mike@example.com',
    guestPhone: '+62 813-5555-6666',
  },
];

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  totalBookings: 156,
  totalRevenue: 245000000,
  occupancyRate: 78,
  activeGuests: 12,
  pendingBookings: 8,
  totalRooms: 24,
};

// Helper Functions
export const getRoomById = (id: string): Room | undefined => {
  return rooms.find((room) => room.id === id);
};

export const getAvailableRooms = (): Room[] => {
  return rooms.filter((room) => room.availability);
};

export const getRoomsByCategory = (category: string): Room[] => {
  return rooms.filter((room) => room.category === category);
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};
