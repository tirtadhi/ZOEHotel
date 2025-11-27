import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import RoomCard from '@/components/ui/RoomCard';
import Footer from '@/components/navbar/footer';
import { rooms } from '@/lib/data';
import {
  FaWifi,
  FaConciergeBell,
  FaParking,
  FaCoffee,
  FaSwimmingPool,
  FaDumbbell,
  FaHotel,
} from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

export default function Home() {
  const featuredRooms = rooms.filter((room) => room.availability).slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center bg-linear-to-br from-red-900 via-red-800 to-red-950 overflow-hidden">
        {/* 3D Morphing Background Blobs */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-red-700 opacity-20 animate-morphBlob blur-3xl"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-red-600 opacity-15 animate-morphBlob blur-3xl"
          style={{ animationDelay: '5s' }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-red-800 opacity-10 animate-morphBlob blur-3xl"
          style={{ animationDelay: '10s' }}
        ></div>

        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <FaHotel className="text-[600px] animate-float3d" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Perfect Stay Awaits
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200">
            Discover comfort and luxury in the heart of the city. Book your
            dream room today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/room">
              <Button size="lg">Browse Rooms</Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white hover:text-gray-900"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">
              Experience world-class amenities and services
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <FaWifi />,
                title: 'Free Wi-Fi',
                desc: 'High-speed internet throughout',
              },
              {
                icon: <FaConciergeBell />,
                title: '24/7 Service',
                desc: 'Round the clock support',
              },
              {
                icon: <FaParking />,
                title: 'Free Parking',
                desc: 'Complimentary parking space',
              },
              {
                icon: <FaCoffee />,
                title: 'Breakfast',
                desc: 'Delicious daily breakfast',
              },
              {
                icon: <FaSwimmingPool />,
                title: 'Swimming Pool',
                desc: 'Outdoor heated pool',
              },
              {
                icon: <FaDumbbell />,
                title: 'Fitness Center',
                desc: 'Modern gym equipment',
              },
              {
                icon: <MdSecurity />,
                title: 'Security',
                desc: '24-hour security service',
              },
              {
                icon: <FaConciergeBell />,
                title: 'Room Service',
                desc: 'In-room dining available',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-all duration-300 perspective-container group"
              >
                <div
                  className="text-5xl text-red-700 mb-4 flex justify-center animate-float3d group-hover:scale-110 transition-transform duration-300"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Rooms */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Featured Rooms
            </h2>
            <p className="text-gray-600 text-lg">
              Check out our most popular accommodations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/room">
              <Button size="lg" variant="outline">
                View All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-r from-red-500 to-red-900">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Book Your Stay?
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Join thousands of satisfied guests and experience hospitality at its
            finest
          </p>
          <Link href="/room">
            <Button
              size="lg"
              className="bg-white! text-red-800! hover:bg-red-50! hover:text-red-900! font-bold"
            >
              Book Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              What Our Guests Say
            </h2>
            <p className="text-gray-600 text-lg">
              Real experiences from real guests
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Business Traveler',
                text: 'Amazing experience! The room was spotless, staff was incredibly friendly, and the location was perfect.',
                rating: 5,
              },
              {
                name: 'Michael Chen',
                role: 'Tourist',
                text: 'Best value for money. The amenities exceeded my expectations and the booking process was seamless.',
                rating: 5,
              },
              {
                name: 'Emma Wilson',
                role: 'Family Vacation',
                text: 'Perfect for our family trip. The suite was spacious and the kids loved the pool. Will definitely return!',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">
                  &quot;{testimonial.text}&quot;
                </p>
                <div className="border-t pt-4">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
