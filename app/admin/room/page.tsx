'use client';
import { useState } from 'react';
import Image from 'next/image';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import TextArea from '@/components/ui/TextArea';
import { rooms } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

function AdminRoomContent() {
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    capacity: '1',
    size: '',
    bedType: '',
    category: 'standard',
    availability: true,
  });

  const handleEdit = (room: any) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      description: room.description,
      price: room.price.toString(),
      capacity: room.capacity.toString(),
      size: room.size.toString(),
      bedType: room.bedType,
      category: room.category,
      availability: room.availability,
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingRoom(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      capacity: '1',
      size: '',
      bedType: '',
      category: 'standard',
      availability: true,
    });
    setShowModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
    console.log('Room data:', formData);
    alert(
      editingRoom ? 'Room updated successfully!' : 'Room added successfully!'
    );
    setShowModal(false);
  };

  const handleDelete = (roomId: string) => {
    if (confirm('Are you sure you want to delete this room?')) {
      // In a real app, this would call an API
      console.log('Deleting room:', roomId);
      alert('Room deleted successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Manage Rooms
              </h1>
              <p className="text-gray-600">Add, edit, or remove rooms</p>
            </div>
            <Button onClick={handleAdd}>
              <FaPlus className="mr-2" />
              Add New Room
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Rooms Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="relative h-48">
                <Image
                  src={room.images[0]}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      room.availability
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {room.availability ? 'Available' : 'Occupied'}
                  </span>
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-800 mb-1">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3 capitalize">
                  {room.category} • {room.capacity} guests • {room.size}m²
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {room.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-red-500">
                    {formatPrice(room.price)}
                  </span>
                  <span className="text-sm text-gray-500">/night</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    fullWidth
                    onClick={() => handleEdit(room)}
                  >
                    <FaEdit className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(room.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingRoom ? 'Edit Room' : 'Add New Room'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <Input
                label="Room Name"
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g., Deluxe Double Room"
              />

              <TextArea
                label="Description"
                required
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Describe the room features and amenities..."
                rows={4}
              />

              <div className="grid md:grid-cols-2 gap-5">
                <Input
                  label="Price per Night (IDR)"
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  placeholder="500000"
                />

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                  >
                    <option value="standard">Standard</option>
                    <option value="deluxe">Deluxe</option>
                    <option value="suite">Suite</option>
                    <option value="family">Family</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <Input
                  label="Capacity (Guests)"
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                />

                <Input
                  label="Size (m²)"
                  type="number"
                  required
                  value={formData.size}
                  onChange={(e) =>
                    setFormData({ ...formData, size: e.target.value })
                  }
                />

                <Input
                  label="Bed Type"
                  type="text"
                  required
                  value={formData.bedType}
                  onChange={(e) =>
                    setFormData({ ...formData, bedType: e.target.value })
                  }
                  placeholder="e.g., King Bed"
                />
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.availability}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        availability: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-700"
                  />
                  <span className="text-sm font-semibold text-gray-700">
                    Room is available for booking
                  </span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" fullWidth>
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdminRoomPage() {
  return (
    <ProtectedRoute requireAdmin>
      <AdminRoomContent />
    </ProtectedRoute>
  );
}
