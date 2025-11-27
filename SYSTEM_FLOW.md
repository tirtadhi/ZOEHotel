# 📚 System Flow & Architecture Documentation

## 🎯 Overview

Dokumentasi lengkap tentang alur kerja dan arsitektur aplikasi Online Booking System.

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Client Browser                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │  Pages   │  │Components│  │ Contexts │  │   Lib    │   │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘   │
│       │             │              │             │          │
│       └─────────────┴──────────────┴─────────────┘          │
│                          │                                   │
└──────────────────────────┼───────────────────────────────────┘
                           │
                ┌──────────▼──────────┐
                │   Next.js Server    │
                │  (App Router)       │
                └──────────┬──────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
   ┌────▼────┐      ┌─────▼──────┐    ┌─────▼──────┐
   │Database │      │Payment API │    │Email Service│
   │(Future) │      │  (Mock)    │    │  (Future)   │
   └─────────┘      └────────────┘    └─────────────┘
```

---

## 🔐 Authentication System Flow

### 1. User Registration (Sign Up)

```
User → Sign Up Page → Enter Details → Submit
  ↓
AuthContext.signup()
  ↓
Validate Data
  ↓
Create User Object
  ↓
Save to Mock Users Array (Production: Database)
  ↓
Auto Login → Store in LocalStorage
  ↓
Redirect to Homepage
```

### 2. User Login (Sign In)

```
User → Sign In Page → Enter Credentials → Submit
  ↓
AuthContext.login()
  ↓
Check Against Mock Users
  ↓
Validate Password
  ↓
Success → Set User State + LocalStorage
  ↓
Redirect to Original Page or Home
```

### 3. Route Protection

```
User Access Protected Route
  ↓
ProtectedRoute Component Checks
  ↓
├─ Not Authenticated? → Redirect to /signin
├─ Admin Required + Not Admin? → Redirect to /
└─ Authorized → Render Page
```

**Protected Routes:**

- `/myreservation` - Requires: Authenticated User
- `/admin/dashboard` - Requires: Admin Role
- `/admin/room` - Requires: Admin Role

---

## 🏨 Booking Flow

### Complete Booking Process

```
1. Browse Rooms
   ├─ Homepage → Featured Rooms
   └─ /room → All Rooms with Filters

2. Select Room
   └─ Click "View Details" → /room/[id]

3. View Room Details
   ├─ Image Gallery
   ├─ Amenities List
   ├─ Price Information
   └─ Click "Book Now"

4. Fill Booking Form
   ├─ Check Authentication
   │  └─ Not Logged In? → Redirect to Sign In
   ├─ Personal Information (auto-filled if logged in)
   ├─ Check-in/Check-out Dates
   ├─ Number of Guests
   └─ Special Requests

5. Submit Booking
   ├─ Create Booking Object
   ├─ Calculate Total Price
   └─ Open Payment Modal

6. Payment Process
   ├─ Select Payment Method
   │  ├─ QRIS (QR Code)
   │  ├─ Bank Transfer
   │  ├─ Credit Card (Coming Soon)
   │  └─ Cash on Arrival
   │
   ├─ For QRIS:
   │  ├─ Generate QR Code
   │  ├─ Display QR Code
   │  ├─ Show Supported E-wallets
   │  └─ User Scans with E-wallet App
   │
   ├─ For Bank Transfer:
   │  ├─ Display Bank Accounts
   │  ├─ Show Transfer Amount
   │  └─ User Transfers Manually
   │
   └─ For Cash on Arrival:
      └─ Confirmed, Pay at Check-in

7. Confirm Payment
   ├─ User Clicks "I Have Paid"
   ├─ Process Payment (Mock: 2s delay)
   └─ Update Booking Status

8. Success
   ├─ Show Success Message
   ├─ Update Booking to "Confirmed"
   ├─ Redirect to My Reservations
   └─ (Future: Send Email Confirmation)
```

---

## ⏰ Payment Deadline & Auto-Cancellation

### Automatic Booking Management

**Deadline Policy:**

- Pending bookings must be confirmed within **24 hours**
- After 24 hours, bookings are **automatically cancelled**
- Countdown timer displayed on My Reservations page
- Real-time status updates every minute

**Booking Lifecycle:**

```
New Booking (Pending)
  ↓
Payment within 24 hours?
  ├─ YES → Confirmed ✅
  └─ NO → Auto-Cancelled ❌ (after 24h)
```

**Features:**

1. **Real-time Countdown** - Shows remaining time for payment
2. **Auto-cancellation** - System automatically cancels expired bookings
3. **Visual Warnings** - Yellow alerts for pending payments
4. **Deadline Display** - Shows exact expiry date/time in booking details

---

## 💳 Payment System Details

### Payment Methods Supported

#### 1. QRIS (QR Code Indonesian Standard)

```javascript
Flow:
1. User selects QRIS
2. System generates QR code string
3. QR Code contains:
   - Merchant Info
   - Booking ID
   - Amount
   - Timestamp
