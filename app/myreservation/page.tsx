'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Footer from '@/components/navbar/footer';
import { bookings } from '@/lib/data';
import { formatPrice, formatDate } from '@/lib/data';
import {
  FaCalendar,
  FaUser,
  FaClock,
  FaTimes,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import type { Booking } from '@/lib/types';

// Payment deadline: 24 hours after booking
const PAYMENT_DEADLINE_HOURS = 24;

function MyReservationContent() {
  const router = useRouter();
  const [filter, setFilter] = useState<string>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);
  const [bookingStatuses, setBookingStatuses] = useState<{
    [key: string]: string;
  }>({});
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every minute for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Auto-cancel expired bookings
  useEffect(() => {
    const checkExpiredBookings = () => {
      const now = new Date().getTime();
      const updatedStatuses = { ...bookingStatuses };
      let hasChanges = false;

      bookings.forEach((booking) => {
        const currentStatus = getBookingStatus(booking.id, booking.status);
        if (currentStatus === 'pending') {
          const bookingTime = new Date(booking.createdAt).getTime();
          const deadlineTime =
            bookingTime + PAYMENT_DEADLINE_HOURS * 60 * 60 * 1000;

          if (now > deadlineTime) {
            updatedStatuses[booking.id] = 'cancelled';
            hasChanges = true;
          }
        }
      });

      if (hasChanges) {
        setBookingStatuses(updatedStatuses);
      }
    };

    // Check immediately
    checkExpiredBookings();

    // Check every minute
    const interval = setInterval(checkExpiredBookings, 60000);

    return () => clearInterval(interval);
  }, [bookingStatuses]);

  // Calculate time remaining for pending bookings
  const getTimeRemaining = (booking: Booking) => {
    if (getBookingStatus(booking.id, booking.status) !== 'pending') {
      return null;
    }

    const now = new Date().getTime();
    const bookingTime = new Date(booking.createdAt).getTime();
    const deadlineTime = bookingTime + PAYMENT_DEADLINE_HOURS * 60 * 60 * 1000;
    const remaining = deadlineTime - now;

    if (remaining <= 0) {
      return 'Expired';
    }

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  // Update booking status dynamically
  const getBookingStatus = (bookingId: string, originalStatus: string) => {
    return bookingStatuses[bookingId] || originalStatus;
  };

  const filteredBookings = bookings.filter((booking) => {
    const currentStatus = getBookingStatus(booking.id, booking.status);
    if (filter === 'all') return true;
    return currentStatus === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handleCancelClick = (bookingId: string) => {
    setBookingToCancel(bookingId);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (bookingToCancel) {
      setBookingStatuses((prev) => ({
        ...prev,
        [bookingToCancel]: 'cancelled',
      }));
      setShowCancelModal(false);
      setBookingToCancel(null);
    }
  };

  const handleConfirmBooking = (bookingId: string) => {
    setBookingStatuses((prev) => ({
      ...prev,
      [bookingId]: 'confirmed',
    }));
  };

  const handleBookAgain = (roomId: string) => {
    router.push(`/room/${roomId}`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              My Reservations
            </h1>
            <p className="text-gray-600">View and manage your bookings</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Filter Tabs */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'all', label: 'All Bookings' },
                { value: 'pending', label: 'Pending' },
                { value: 'confirmed', label: 'Confirmed' },
                { value: 'completed', label: 'Completed' },
                { value: 'cancelled', label: 'Cancelled' },
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setFilter(tab.value)}
                  className={`px-6 py-2 rounded-md font-semibold transition ${
                    filter === tab.value
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bookings List */}
          {filteredBookings.length > 0 ? (
            <div className="space-y-6">
              {filteredBookings.map((booking) => {
                const currentStatus = getBookingStatus(
                  booking.id,
                  booking.status
                );
                return (
                  <div
                    key={booking.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-gray-800">
                              {booking.roomName}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(
                                currentStatus
                              )}`}
                            >
                              {currentStatus}
                            </span>
                          </div>
                          <div className="flex flex-col gap-2">
                            <p className="text-gray-600 text-sm">
                              Booking ID:{' '}
                              <span className="font-semibold">
                                {booking.id}
                              </span>
                            </p>
                            {currentStatus === 'pending' && (
                              <div className="flex items-center gap-2 text-sm">
                                <FaExclamationTriangle className="text-yellow-500" />
                                <span className="text-yellow-700 font-semibold">
                                  Confirm in: {getTimeRemaining(booking)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-red-500">
                            {formatPrice(booking.totalPrice)}
                          </p>
                          <p className="text-sm text-gray-500">Total Price</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                          <FaCalendar className="text-red-700 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              Check-in
                            </p>
                            <p className="text-gray-600">
                              {formatDate(booking.checkIn)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaCalendar className="text-red-700 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              Check-out
                            </p>
                            <p className="text-gray-600">
                              {formatDate(booking.checkOut)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <FaUser className="text-red-700 mt-1" />
                          <div>
                            <p className="text-sm font-semibold text-gray-700">
                              Guests
                            </p>
                            <p className="text-gray-600">
                              {booking.guests} Guest
                              {booking.guests > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <p className="text-sm font-semibold text-gray-700 mb-1">
                            Special Requests:
                          </p>
                          <p className="text-gray-600 text-sm">
                            {booking.specialRequests}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <FaClock />
                          <span>Booked on {formatDate(booking.createdAt)}</span>
                        </div>
                        <div className="flex gap-2">
                          {currentStatus === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleCancelClick(booking.id)}
                              >
                                Cancel Booking
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleConfirmBooking(booking.id)}
                              >
                                Confirm
                              </Button>
                            </>
                          )}
                          {currentStatus === 'confirmed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleViewDetails(booking)}
                            >
                              View Details
                            </Button>
                          )}
                          {currentStatus === 'completed' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleBookAgain(booking.roomId)}
                            >
                              Book Again
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-16 text-center">
              <div className="text-6xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No Reservations Found
              </h3>
              <p className="text-gray-600 mb-6">
                {filter === 'all'
                  ? "You don't have any bookings yet. Start exploring our rooms!"
                  : `No ${filter} bookings found.`}
              </p>
              <Link href="/room">
                <Button size="lg">Browse Rooms</Button>
              </Link>
            </div>
          )}
        </div>

        {/* View Details Modal */}
        {showDetailsModal && selectedBooking && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Booking Details
                  </h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition"
                  >
                    <FaTimes className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Booking ID & Status */}
                  <div className="flex items-center justify-between pb-4 border-b">
                    <div>
                      <p className="text-sm text-gray-500">Booking ID</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedBooking.id}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold uppercase ${getStatusColor(
                        getBookingStatus(
                          selectedBooking.id,
                          selectedBooking.status
                        )
                      )}`}
                    >
                      {getBookingStatus(
                        selectedBooking.id,
                        selectedBooking.status
                      )}
                    </span>
                  </div>

                  {/* Payment Deadline Warning for Pending */}
                  {getBookingStatus(
                    selectedBooking.id,
                    selectedBooking.status
                  ) === 'pending' && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                      <div className="flex items-start gap-3">
                        <FaExclamationTriangle className="text-yellow-600 text-xl mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-yellow-800 mb-1">
                            Payment Required
                          </h4>
                          <p className="text-sm text-yellow-700 mb-2">
                            Please confirm your payment within{' '}
                            <strong>{getTimeRemaining(selectedBooking)}</strong>{' '}
                            or this booking will be automatically cancelled.
                          </p>
                          <p className="text-xs text-yellow-600">
                            Deadline:{' '}
                            {new Date(
                              new Date(selectedBooking.createdAt).getTime() +
                                PAYMENT_DEADLINE_HOURS * 60 * 60 * 1000
                            ).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Room Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Room Information
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-xl font-bold text-gray-800 mb-2">
                        {selectedBooking.roomName}
                      </p>
                      <p className="text-gray-600">
                        Room ID: {selectedBooking.roomId}
                      </p>
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Guest Information
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Guest Name</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBooking.guestName}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBooking.guestEmail}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">Phone</p>
                        <p className="font-semibold text-gray-800">
                          {selectedBooking.guestPhone}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-500 mb-1">
                          Number of Guests
                        </p>
                        <p className="font-semibold text-gray-800">
                          {selectedBooking.guests} Guest
                          {selectedBooking.guests > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Booking Dates */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Booking Dates
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCalendar className="text-red-500" />
                          <p className="text-sm text-gray-500">Check-in</p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          {formatDate(selectedBooking.checkIn)}
                        </p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <FaCalendar className="text-red-500" />
                          <p className="text-sm text-gray-500">Check-out</p>
                        </div>
                        <p className="font-semibold text-gray-800">
                          {formatDate(selectedBooking.checkOut)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  {selectedBooking.specialRequests && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">
                        Special Requests
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-700">
                          {selectedBooking.specialRequests}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Payment Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      Payment Information
                    </h3>
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-600">Total Amount</p>
                        <p className="text-3xl font-bold text-red-500">
                          {formatPrice(selectedBooking.totalPrice)}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">
                        Booked on {formatDate(selectedBooking.createdAt)}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => setShowDetailsModal(false)}
                    >
                      Close
                    </Button>
                    {getBookingStatus(
                      selectedBooking.id,
                      selectedBooking.status
                    ) === 'confirmed' && (
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setShowDetailsModal(false);
                          handleBookAgain(selectedBooking.roomId);
                        }}
                      >
                        Book Again
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cancel Confirmation Modal */}
        {showCancelModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                    <FaTimesCircle className="text-red-500 text-3xl" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
                  Cancel Booking?
                </h2>
                <p className="text-gray-600 text-center mb-6">
                  Are you sure you want to cancel this booking? This action
                  cannot be undone.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowCancelModal(false);
                      setBookingToCancel(null);
                    }}
                  >
                    Keep Booking
                  </Button>
                  <Button
                    variant="danger"
                    className="flex-1"
                    onClick={handleConfirmCancel}
                  >
                    Yes, Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default function MyReservationPage() {
  return (
    <ProtectedRoute>
      <MyReservationContent />
    </ProtectedRoute>
  );
}
