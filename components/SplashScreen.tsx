'use client';
import { useEffect, useState } from 'react';
import { FaHotel } from 'react-icons/fa';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Check if splash has been shown in this session
    const hasShownSplash = sessionStorage.getItem('splashShown');

    if (hasShownSplash) {
      // If already shown, hide immediately
      setIsVisible(false);
      return;
    }

    // Mark splash as shown for this session
    sessionStorage.setItem('splashShown', 'true');

    // Start fade out animation after 4.5 seconds
    const fadeTimer = setTimeout(() => {
      setIsAnimating(false);
    }, 4500);

    // Hide splash completely after animation
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 5500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isMounted || !isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-9999 bg-linear-to-br from-red-900 via-red-800 to-red-950 flex items-center justify-center transition-all duration-1000 ${
        isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      <div className="text-center px-4">
        {/* Animated Logo with Glow Effect */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 blur-3xl bg-white/20 rounded-full animate-pulse-slow"></div>
          <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center mx-auto shadow-2xl transform transition-all duration-1000 animate-float">
            <FaHotel className="text-7xl text-red-800 animate-scale-in" />
          </div>
        </div>

        {/* App Name with Letter Animation */}
        <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-wider animate-slide-up">
          <span className="inline-block animate-letter-1">Z</span>
          <span className="inline-block animate-letter-2">O</span>
          <span className="inline-block animate-letter-3">Ë</span>
          <span className="inline-block animate-letter-4 mx-3"> </span>
          <span className="inline-block animate-letter-5">H</span>
          <span className="inline-block animate-letter-6">o</span>
          <span className="inline-block animate-letter-7">t</span>
          <span className="inline-block animate-letter-8">e</span>
          <span className="inline-block animate-letter-9">l</span>
        </h1>

        {/* Tagline with Shimmer */}
        <p className="text-2xl text-red-100 mb-12 animate-fade-in-up font-light tracking-wide">
          Your Perfect Stay Awaits
        </p>

        {/* Modern Loading Bar */}
        <div className="w-64 h-1.5 bg-red-950/50 rounded-full mx-auto overflow-hidden">
          <div className="h-full bg-linear-to-r from-white/50 via-white to-white/50 animate-loading-bar"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes scale-in {
          0% {
            transform: scale(0) rotate(-180deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes letter-bounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-10px) scale(1.1);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-scale-in {
          animation: scale-in 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 1s both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }

        .animate-letter-1 {
          animation: letter-bounce 0.6s ease-out 0.6s both;
        }
        .animate-letter-2 {
          animation: letter-bounce 0.6s ease-out 0.65s both;
        }
        .animate-letter-3 {
          animation: letter-bounce 0.6s ease-out 0.7s both;
        }
        .animate-letter-4 {
          animation: letter-bounce 0.6s ease-out 0.75s both;
        }
        .animate-letter-5 {
          animation: letter-bounce 0.6s ease-out 0.8s both;
        }
        .animate-letter-6 {
          animation: letter-bounce 0.6s ease-out 0.85s both;
        }
        .animate-letter-7 {
          animation: letter-bounce 0.6s ease-out 0.9s both;
        }
        .animate-letter-8 {
          animation: letter-bounce 0.6s ease-out 1s both;
        }
        .animate-letter-9 {
          animation: letter-bounce 0.6s ease-out 1.05s both;
        }
        .animate-letter-10 {
          animation: letter-bounce 0.6s ease-out 1.1s both;
        }
        .animate-letter-11 {
          animation: letter-bounce 0.6s ease-out 1.15s both;
        }
        .animate-letter-12 {
          animation: letter-bounce 0.6s ease-out 1.2s both;
        }
      `}</style>
    </div>
  );
}
