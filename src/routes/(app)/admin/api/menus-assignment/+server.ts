import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { MenuAssign } from '$types/menu';
import { Cache } from '$lib/server/cache';

export const GET: RequestHandler = async () => {
	const snapshot = await db.collection('menus-assignment').get();
	const data: MenuAssign[] = [];
	snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as MenuAssign));
	return json(data[0]);
};

export const POST: RequestHandler = async ({ request }) => {
	const { id, ...data }: MenuAssign = await request.json();
	console.log(`Add ${id}`);
	const docRef = db.collection('menus-assignment').doc();
	await docRef.set(data);
	Cache.del('menu');
	return new Response(null, { status: 204 });
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { id, ...data }: MenuAssign = await request.json();
	const docRef = db.collection('menus-assignment').doc(id);
	await docRef.update(data);
	Cache.del('menu');
	return new Response(null, { status: 204 });
};
