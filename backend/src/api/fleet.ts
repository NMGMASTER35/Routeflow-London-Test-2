import express from 'express';
import { db } from '../services/firebaseAdmin';
import { BusFleetVehicle } from '../../../shared/busFleetVehicle';
import admin from "firebase-admin";
import { getBusProfile, upsertBusProfile } from "../services/busFleetService";

const router = express.Router();

// GET /api/fleet/:reg - Fetch a bus profile by reg
router.get('/:reg', async (req: any, res: any) => {
  const bus = await getBusProfile(req.params.reg);
  if (!bus) return res.status(404).json({ error: "Bus not found" });
  res.json(bus);
});

// POST /api/fleet - Add or update a bus profile
router.post('/', async (req: any, res: any) => {
  try {
    await upsertBusProfile(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to upsert bus profile" });
  }
});

// POST /api/fleet/:reg/note - Add a user note to a bus profile
router.post('/:reg/note', async (req: any, res: any) => {
  const { reg } = req.params;
  const { userId, note } = req.body;
  if (!userId || !note) return res.status(400).json({ error: "Missing userId or note" });
  try {
    const docRef = db.collection("busFleet").doc(reg);
    await docRef.update({
      userNotes: admin.firestore.FieldValue.arrayUnion({
        userId,
        note,
        timestamp: new Date().toISOString(),
      })
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add note" });
  }
});

// POST /api/fleet/:reg/photo - Add a photo URL to a bus profile (photo upload handled by frontend to Firebase Storage)
router.post('/:reg/photo', async (req: any, res: any) => {
  const { reg } = req.params;
  const { photoUrl } = req.body;
  if (!photoUrl) return res.status(400).json({ error: "Missing photoUrl" });
  try {
    const docRef = db.collection("busFleet").doc(reg);
    await docRef.update({
      photoGallery: admin.firestore.FieldValue.arrayUnion(photoUrl)
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add photo" });
  }
});

// GET /api/fleet - List all bus profiles (optionally filter by status, operator, or model)
router.get('/', async (req: any, res: any) => {
  try {
    const { status, operator, model } = req.query;
    let query = db.collection("busFleet") as any;
    if (status) query = query.where("status", "==", status);
    if (operator) query = query.where("operator", "==", operator);
    if (model) query = query.where("model", "==", model);
    const snapshot = await query.get();
    const buses = snapshot.docs.map((doc: any) => doc.data());
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: "Failed to list bus profiles" });
  }
});

// GET /api/fleet/search?reg=... - Search for a bus by registration (fuzzy, case-insensitive)
router.get('/search', async (req: any, res: any) => {
  const { reg } = req.query;
  if (!reg) return res.status(400).json({ error: 'Missing reg query param' });
  try {
    const snapshot = await db.collection("busFleet").get();
    const buses = snapshot.docs
      .map((doc: any) => doc.data())
      .filter((bus: any) => bus.reg && bus.reg.toLowerCase().includes(String(reg).toLowerCase()));
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: "Failed to search bus profiles" });
  }
});

// DELETE /api/fleet/:reg - Delete a bus profile by registration
router.delete('/:reg', async (req: any, res: any) => {
  const { reg } = req.params;
  try {
    await db.collection("busFleet").doc(reg).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete bus profile" });
  }
});

export default router;
