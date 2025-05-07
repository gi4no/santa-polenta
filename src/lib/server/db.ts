import firebase from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './service-account.json';

if (import.meta.env.MODE === 'development') {
	firebase.initializeApp({
		credential: cert(serviceAccount as unknown as string)
	});
} else {
	firebase.initializeApp();
}

export const db = getFirestore();
