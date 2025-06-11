import express from 'express';
import { tflFetch } from '../services/tflFetch';

const router = express.Router();

// /api/stop/search?query=...
router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: 'Missing query' });
    const data = await tflFetch('/StopPoint/Search', { query: String(query) });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// /api/stop/:id/arrivals
router.get('/:id/arrivals', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tflFetch(`/StopPoint/${id}/Arrivals`);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
