import express from 'express';
import { tflFetch } from '../services/tflFetch';

const router = express.Router();

// /api/line/:id/route
router.get('/:id/route', async (req, res) => {
  try {
    const { id } = req.params;
    const data = await tflFetch(`/Line/${id}/Route/Sequence`, { direction: req.query.direction as string || 'inbound' });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
