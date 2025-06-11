// TfL API fetch utility with rate limiting and API key management
import fetch from 'node-fetch';

const TFL_API_BASE = 'https://api.tfl.gov.uk';
const TFL_API_KEY = process.env.TFL_API_KEY; // Store in .env

// Simple in-memory rate limiter (expand as needed)
const rateLimit = {
  lastCall: 0,
  minInterval: 250, // ms between calls (adjust for your rate limits)
};

export async function tflFetch(endpoint: string, params: Record<string, string> = {}) {
  // Rate limiting
  const now = Date.now();
  if (now - rateLimit.lastCall < rateLimit.minInterval) {
    await new Promise(res => setTimeout(res, rateLimit.minInterval - (now - rateLimit.lastCall)));
  }
  rateLimit.lastCall = Date.now();

  // Build query string
  const url = new URL(TFL_API_BASE + endpoint);
  Object.entries(params).forEach(([k, v]) => url.searchParams.append(k, v));
  if (TFL_API_KEY) url.searchParams.append('app_key', TFL_API_KEY);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`TfL API error: ${res.status}`);
  return res.json();
}
