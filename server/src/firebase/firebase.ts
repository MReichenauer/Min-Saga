import admin from "firebase-admin";
import { ServiceAccount } from "firebase-admin";
import serviceAccount from "./serviceAccount";
import dotenv from "dotenv";

dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const bucket = admin.storage().bucket();
const firestore = admin.firestore();

export { bucket, firestore };
