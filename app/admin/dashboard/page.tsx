'use client';
import Link from 'next/link';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { dashboardStats, bookings, rooms } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import {
  FaHotel,
  FaDollarSign,
  FaPercentage,
  FaUsers,
  FaClock,
  FaBed,
} from 'react-icons/fa';

function AdminDashboardContent() {
  const recentBookings = bookings.slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Overview of your booking system</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FaHotel className="text-2xl text-blue-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">+12%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">
              {dashboardStats.totalBookings}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaDollarSign className="text-2xl text-green-600" />
              </div>
              <span className="text-sm font-semibold text-green-600">+8%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">
              {formatPrice(dashboardStats.totalRevenue)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FaPercentage className="text-2xl text-red-900" />
              </div>
              <span className="text-sm font-semibold text-green-600">+5%</span>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Occupancy Rate</h3>
            <p className="text-3xl font-bold text-gray-800">
              {dashboardStats.occupancyRate}%
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FaUsers className="text-2xl text-purple-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Active Guests</h3>
            <p className="text-3xl font-bold text-gray-800">
              {dashboardStats.activeGuests}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FaClock className="text-2xl text-yellow-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Pending Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">
              {dashboardStats.pendingBookings}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <FaBed className="text-2xl text-indigo-600" />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm mb-1">Total Rooms</h3>
            <p className="text-3xl font-bold text-gray-800">
              {dashboardStats.totalRooms}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Bookings */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">
                  Recent Bookings
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Booking ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Guest
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Room
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                          {booking.id}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-800">
                            {booking.userName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {booking.userEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {booking.roomName}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              booking.status === 'confirmed'
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {formatPrice(booking.totalPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t">
                <Link
                  href="/admin/bookings"
                  className="text-red-500 hover:text-red-900 font-semibold text-sm"
                >
                  View All Bookings →
                </Link>
              </div>
            </div>
          </div>

          {/* Room Status */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-800">Room Status</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Available</span>
                    <span className="font-bold text-green-600">
                      {rooms.filter((r) => r.availability).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (rooms.filter((r) => r.availability).length /
                            rooms.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Occupied</span>
                    <span className="font-bold text-red-900">
                      {rooms.filter((r) => !r.availability).length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{
                        width: `${
                          (rooms.filter((r) => !r.availability).length /
                            rooms.length) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/admin/room"
                      className="block w-full px-4 py-2 bg-red-50 text-red-900 rounded-md text-center font-semibold hover:bg-red-100 transition"
                    >
                      Manage Rooms
                    </Link>
                    <Link
                      href="/admin/bookings"
                      className="block w-full px-4 py-2 bg-blue-50 text-blue-600 rounded-md text-center font-semibold hover:bg-blue-100 transition"
                    >
                      View Bookings
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminDashboardContent />
    </ProtectedRoute>
  );
}
