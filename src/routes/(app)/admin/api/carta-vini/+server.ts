import { db } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { Vino } from '$types/cartaVini';

export const GET: RequestHandler = async () => {
	const snapshot = await db.collection('carta-vini').get();
	const data: Vino[] = [];
	snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Vino));
	return json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const { id, ...data }: Vino = await request.json();
	console.log(`Add ${id}`);
	const docRef = db.collection('carta-vini').doc();
	await docRef.set(data);
	return new Response(null, { status: 204 });
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { id, ...data }: Vino = await request.json();
	const docRef = db.collection('carta-vini').doc(id);
	await docRef.update(data);
	return new Response(null, { status: 204 });
};
