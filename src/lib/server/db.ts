import firebase from 'firebase-admin';
import { cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (import.meta.env.MODE === 'development') {
	firebase.initializeApp({
		credential: cert('config/service-account.json')
	});
} else {
	firebase.initializeApp();
}

export const db = getFirestore();
