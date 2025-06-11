import React from 'react';
import { FleetList } from '../components/FleetList';

export default function FleetPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-blue-700 text-white p-4 text-xl font-bold">London Bus Fleet</header>
      <FleetList />
    </main>
  );
}
