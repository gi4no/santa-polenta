import firebase from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from './service-account.json';

firebase.initializeApp({
	credential: cert(serviceAccount as unknown as string)
});

export const db = getFirestore();
