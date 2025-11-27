'use client';
import { useState } from 'react';
import RoomCard from '@/components/ui/RoomCard';
import Button from '@/components/ui/Button';
import Footer from '@/components/navbar/footer';
import { rooms } from '@/lib/data';
import { FaSearch, FaFilter } from 'react-icons/fa';

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [showFilters, setShowFilters] = useState(false);

  // Filter rooms
  let filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || room.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange === 'budget') matchesPrice = room.price < 750000;
    else if (priceRange === 'mid')
      matchesPrice = room.price >= 750000 && room.price < 1500000;
    else if (priceRange === 'luxury') matchesPrice = room.price >= 1500000;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort rooms
  filteredRooms.sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended (default order)
  });

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">Our Rooms</h1>
            <p className="text-gray-600">
              Find your perfect accommodation from our collection
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Search and Filter Bar */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <FaFilter className="mr-2" />
                Filters
              </Button>
            </div>

            {/* Filters */}
            <div
              className={`grid md:grid-cols-3 gap-4 ${
                showFilters ? 'block' : 'hidden md:grid'
              }`}
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="all">All Categories</option>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="family">Family</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget (&lt; Rp 750K)</option>
                  <option value="mid">Mid-Range (Rp 750K - 1.5M)</option>
                  <option value="luxury">Luxury (&gt; Rp 1.5M)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing{' '}
              <span className="font-semibold">{filteredRooms.length}</span> room
              {filteredRooms.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Room Grid */}
          {filteredRooms.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-md">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                No rooms found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search or filter criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setPriceRange('all');
                  setSortBy('recommended');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
