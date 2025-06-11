import { db } from "../services/firebaseAdmin";
import { BusFleetVehicle } from "../../../shared/busFleetVehicle";

// Add or update a bus profile
export async function upsertBusProfile(bus: BusFleetVehicle) {
  await db.collection("busFleet").doc(bus.reg).set(bus, { merge: true });
}

// Fetch a bus profile by reg
export async function getBusProfile(reg: string): Promise<BusFleetVehicle | null> {
  const doc = await db.collection("busFleet").doc(reg).get();
  return doc.exists ? (doc.data() as BusFleetVehicle) : null;
}
