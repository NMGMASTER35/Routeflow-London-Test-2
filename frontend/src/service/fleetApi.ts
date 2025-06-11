import axios from 'axios';
import { BusFleetVehicle } from '../../../shared/busFleetVehicle';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:4000/api';

export async function fetchBusFleet(params?: { status?: string; operator?: string; model?: string }) {
  const res = await axios.get<BusFleetVehicle[]>(`${API_BASE}/fleet`, { params });
  return res.data;
}

export async function searchBusFleet(reg: string) {
  const res = await axios.get<BusFleetVehicle[]>(`${API_BASE}/fleet/search`, { params: { reg } });
  return res.data;
}

export async function getBusProfile(reg: string) {
  const res = await axios.get<BusFleetVehicle>(`${API_BASE}/fleet/${reg}`);
  return res.data;
}

export async function upsertBusProfile(bus: BusFleetVehicle) {
  const res = await axios.post(`${API_BASE}/fleet`, bus);
  return res.data;
}

export async function deleteBusProfile(reg: string) {
  const res = await axios.delete(`${API_BASE}/fleet/${reg}`);
  return res.data;
}

export async function addBusNote(reg: string, userId: string, note: string) {
  const res = await axios.post(`${API_BASE}/fleet/${reg}/note`, { userId, note });
  return res.data;
}

export async function addBusPhoto(reg: string, photoUrl: string) {
  const res = await axios.post(`${API_BASE}/fleet/${reg}/photo`, { photoUrl });
  return res.data;
}