4. Display QR Code Image via API
5. User scans with:
   - GoPay, OVO, DANA, ShopeePay
   - LinkAja, Mobile Banking
6. Payment completed in e-wallet
7. User confirms in system
```

**Files:**

- `lib/payment.ts` - Payment logic
- `components/payment/PaymentModal.tsx` - Payment UI

#### 2. Bank Transfer

```javascript
Flow:
1. Display 3 bank accounts (BCA, Mandiri, BNI)
2. Show exact transfer amount
3. User copies account number
4. Transfer via mobile banking/ATM
5. User uploads proof (Future)
6. Manual verification by admin (Future)
```

#### 3. Cash on Arrival

```javascript
Flow:
1. User selects Cash payment
2. Booking confirmed immediately
3. Payment modal auto-closes
4. Redirect to My Reservations
5. Note: "Pay at check-in"
6. User pays cash when arriving at property
```

**Important Notes:**

- QRIS: QR code loads asynchronously with loading indicator
- Bank Transfer: Manual verification (future: auto-verify via webhook)
- Cash: Auto-confirms instantly without payment proof
- All methods: 24-hour deadline for booking confirmation

### Payment Data Structure

```typescript
interface Payment {
  id: string; // PAY-{timestamp}
  bookingId: string; // Reference to booking
  amount: number; // Total price
  method: 'qris' | 'bank_transfer' | 'credit_card' | 'cash';
  status: 'pending' | 'paid' | 'failed' | 'expired';
  qrCode?: string; // Base64 QR data
  transactionId?: string; // TRX-{timestamp}
  paidAt?: Date;
  createdAt: Date;
  expiresAt: Date; // 24 hours from creation
}
```

---

## 🔄 State Management

### AuthContext (Global Authentication State)

```typescript
Context provides:
- user: User | null           // Current logged in user
- isAuthenticated: boolean    // Login status
- isAdmin: boolean           // Admin check
- login(email, pass)         // Login function
- signup(name, email, pass)  // Registration function
- logout()                   // Logout function
- loading: boolean           // Loading state
```

**Used in:**

- All pages (via `useAuth()` hook)
- Navbar (show/hide links)
- Protected routes

### Local Storage

```javascript
Stored Data:
- "user" → User object (JSON)

Usage:
- Persists login across page reloads
- Cleared on logout
```

---

## 📁 File Structure & Responsibilities

```
booking/
├── app/                          # Next.js Pages (App Router)
│   ├── page.tsx                  # Homepage
│   ├── layout.tsx                # Root layout with AuthProvider
│   ├── signin/page.tsx           # Login page
│   ├── signup/page.tsx           # Registration page
│   ├── room/
│   │   ├── page.tsx              # Room list with filters
│   │   └── [id]/page.tsx         # Room details + Booking form
│   ├── myreservation/page.tsx    # User bookings (Protected)
│   ├── admin/
│   │   ├── dashboard/page.tsx    # Admin dashboard (Admin only)
│   │   └── room/page.tsx         # Room management (Admin only)
│   ├── about/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx    # HOC for route protection
│   ├── payment/
│   │   └── PaymentModal.tsx      # Payment interface with QR
│   ├── navbar/
│   │   ├── navbar.tsx            # Main navigation
│   │   ├── navlink.tsx           # Nav links with auth logic
│   │   └── footer.tsx            # Footer
│   └── ui/
│       ├── Button.tsx            # Reusable button
│       ├── Input.tsx             # Form input
│       ├── TextArea.tsx          # Text area
│       └── RoomCard.tsx          # Room display card
│
├── contexts/
│   └── AuthContext.tsx           # Authentication state management
│
├── lib/
│   ├── types.ts                  # TypeScript interfaces
│   ├── data.ts                   # Mock data + helpers
│   ├── payment.ts                # Payment logic & QR generation
│   ├── constants.ts              # App constants
│   └── utils.ts                  # Utility functions
│
└── public/                       # Static assets (images)
```

---

## 🎨 Component Relationships

### Authentication Flow Components

```
RootLayout
├─ AuthProvider (wraps entire app)
│  └─ Navbar
│     └─ useAuth() → Shows user info
│
Protected Pages
└─ ProtectedRoute
   ├─ useAuth() → Check authentication
   └─ Renders children or redirects
```

### Booking Flow Components

```
Room Detail Page
├─ Room Information Display
├─ Booking Form
│  ├─ useAuth() → Get user data
│  ├─ Date Selection
│  ├─ Guest Count
│  └─ Submit → Opens Payment Modal
│
└─ PaymentModal
   ├─ Payment Method Selection
   ├─ QR Code Display (QRIS)
   ├─ Bank Account Info (Transfer)
   ├─ Confirmation Button
   └─ Success Callback
