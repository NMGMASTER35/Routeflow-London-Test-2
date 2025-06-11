import express from 'express';
import { tflFetch } from '../services/tflFetch';

const router = express.Router();

// /api/vehicle/:reg
router.get('/:reg', async (req, res) => {
  try {
    // Placeholder: TfL API does not provide direct vehicle lookup by reg, but you can cross-reference from arrivals
    // This endpoint will be implemented with custom logic and fleet DB
    res.status(501).json({ error: 'Not implemented: vehicle lookup by reg' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
