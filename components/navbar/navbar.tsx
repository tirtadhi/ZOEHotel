'use client';
import Image from 'next/image';
import Link from 'next/link';
import Navlink from '@/components/navbar/navlink';
import { useAuth } from '@/contexts/AuthContext';
import { FaUser, FaSignOutAlt, FaHotel } from 'react-icons/fa';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div className="fixed top-0 w-full bg-white shadow-sm z-20">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition shrink-0"
          >
            <FaHotel className="text-3xl text-red-800" />
            <span className="text-xl md:text-2xl font-bold text-gray-800">ZOË Hotel</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {isAuthenticated && user ? (
              <div className="hidden sm:flex items-center gap-2 md:gap-3">
                <div className="flex items-center gap-2 px-2 md:px-3 py-1 bg-gray-100 rounded-full">
                  <FaUser className="text-red-500 text-sm" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700">
                    {user.name}
                  </span>
                  {user.role === 'admin' && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1 px-2 md:px-3 py-1 text-xs md:text-sm text-red-600 hover:bg-red-50 rounded-md transition"
                  title="Logout"
                >
                  <FaSignOutAlt />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : null}
            <Navlink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
