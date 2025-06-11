// RouteFlow London PWA - Folder Structure Proposal

// Root
/frontend         # React + Tailwind PWA frontend
/backend          # Node.js/Express API service layer
/shared           # Shared types/models (already present)

// Frontend
/frontend/src/
  components/     # Reusable UI components (Map, SearchBar, BusCard, etc.)
  pages/          # Route-based pages (Home, BusProfile, Favorites, etc.)
  hooks/          # Custom React hooks (useBusData, useAuth, etc.)
  utils/          # Utility functions (formatting, geolocation, etc.)
  context/        # React context providers (Theme, Auth, etc.)
  assets/         # Static assets (icons, images)
  styles/         # Tailwind config, global styles
  service/        # API service wrappers (TfL, backend, Firebase)
  App.tsx
  index.tsx

// Backend
/backend/src/
  api/            # Express route handlers (stop, vehicle, line, alerts)
  services/       # TfL API wrappers, rate-limited fetch logic
  middleware/     # Auth, rate limiting, error handling
  utils/          # Helper functions (caching, logging)
  config/         # API keys, environment config
  models/         # Data models (BusFleetVehicle, User, etc.)
  index.ts        # Express app entry point

// Shared
/shared/          # Shared TypeScript types/interfaces

// Firebase config at root or /frontend as needed

// .env files for secrets (never commit to git)
