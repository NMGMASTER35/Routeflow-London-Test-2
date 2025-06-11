import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBusProfile } from '../service/fleetApi';
import { BusFleetVehicle } from '../../../shared/busFleetVehicle';

export default function BusProfilePage() {
  const { reg } = useParams<{ reg: string }>();
  const [bus, setBus] = useState<BusFleetVehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (reg) {
      setLoading(true);
      getBusProfile(reg)
        .then(setBus)
        .finally(() => setLoading(false));
    }
  }, [reg]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!bus) return <div className="p-4">Bus not found.</div>;

  return (
    <div className="p-4 max-w-xl mx-auto">
      <Link to="/" className="text-blue-600 underline">&larr; Back to Fleet</Link>
      <h1 className="text-2xl font-bold mt-2 mb-4">{bus.reg} ({bus.fleetNo})</h1>
      <div className="mb-2">Model: {bus.model}</div>
      <div className="mb-2">Operator: {bus.operator}</div>
      <div className="mb-2">Garage: {bus.garage}</div>
      <div className="mb-2">Fuel Type: {bus.fuelType}</div>
      <div className="mb-2">Status: {bus.status}</div>
      <div className="mb-2">Current Route: {bus.currentRoute || 'N/A'}</div>
      <div className="mb-2">Last Seen: {bus.lastSeen}</div>
      <div className="mb-2">Achievements: {bus.achievements?.join(', ') || 'None'}</div>
      <div className="mb-4">
        <h2 className="font-semibold">Photo Gallery</h2>
        <div className="flex gap-2 flex-wrap">
          {bus.photoGallery?.length ? bus.photoGallery.map((url, i) => (
            <img key={i} src={url} alt="Bus" className="w-24 h-16 object-cover rounded border" />
          )) : <span>No photos yet.</span>}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">User Notes</h2>
        <ul className="list-disc pl-5">
          {bus.userNotes?.length ? bus.userNotes.map((note, i) => (
            <li key={i} className="mb-1 text-sm">{note.note} <span className="text-gray-500">({note.userId}, {note.timestamp})</span></li>
          )) : <li>No notes yet.</li>}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="font-semibold">Route History</h2>
        <ul className="list-disc pl-5">
          {bus.routeHistory?.length ? bus.routeHistory.map((r, i) => (
            <li key={i} className="mb-1 text-sm">{r.routeId}: {r.from} - {r.to || 'present'}</li>
          )) : <li>No route history.</li>}
        </ul>
      </div>
    </div>
  );
}
