# 🏨 Online Booking Application

Aplikasi booking online yang profesional dan lengkap, dibangun dengan Next.js 16, TypeScript, dan Tailwind CSS. Sistem ini menyediakan platform modern untuk mengelola reservasi hotel/kamar dengan fitur lengkap untuk user dan admin.

## ✨ Fitur Utama

### 🎯 Untuk User

- **Homepage Modern** - Hero section, featured rooms, testimonials, dan CTA yang menarik
- **Katalog Kamar Lengkap** - Browse semua kamar dengan foto dan deskripsi detail
- **Filter & Pencarian** - Filter berdasarkan kategori, harga, dan sorting options
- **Detail Kamar** - Informasi lengkap dengan galeri foto dan amenities
- **Booking System** - Form booking dengan validasi lengkap dan kalkulasi harga
- **My Reservations** - Kelola dan track semua booking Anda
- **Autentikasi** - Sign in & sign up dengan validasi form
- **Contact Page** - Form kontak dan informasi lengkap dengan peta lokasi
- **About Page** - Informasi tentang layanan dan nilai perusahaan

### 👨‍💼 Untuk Admin

- **Dashboard Analytics** - Overview statistik lengkap (revenue, occupancy, bookings)
- **Room Management** - CRUD operations untuk mengelola kamar
- **Booking Management** - Monitor dan kelola semua reservasi
- **Real-time Stats** - Statistik aktual tentang performa bisnis

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Icons:** React Icons
- **UI Components:** Custom reusable components
- **State Management:** React Hooks

## 📁 Struktur Project

```
booking/
├── app/                          # Next.js App Router
│   ├── about/                    # Halaman About
│   ├── admin/                    # Admin Panel
│   │   ├── dashboard/           # Admin Dashboard
│   │   └── room/                # Room Management
│   ├── contact/                 # Halaman Contact
│   ├── myreservation/           # User Reservations
│   ├── room/                    # Room Listing
│   │   └── [id]/               # Room Detail
│   ├── signin/                  # Sign In Page
│   ├── signup/                  # Sign Up Page
│   ├── layout.tsx               # Root Layout
│   ├── page.tsx                 # Homepage
│   └── globals.css              # Global Styles
├── components/
│   ├── navbar/                  # Navigation Components
│   │   ├── navbar.tsx
│   │   ├── navlink.tsx
│   │   └── footer.tsx
│   └── ui/                      # Reusable UI Components
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── TextArea.tsx
│       └── RoomCard.tsx
├── lib/
│   ├── types.ts                 # TypeScript Interfaces
│   └── data.ts                  # Mock Data & Helpers
└── public/                      # Static Assets
```

## 🚀 Cara Menjalankan

### Prerequisites

- Node.js 18+
- npm atau yarn

### Installation

1. **Clone repository**

```bash
git clone <repository-url>
cd booking
```

2. **Install dependencies**

```bash
npm install
```

3. **Run development server**

```bash
npm run dev
```

4. **Buka browser**

```
http://localhost:3000
```

## 📱 Halaman-Halaman

| Halaman         | URL                | Deskripsi                          |
| --------------- | ------------------ | ---------------------------------- |
| Home            | `/`                | Landing page dengan featured rooms |
| About           | `/about`           | Informasi tentang perusahaan       |
| Rooms           | `/room`            | Katalog semua kamar dengan filter  |
| Room Detail     | `/room/[id]`       | Detail kamar & booking form        |
| Contact         | `/contact`         | Form kontak & informasi            |
| Sign In         | `/signin`          | Halaman login                      |
| Sign Up         | `/signup`          | Halaman registrasi                 |
| My Reservations | `/myreservation`   | Daftar booking user                |
| Admin Dashboard | `/admin/dashboard` | Dashboard admin                    |
| Room Management | `/admin/room`      | CRUD kamar                         |

## 🎨 Komponen Reusable

### Button Component

```tsx
<Button variant="primary" size="md" fullWidth>
  Click Me
</Button>
```

### Input Component

```tsx
<Input label="Email" type="email" required placeholder="your@email.com" />
```

### RoomCard Component

```tsx
<RoomCard room={roomData} />
```

## 💾 Data Structure

### Room Type

```typescript
interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  size: number;
  bedType: string;
  images: string[];
  amenities: string[];
  availability: boolean;
  rating: number;
  reviews: number;
  category: 'standard' | 'deluxe' | 'suite' | 'family';
}
```

### Booking Type

```typescript
interface Booking {
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
}
```

## 🔧 Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 🎯 Fitur yang Akan Datang

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Backend API dengan Next.js API Routes
- [ ] Real authentication dengan NextAuth.js
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Advanced booking calendar
- [ ] Reviews & ratings system
- [ ] Multi-language support
- [ ] Dark mode
- [ ] PWA support

## 🤝 Kontribusi

Contributions, issues, dan feature requests sangat diterima!

## 📝 License

This project is [MIT](LICENSE) licensed.

## 👨‍💻 Developer

Dibuat dengan ❤️ menggunakan Next.js dan TypeScript

---

**Happy Coding! 🚀**
