import { config } from 'dotenv';
import { initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import admin from 'firebase-admin';
import { getStorage } from "firebase-admin/storage"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const credentialsPath = join(__dirname, 'credentials.json');


initializeApp({
  credential: admin.credential.cert(credentialsPath),
});

const db = getFirestore();
export { db }