```

---

## 🔒 Security Implementation

### Current Security Measures

1. **Client-Side Protection**

   ```typescript
   - Route guards via ProtectedRoute
   - Role-based access control
   - Input validation on forms
   - XSS prevention via React
   ```

2. **Data Validation**

   ```typescript
   - Email format validation
   - Phone number validation
   - Required field checks
   - Password confirmation
   ```

3. **Mock Authentication**
   ```typescript
   Demo Accounts:
   - Admin: admin@booking.com / admin123
   - User: user@example.com / user123
   ```

### Production Security Recommendations

```javascript
TODO for Production:
1. Implement real authentication (NextAuth.js, JWT)
2. Hash passwords (bcrypt)
3. HTTPS only
4. CSRF tokens
5. Rate limiting
6. SQL injection prevention (use ORM)
7. Environment variables for secrets
8. API route protection
9. Session management
10. Two-factor authentication (optional)
```

---

## 📊 Data Flow

### 1. User Data Flow

```
Sign Up → AuthContext → Mock Users Array → LocalStorage
                                            ↓
                                    Persist across reloads
                                            ↓
                                    useAuth() in components
                                            ↓
                                    Display user info/status
```

### 2. Booking Data Flow

```
Room Selection → Booking Form → Create Booking Object
                                        ↓
                                 Payment Modal
                                        ↓
                            Payment Method Selection
                                        ↓
                            Process Payment (Mock)
                                        ↓
                            Update Booking Status
                                        ↓
                            Success → My Reservations
```

### 3. Room Data Flow

```
Mock Data (lib/data.ts) → Room Pages
                              ↓
                        Filter/Search
                              ↓
                        Display Cards
                              ↓
                        Select Room
                              ↓
                        Detail Page
```

---

## 🧪 Testing Guide

### Manual Testing Checklist

#### Authentication

- [ ] Sign up with new account
- [ ] Login with existing account
- [ ] Try wrong password
- [ ] Logout
- [ ] Access protected route without login
- [ ] Access admin route as regular user
- [ ] Access admin route as admin

#### Booking Flow

- [ ] Browse rooms
- [ ] Filter by category
- [ ] Search rooms
- [ ] View room details
- [ ] Try booking without login
- [ ] Complete booking with login
- [ ] Select different payment methods
- [ ] Complete QRIS payment
- [ ] Complete bank transfer
- [ ] Select cash on arrival
- [ ] View my reservations

#### Admin Features

- [ ] Access admin dashboard as admin
- [ ] View statistics
- [ ] Access room management
- [ ] Add new room
- [ ] Edit existing room
- [ ] Delete room (confirmation)

---

## 🚀 Deployment Guide

### Environment Variables Needed

```bash
# Production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
NODE_ENV=production

# Future: Database
DATABASE_URL=postgresql://...

# Future: Authentication
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...

# Future: Payment Gateway
MIDTRANS_SERVER_KEY=...
MIDTRANS_CLIENT_KEY=...

# Future: Email
SMTP_HOST=...
SMTP_USER=...
SMTP_PASSWORD=...
```

### Deployment Steps

1. **Vercel (Recommended)**

   ```bash
   # Push to GitHub
   git push origin main

   # Import in Vercel
   - Connect GitHub repo
   - Auto-deploy on push
   ```

2. **Environment Setup**

   - Add environment variables in Vercel dashboard
   - Set production URL
   - Configure domain

3. **Post-Deployment**
   - Test all features
   - Check authentication
   - Verify payment flow
   - Test on mobile devices

---

## 📈 Future Enhancements

### Phase 1: Database Integration

```
- Replace mock data with PostgreSQL/MongoDB
- Real user authentication
- Booking history storage
- Payment transaction logs
```

### Phase 2: Real Payment Gateway

```
- Integrate Midtrans/Xendit
- Real QRIS generation
- Automatic payment verification
- Webhook for payment status
```

### Phase 3: Email Notifications

```
- Booking confirmation email
- Payment receipt
- Check-in reminder
- Review request after checkout
```

### Phase 4: Advanced Features

```
- Review and rating system
- Booking calendar view
- Multi-language support
- Dark mode
- PWA support
- Real-time availability
- Promotional codes
- Loyalty program
```

---

## 🐛 Common Issues & Solutions

### Issue: Authentication not persisting

**Solution:** Check LocalStorage, clear browser cache

### Issue: Payment modal not opening

**Solution:** Ensure user is logged in, check console for errors

### Issue: Admin routes accessible by users

**Solution:** Verify ProtectedRoute is wrapped correctly with requireAdmin

### Issue: QR code not displaying

**Solution:** Check internet connection (uses external QR API)

---

## 📞 Support & Maintenance

### Code Maintenance

```
Regular Tasks:
1. Update dependencies monthly
2. Review security patches
3. Backup data regularly
4. Monitor error logs
5. Performance optimization
```

### Contact

For issues or questions:

- GitHub Issues: [Repository Issues]
- Email: support@booking.com
- Documentation: This file

---

**Last Updated:** November 27, 2025
**Version:** 2.0.0 (with Authentication & Payment)
