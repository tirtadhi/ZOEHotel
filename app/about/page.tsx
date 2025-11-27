import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Footer from '@/components/navbar/footer';
import { FaAward, FaUsers, FaHotel, FaSmile } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'About Us - Online Booking',
  description:
    'Learn more about our mission, values, and commitment to providing exceptional accommodation services.',
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center bg-linear-to-br from-red-900 via-red-800 to-red-950 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <FaHotel className="text-[400px]" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl">
            Delivering excellence in hospitality since 2020
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Founded in 2020, our online booking platform was created with a
                simple mission: to make finding and booking the perfect
                accommodation as easy and seamless as possible. We believe that
                every traveler deserves a comfortable, affordable, and memorable
                stay.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Over the years, we&apos;ve grown from a small startup to a
                trusted name in the hospitality industry, serving thousands of
                satisfied guests from around the world. Our commitment to
                quality, service, and value remains unwavering.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we continue to innovate and improve, always putting our
                guests first and ensuring that every booking experience exceeds
                expectations.
              </p>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-xl bg-linear-to-br from-red-800 to-red-950 flex items-center justify-center">
              <FaHotel className="text-[200px] text-white opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <FaHotel className="text-5xl text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-800 mb-2">50+</div>
              <div className="text-gray-600">Rooms Available</div>
            </div>
            <div>
              <FaUsers className="text-5xl text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-800 mb-2">10K+</div>
              <div className="text-gray-600">Happy Guests</div>
            </div>
            <div>
              <FaAward className="text-5xl text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-800 mb-2">15+</div>
              <div className="text-gray-600">Awards Won</div>
            </div>
            <div>
              <FaSmile className="text-5xl text-red-500 mx-auto mb-4" />
              <div className="text-4xl font-bold text-gray-800 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for excellence in every aspect of our service,
                ensuring the highest standards of quality and comfort for our
                guests.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Integrity
              </h3>
              <p className="text-gray-600">
                Honesty and transparency are at the heart of our business. We
                build trust through reliable service and clear communication.
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-gray-50 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Innovation
              </h3>
              <p className="text-gray-600">
                We continuously improve our platform and services, embracing new
                technologies to enhance the guest experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 text-lg">
              What makes us stand out from the rest
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: 'Best Price Guarantee',
                description:
                  'We offer competitive rates and price matching to ensure you get the best value for your money.',
              },
              {
                title: 'Easy Booking Process',
                description:
                  'Our user-friendly platform makes it simple to search, compare, and book your perfect room in minutes.',
              },
              {
                title: '24/7 Customer Support',
                description:
                  'Our dedicated support team is available round the clock to assist you with any questions or concerns.',
              },
              {
                title: 'Flexible Cancellation',
                description:
                  'Plans change, and we understand. Enjoy flexible cancellation policies on most bookings.',
              },
              {
                title: 'Quality Assurance',
                description:
                  'Every room is carefully inspected and maintained to ensure cleanliness and comfort.',
              },
              {
                title: 'Secure Payments',
                description:
                  'Your payment information is protected with industry-standard encryption and security measures.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="text-3xl">✓</div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-red-500">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Experience the Difference
          </h2>
          <p className="text-xl mb-8">
            Join our community of satisfied guests and discover why we&apos;re
            the preferred choice for travelers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/room">
              <Button
                size="lg"
                className="bg-white! text-red-800! hover:bg-red-50! font-semibold"
              >
                Browse Rooms
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white! text-white! hover:bg-white! hover:text-red-800! font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
