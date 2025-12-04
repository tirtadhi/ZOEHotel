'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { IoClose, IoMenu } from 'react-icons/io5';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import clsx from 'clsx';

const Navlink = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center p-2 justify-center text-sm text-gray-500 rounded-md md:hidden hover:bg-gray-100"
      >
        {open ? <IoClose className="size-8" /> : <IoMenu className="size-8" />}
      </button>
      <div
        className={clsx('w-full md:block md:w-auto', {
          hidden: !open,
        })}
      >
        <ul className="flex flex-col font-semibold text-sm uppercase p-4 mt-4 rounded-sm bg-gray-50 md:flex-row md:items-center md:space-x-6 lg:space-x-8 md:p-0 md:mt-0 md:border-0 md:bg-white">
          <li>
            <Link
              href="/"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/room"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Rooms
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
            >
              Contact
            </Link>
          </li>

          {isAuthenticated && (
            <li>
              <Link
                href="/myreservation"
                className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
              >
                My Reservation
              </Link>
            </li>
          )}

          {isAdmin && (
            <>
              <li>
                <Link
                  href="/admin/dashboard"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/room"
                  className="block py-2 px-3 text-gray-800 hover:bg-gray-100 rounded-sm md:hover:bg-transparent md:p-0"
                >
                  Manage Room
                </Link>
              </li>
            </>
          )}

          {!isAuthenticated ? (
            <li className="pt-2 md:pt-0">
              <Link
                href="/signin"
                className="block text-center py-2.5 px-6 bg-red-700 text-white hover:bg-red-500 rounded-sm transition"
              >
                Sign In
              </Link>
            </li>
          ) : (
            <li className="md:hidden pt-2 border-t mt-2">
              <div className="flex items-center gap-2 mb-3 px-3 py-2 bg-gray-100 rounded-sm">
                <FaUser className="text-red-500" />
                <div>
                  <div className="text-sm font-semibold text-gray-700">
                    {user?.name}
                  </div>
                  {user?.role === 'admin' && (
                    <div className="text-xs text-red-900">Administrator</div>
                  )}
                </div>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 w-full py-2 px-3 text-red-600 hover:bg-red-50 rounded-sm transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navlink;
