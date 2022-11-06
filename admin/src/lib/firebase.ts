import { initializeApp } from "firebase/app";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

if (process.env.NODE_ENV !== "production")
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });

setPersistence(auth, browserLocalPersistence);

export { app, auth };
