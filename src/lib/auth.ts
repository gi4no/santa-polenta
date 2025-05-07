import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { writable } from 'svelte/store';

const logged = writable<boolean>(false);
const firebaseConfig = {
	apiKey: 'AIzaSyAccQ-eF2IqKqy7731Z_7M5nrtvycFS1WU',
	authDomain: 'santa-polenta.firebaseapp.com',
	projectId: 'santa-polenta',
	storageBucket: 'santa-polenta.firebasestorage.app',
	messagingSenderId: '525310652303',
	appId: '1:525310652303:web:d4c76771b66934761565fa'
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
	if (browser) {
		if (user) {
			// User is signed in, see docs for a list of available properties
			// https://firebase.google.com/docs/reference/js/auth.user
			const uid = user.uid;
			console.log(uid);
			goto('/admin');
			logged.set(true);
			// ...
		} else {
			goto('/admin/login');
			logged.set(false);
		}
	}
});

export { auth, logged };
