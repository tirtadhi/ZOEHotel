import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import Navbar from '@/components/navbar/navbar';
import SplashScreen from '@/components/SplashScreen';
import { AuthProvider } from '@/contexts/AuthContext';
import './globals.css';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'ZOË Hotel - Your Perfect Stay',
  description:
    'Book your perfect accommodation with ease. Browse rooms, check availability, and reserve your stay online.',
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} antialiased`}>
        <SplashScreen />
        <AuthProvider>
          <Navbar />
          <main className="bg-gray-50 min-h-screen pt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
