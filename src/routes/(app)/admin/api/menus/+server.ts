import { db } from '$lib/server/db';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { Menu, MenuAssign } from '$types/menu';
import { Cache } from '$lib/server/cache';

export const GET: RequestHandler = async () => {
	const snapshot = await db.collection('menus').get();
	const data: Menu[] = [];
	snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Menu));
	return json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const { id, ...data }: Menu = await request.json();
	console.log(`Add ${id}`);
	const docRef = db.collection('menus').doc();
	await docRef.set(data);
	Cache.del('menu');
	return new Response(null, { status: 204 });
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { id, ...data }: Menu = await request.json();
	const docRef = db.collection('menus').doc(id);
	await docRef.update(data);
	Cache.del('menu');
	return new Response(null, { status: 204 });
};

export const PUT: RequestHandler = async ({ request }) => {
	const { id, ...data }: MenuAssign = await request.json();
	const docRef = db.collection('menus-assignment').doc(id);
	await docRef.update(data);
	Cache.del('menu');
	return new Response(null, { status: 204 });
};
