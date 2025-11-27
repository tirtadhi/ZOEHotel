import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Online Booking Application';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #fb923c, #f97316)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 'bold' }}>🏨</div>
        <div style={{ marginTop: 20, fontWeight: 'bold' }}>Online Booking</div>
        <div style={{ fontSize: 48, marginTop: 10 }}>
          Your Perfect Stay Awaits
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
