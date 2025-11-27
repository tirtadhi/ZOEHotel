'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/data';
import {
  Payment,
  createPayment,
  processPayment,
  getQRCodeImageURL,
  PAYMENT_METHODS,
  BANK_ACCOUNTS,
  EWALLET_OPTIONS,
} from '@/lib/payment';
import { Booking } from '@/lib/types';
import { FaTimes, FaCheck, FaClock, FaCopy } from 'react-icons/fa';

interface PaymentModalProps {
  booking: Booking;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PaymentModal({
  booking,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('qris');
  const [payment, setPayment] = useState<Payment | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [qrLoading, setQrLoading] = useState(false);

  useEffect(() => {
    if (payment && payment.status === 'pending') {
      // Update countdown timer
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const expiry = new Date(payment.expiresAt).getTime();
        const distance = expiry - now;

        if (distance < 0) {
          setTimeRemaining('Expired');
          clearInterval(interval);
        } else {
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);
          setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [payment]);

  const handleCreatePayment = async () => {
    const newPayment = createPayment(
      booking,
      selectedMethod as Payment['method']
    );
    setPayment(newPayment);

    // For QRIS, load QR code image
    if (selectedMethod === 'qris' && newPayment.qrCode) {
      setQrLoading(true);
      try {
        const qrUrl = getQRCodeImageURL(newPayment.qrCode);
        setQrCodeUrl(qrUrl);
      } catch (error) {
        console.error('Error loading QR code:', error);
        alert('Failed to load QR code. Please try another payment method.');
      } finally {
        setQrLoading(false);
      }
    }

    // For cash payment, confirm immediately
    if (selectedMethod === 'cash') {
      setPaymentCompleted(true);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    }
  };

  const handleConfirmPayment = async () => {
    if (!payment) return;

    setIsProcessing(true);
    try {
      const success = await processPayment(payment.id);

      if (success) {
        setPayment({ ...payment, status: 'paid', paidAt: new Date() });
        setPaymentCompleted(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      } else {
        alert('Payment failed! Please try again.');
        setPayment({ ...payment, status: 'failed' });
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing error!');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {paymentCompleted ? 'Payment Successful!' : 'Complete Payment'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            disabled={isProcessing}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <div className="p-6">
          {/* Booking Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">
              Booking Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Room:</span>
                <span className="font-semibold">{booking.roomName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span>{new Date(booking.checkIn).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span>{new Date(booking.checkOut).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span>
                  {booking.guests} guest{booking.guests > 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t font-bold text-lg">
                <span className="text-gray-800">Total:</span>
                <span className="text-red-500">
                  {formatPrice(booking.totalPrice)}
                </span>
              </div>
            </div>
          </div>

          {paymentCompleted ? (
            /* Success State */
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Payment Successful!
              </h3>
              <p className="text-gray-600 mb-4">
                Your booking has been confirmed. Check your email for details.
              </p>
              <p className="text-sm text-gray-500">
                Transaction ID: <strong>{payment?.transactionId}</strong>
              </p>
            </div>
          ) : !payment ? (
            /* Payment Method Selection */
            <>
              <h3 className="font-semibold text-gray-800 mb-4">
                Select Payment Method
              </h3>
              <div className="space-y-3 mb-6">
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    disabled={!method.enabled}
                    className={`w-full p-4 rounded-lg border-2 transition text-left ${
                      selectedMethod === method.id
                        ? 'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${
                      !method.enabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{method.icon}</span>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                          {method.name}
                          {!method.enabled && (
                            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                              Coming Soon
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {method.description}
                        </p>
                      </div>
                      {selectedMethod === method.id && method.enabled && (
                        <FaCheck className="text-red-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <Button fullWidth size="lg" onClick={handleCreatePayment}>
                Continue to Payment
              </Button>
            </>
          ) : payment.status === 'pending' ? (
            /* Payment Details */
            <div>
              {/* Timer */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-center gap-3">
                <FaClock className="text-yellow-600 text-xl" />
                <div>
                  <p className="font-semibold text-yellow-800">
                    Complete payment within:
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">
                    {timeRemaining}
                  </p>
                </div>
              </div>

              {selectedMethod === 'qris' && payment.qrCode && (
                <div className="text-center">
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Scan QR Code
                  </h3>
                  <div className="bg-white border-4 border-gray-200 rounded-lg p-4 inline-block mb-4">
                    {qrLoading ? (
                      <div className="w-[300px] h-[300px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
                      </div>
                    ) : qrCodeUrl ? (
                      <Image
                        src={qrCodeUrl}
                        alt="QR Code"
                        width={300}
                        height={300}
                        className="mx-auto"
                        unoptimized
                      />
                    ) : (
                      <div className="w-[300px] h-[300px] flex items-center justify-center text-gray-400">
                        <p>QR Code not available</p>
                      </div>
                    )}
                  </div>
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">
                      Scan dengan aplikasi e-wallet Anda:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {EWALLET_OPTIONS.map((wallet) => (
                        <span
                          key={wallet}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {wallet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'bank_transfer' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">
                    Transfer ke salah satu rekening:
                  </h3>
                  <div className="space-y-3 mb-6">
                    {BANK_ACCOUNTS.map((account, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-lg">
                            {account.bank}
                          </span>
                          <button
                            onClick={() =>
                              copyToClipboard(account.accountNumber)
                            }
                            className="text-red-500 hover:text-red-900 text-sm flex items-center gap-1"
                          >
                            <FaCopy /> Copy
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm">Account Number:</p>
                        <p className="font-mono text-lg font-semibold">
                          {account.accountNumber}
                        </p>
                        <p className="text-gray-600 text-sm mt-1">
                          {account.accountName}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-blue-800">
                      <strong>Transfer Amount:</strong>{' '}
                      {formatPrice(booking.totalPrice)}
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                      Please transfer the exact amount and upload proof of
                      payment
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === 'cash' && (
                <div className="text-center py-6">
                  <div className="text-6xl mb-4">💵</div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    Pay on Arrival
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You can pay in cash when you check-in at the property.
                  </p>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      Please bring cash of {formatPrice(booking.totalPrice)} on
                      check-in
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod !== 'cash' && (
                <div className="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setPayment(null)}
                    disabled={isProcessing}
                  >
                    Change Method
                  </Button>
                  <Button
                    fullWidth
                    onClick={handleConfirmPayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? 'Processing...' : 'I Have Paid'}
                  </Button>
                </div>
              )}

              <p className="text-xs text-center text-gray-500 mt-4">
                Transaction ID: {payment.transactionId}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
