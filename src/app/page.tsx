'use client';

import dynamic from 'next/dynamic';

// Load Desktop only on client to avoid SSR issues with window/document references
const Desktop = dynamic(() => import('@/components/os/Desktop'), {
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black">
      <div className="text-white text-2xl font-light animate-pulse">Loading Akal OS...</div>
    </div>
  ),
});

export default function Home() {
  return <Desktop />;
}
