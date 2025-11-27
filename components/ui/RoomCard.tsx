'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Room } from '@/lib/types';
import { formatPrice } from '@/lib/data';
import { FaUser, FaBed, FaRulerCombined, FaStar } from 'react-icons/fa';
import Button from './Button';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      <div className="relative h-56 w-full">
        <Image
          src={room.images[0]}
          alt={room.name}
          fill
          className="object-cover"
        />
        {!room.availability && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-md font-semibold">
              Not Available
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full shadow-md">
          <span className="text-sm font-bold text-red-500 capitalize">
            {room.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{room.name}</h3>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center text-yellow-400">
            <FaStar />
            <span className="ml-1 text-sm font-semibold text-gray-700">
              {room.rating}
            </span>
          </div>
          <span className="text-sm text-gray-500">
            ({room.reviews} reviews)
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {room.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FaUser className="text-red-700" />
            <span>
              {room.capacity} guest{room.capacity > 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <FaBed className="text-red-700" />
            <span>{room.bedType}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaRulerCombined className="text-red-700" />
            <span>{room.size}m²</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600"
            >
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="text-xs text-gray-500">
              +{room.amenities.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-red-500">
              {formatPrice(room.price)}
            </span>
            <span className="text-sm text-gray-500"> /night</span>
          </div>
          <Button
            size="sm"
            disabled={!room.availability}
            className="btn-3d"
            onClick={() => (window.location.href = `/room/${room.id}`)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
