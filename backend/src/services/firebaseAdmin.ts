// Firebase Admin SDK initialization for backend
import admin from 'firebase-admin';
import path from 'path';

// Use service account key or environment variables
const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT_PATH
  ? require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH)
  : undefined;

if (!admin.apps.length) {
  admin.initializeApp({
    credential: serviceAccount
      ? admin.credential.cert(serviceAccount)
      : admin.credential.applicationDefault(),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const db = admin.firestore();
export const auth = admin.auth();
export const storage = admin.storage();
export default admin;
