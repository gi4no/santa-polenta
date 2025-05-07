import { db } from '$lib/server/db';
import type { Vino } from '$types/cartaVini';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const { order, dir } = Object.fromEntries(new URLSearchParams(url.searchParams).entries());
	const snapshot = await db
		.collection('carta-vini')
		.where('disabled', '==', false)
		.orderBy(order || 'nome', (dir as 'asc' | 'desc') || 'asc')
		.get();
	const data: Vino[] = [];
	snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Vino));
	return { wines: data };
}) satisfies PageServerLoad;
