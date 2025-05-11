import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Plate } from '$types/menu';

export const GET: RequestHandler = async () => {
	const snapshot = await db.collection('plates').get();
	const data: Plate[] = [];
	snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Plate));
	return json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const { id, ...data }: Plate = await request.json();
	console.log(`Add ${id}`);
	const docRef = db.collection('plates').doc();
	await docRef.set(data);
	return new Response(null, { status: 204 });
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { id, ...data }: Plate = await request.json();
	const docRef = db.collection('plates').doc(id);
	await docRef.update(data);
	return new Response(null, { status: 204 });
};
