import express from 'express';
import { tflFetch } from '../services/tflFetch';

const router = express.Router();

// /api/alerts
router.get('/', async (req, res) => {
  try {
    // Fetch disruptions for all lines and stops
    const lineDisruptions = await tflFetch('/Line/Disruption');
    const stopDisruptions = await tflFetch('/StopPoint/Disruption');
    res.json({ lineDisruptions, stopDisruptions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
