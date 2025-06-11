import express from 'express';
import { db } from '../services/firebaseAdmin';
import { authenticateFirebaseToken } from '../middleware/authenticateFirebaseToken';

const router = express.Router();

// GET /api/user/favorites - Get user's favorite buses/routes
router.get('/favorites', authenticateFirebaseToken, async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    const doc = await db.collection('userData').doc(userId).get();
    res.json(doc.exists ? doc.data().favorites || {} : {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/user/favorites - Add or update favorites
router.post('/favorites', authenticateFirebaseToken, async (req, res) => {
  try {
    const userId = (req as any).user.uid;
    const { favorites } = req.body;
    if (!favorites) return res.status(400).json({ error: 'Missing favorites' });
    await db.collection('userData').doc(userId).set({ favorites }, { merge: true });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
