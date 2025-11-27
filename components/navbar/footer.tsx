import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-screen-xl mx-auto px-4 w-full py-10 md:py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About Us</h3>
            <p className="text-sm leading-relaxed mb-4">
              Your trusted partner for comfortable and affordable accommodation.
              Book your perfect stay with us and experience hospitality at its
              best.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-red-700 transition">
                <FaFacebook size={20} />
              </a>
              <a href="#" className="hover:text-red-700 transition">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-red-700 transition">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-red-700 transition">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-red-700 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-700 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/room" className="hover:text-red-700 transition">
                  Rooms
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-700 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/myreservation"
                  className="hover:text-red-700 transition"
                >
                  My Reservations
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>Online Booking</li>
              <li>24/7 Support</li>
              <li>Free Wi-Fi</li>
              <li>Airport Transfer</li>
              <li>Room Service</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MdLocationOn className="mt-1 mr-2 flex-shrink-0" size={18} />
                <span>123 Booking Street, City Center, Jakarta 12345</span>
              </li>
              <li className="flex items-center">
                <MdPhone className="mr-2" size={18} />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-2" size={18} />
                <span>info@booking.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 border-t border-gray-700 py-6 text-center text-sm text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} Online Booking Application. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
