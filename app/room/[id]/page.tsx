'use client';
import { useState } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import PaymentModal from '@/components/payment/PaymentModal';
import Footer from '@/components/navbar/footer';
import { getRoomById, formatPrice, formatDate } from '@/lib/data';
import { Booking } from '@/lib/types';
import {
  FaUser,
  FaBed,
  FaRulerCombined,
  FaStar,
  FaCheck,
  FaArrowLeft,
} from 'react-icons/fa';

export default function RoomDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const room = getRoomById(resolvedParams.id);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [selectedImage, setSelectedImage] = useState(0);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    specialRequests: '',
  });
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | null>(null);

  if (!room) {
    notFound();
  }

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut) return 0;
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const days = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days > 0 ? days * room.price : 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      alert('Please sign in to continue booking');
      router.push(
        '/signin?redirect=' + encodeURIComponent(window.location.pathname)
      );
      return;
    }

    // Create booking object
    const booking: Booking = {
      id: `B${Date.now()}`,
      userId: user!.id,
      userName: formData.name,
      userEmail: formData.email,
      roomId: room.id,
      roomName: room.name,
      checkIn: new Date(formData.checkIn),
      checkOut: new Date(formData.checkOut),
      guests: formData.guests,
      totalPrice: calculateTotalPrice(),
      status: 'pending',
      createdAt: new Date(),
      specialRequests: formData.specialRequests,
      guestName: formData.name,
      guestEmail: formData.email,
      guestPhone: formData.phone,
    };

    // Set current booking and show payment modal
    setCurrentBooking(booking);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    setShowPaymentModal(false);
    setShowBookingForm(false);
    // Redirect immediately
    router.push('/myreservation');
  };

  const totalPrice = calculateTotalPrice();
  const numberOfNights =
    formData.checkIn && formData.checkOut
      ? Math.ceil(
          (new Date(formData.checkOut).getTime() -
            new Date(formData.checkIn).getTime()) /
            (1000 * 60 * 60 * 24)
        )
      : 0;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <Link
            href="/room"
            className="inline-flex items-center text-orange-500 hover:text-orange-600 mb-6"
          >
            <FaArrowLeft className="mr-2" />
            Back to Rooms
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative h-96">
                  <Image
                    src={room.images[selectedImage]}
                    alt={room.name}
                    fill
                    className="object-cover"
                  />
                  {!room.availability && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-6 py-3 rounded-md font-semibold text-lg">
                        Not Available
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex gap-2">
                  {room.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition ${
                        selectedImage === index
                          ? 'border-orange-400'
                          : 'border-gray-300'
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${room.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Room Details */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      {room.name}
                    </h1>
                    <span className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-semibold capitalize">
                      {room.category}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-yellow-400 mb-1">
                      <FaStar className="mr-1" />
                      <span className="text-lg font-bold text-gray-800">
                        {room.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({room.reviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FaUser className="text-2xl text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Capacity</p>
                    <p className="font-bold text-gray-800">
                      {room.capacity} Guest{room.capacity > 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FaBed className="text-2xl text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Bed Type</p>
                    <p className="font-bold text-gray-800">{room.bedType}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <FaRulerCombined className="text-2xl text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Room Size</p>
                    <p className="font-bold text-gray-800">{room.size}m²</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-3">
                    Description
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Amenities
                  </h2>
                  <div className="grid md:grid-cols-2 gap-3">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FaCheck className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-orange-500">
                      {formatPrice(room.price)}
                    </span>
                    <span className="text-gray-500">/ night</span>
                  </div>
                </div>

                {!showBookingForm ? (
                  <Button
                    fullWidth
                    size="lg"
                    onClick={() => setShowBookingForm(true)}
                    disabled={!room.availability}
                  >
                    {room.availability ? 'Book Now' : 'Not Available'}
                  </Button>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Full Name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="John Doe"
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="john@example.com"
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+62 812-3456-7890"
                    />
                    <Input
                      label="Check-in Date"
                      type="date"
                      required
                      value={formData.checkIn}
                      onChange={(e) =>
                        setFormData({ ...formData, checkIn: e.target.value })
                      }
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Input
                      label="Check-out Date"
                      type="date"
                      required
                      value={formData.checkOut}
                      onChange={(e) =>
                        setFormData({ ...formData, checkOut: e.target.value })
                      }
                      min={
                        formData.checkIn ||
                        new Date().toISOString().split('T')[0]
                      }
                    />
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Number of Guests <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            guests: parseInt(e.target.value),
                          })
                        }
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                      >
                        {[...Array(room.capacity)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Guest{i > 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <TextArea
                      label="Special Requests"
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          specialRequests: e.target.value,
                        })
                      }
                      placeholder="Any special requirements?"
                      rows={3}
                    />

                    {numberOfNights > 0 && (
                      <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            {formatPrice(room.price)} x {numberOfNights} night
                            {numberOfNights > 1 ? 's' : ''}
                          </span>
                          <span className="font-semibold">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between text-lg font-bold pt-2 border-t">
                          <span>Total</span>
                          <span className="text-orange-500">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Button type="submit" fullWidth size="lg">
                        Confirm Booking
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={() => setShowBookingForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Payment Modal */}
      {showPaymentModal && currentBooking && (
        <PaymentModal
          booking={currentBooking}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}
