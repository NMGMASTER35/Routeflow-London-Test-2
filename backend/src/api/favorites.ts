import { Router } from "express";
import { db } from "../services/firebaseAdmin";
import admin from "firebase-admin";

const router = Router();

// GET /api/favorites/:userId - Get user's favorite buses/routes
router.get(":userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const doc = await db.collection("users").doc(userId).get();
    if (!doc.exists) return res.json({ favorites: [] });
    res.json({ favorites: doc.data()?.favorites || [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
});

// POST /api/favorites/:userId - Add a favorite bus/route
router.post(":userId", async (req, res) => {
  const { userId } = req.params;
  const { reg } = req.body;
  if (!reg) return res.status(400).json({ error: "Missing reg" });
  try {
    await db.collection("users").doc(userId).set(
      { favorites: admin.firestore.FieldValue.arrayUnion(reg) },
      { merge: true }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to add favorite" });
  }
});

export default router;
