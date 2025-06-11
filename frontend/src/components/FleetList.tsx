import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchBusFleet, getBusProfile, searchBusFleet } from '../service/fleetApi';
import { BusFleetVehicle } from '../../../shared/busFleetVehicle';

export function FleetList() {
  const [buses, setBuses] = useState<BusFleetVehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    fetchBusFleet().then(setBuses).finally(() => setLoading(false));
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (search.trim()) {
      setBuses(await searchBusFleet(search));
    } else {
      setBuses(await fetchBusFleet());
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          className="border rounded px-2 py-1 flex-1"
          placeholder="Search by registration..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded" type="submit">Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul className="grid gap-2">
          {buses.map(bus => (
            <li key={bus.reg} className="border rounded p-2 bg-white shadow">
              <Link to={`/bus/${bus.reg}`} className="font-bold text-blue-700 underline">
                {bus.reg} ({bus.fleetNo})
              </Link>
              <div>{bus.model} - {bus.operator}</div>
              <div>Status: {bus.status}</div>
              <div>Last seen: {bus.lastSeen}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
