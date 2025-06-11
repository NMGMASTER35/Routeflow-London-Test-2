// Express API service layer for RouteFlow London (scaffold)
import express from 'express';
import stopRoutes from './api/stop';
import vehicleRoutes from './api/vehicle';
import lineRoutes from './api/line';
import alertRoutes from './api/alerts';
import fleetRoutes from './api/fleet';
import userRoutes from './api/user';
import favoritesRoutes from './api/favorites';
import { errorHandler } from './middleware/errorHandler';

const app = express();
app.use(express.json());

// API route mounts
app.use('/api/stop', stopRoutes);
app.use('/api/vehicle', vehicleRoutes);
app.use('/api/line', lineRoutes);
app.use('/api/alerts', alertRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/api/user', userRoutes);
app.use('/api/favorites', favoritesRoutes);

// Error handling
app.use(errorHandler);

export default app;
