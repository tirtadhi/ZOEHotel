import { Booking } from './types';

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'qris' | 'bank_transfer' | 'credit_card' | 'cash';
  status: 'pending' | 'paid' | 'failed' | 'expired';
  qrCode?: string;
  transactionId?: string;
  paidAt?: Date;
  createdAt: Date;
  expiresAt: Date;
}

// Generate QR Code string (dalam production, ini akan dari payment gateway API)
export function generateQRCode(bookingId: string, amount: number): string {
  // Format QRIS sederhana (dalam production, gunakan API seperti Midtrans/Xendit)
  const qrisData = {
    merchantName: 'Online Booking',
    merchantId: 'BOOKING123',
    amount: amount,
    bookingId: bookingId,
    timestamp: Date.now(),
  };

  // Convert to base64 string untuk simulasi
  return btoa(JSON.stringify(qrisData));
}

// Generate QR Code image URL (untuk display)
export function getQRCodeImageURL(qrData: string): string {
  // Menggunakan QR Code API gratis untuk generate image
  return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
    qrData
  )}`;
}

// Create payment
export function createPayment(
  booking: Booking,
  method: Payment['method'] = 'qris'
): Payment {
  const payment: Payment = {
    id: `PAY-${Date.now()}`,
    bookingId: booking.id,
    amount: booking.totalPrice,
    method: method,
    status: 'pending',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 jam
  };

  if (method === 'qris') {
    const qrData = generateQRCode(booking.id, booking.totalPrice);
    payment.qrCode = qrData;
    payment.transactionId = `TRX-${Date.now()}`;
  }

  return payment;
}

// Simulate payment processing
export async function processPayment(paymentId: string): Promise<boolean> {
  // Simulasi API call ke payment gateway
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Random success/failure untuk demo (dalam production, ini dari API response)
  return Math.random() > 0.1; // 90% success rate
}

// Check payment status
export function checkPaymentStatus(payment: Payment): Payment['status'] {
  if (payment.status === 'paid') return 'paid';

  // Check if expired
  if (new Date() > payment.expiresAt) {
    return 'expired';
  }

  return payment.status;
}

// Payment methods configuration
export const PAYMENT_METHODS = [
  {
    id: 'qris',
    name: 'QRIS',
    description: 'Scan QR code dengan e-wallet atau mobile banking',
    icon: '📱',
    enabled: true,
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    description: 'Transfer manual ke rekening bank',
    icon: '🏦',
    enabled: true,
  },
  {
    id: 'credit_card',
    name: 'Credit Card',
    description: 'Visa, Mastercard, JCB',
    icon: '💳',
    enabled: false, // Coming soon
  },
  {
    id: 'cash',
    name: 'Cash on Arrival',
    description: 'Bayar saat check-in',
    icon: '💵',
    enabled: true,
  },
];

// Bank accounts untuk transfer manual
export const BANK_ACCOUNTS = [
  {
    bank: 'BCA',
    accountNumber: '1234567890',
    accountName: 'PT Online Booking',
  },
  {
    bank: 'Mandiri',
    accountNumber: '0987654321',
    accountName: 'PT Online Booking',
  },
  {
    bank: 'BNI',
    accountNumber: '5555666677',
    accountName: 'PT Online Booking',
  },
];

// E-wallet options untuk QRIS
export const EWALLET_OPTIONS = [
  'GoPay',
  'OVO',
  'DANA',
  'ShopeePay',
  'LinkAja',
  'Mobile Banking',
];
