import { Cache } from '$lib/server/cache';
import { db } from '$lib/server/db';
import type { Vino } from '$types/cartaVini';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const { order = 'name', dir = 'asc' } = Object.fromEntries(
		new URLSearchParams(url.searchParams).entries()
	);

	const cacheWine = Cache.get<{ wines: Vino[] }>('wines');

	if (cacheWine?.wines?.length && cacheWine?.wines?.length > 0) {
		console.log('wines from cache');
		return {
			wines: cacheWine.wines
		};
	} else {
		console.log('wines from db');
		const snapshot = await db
			.collection('wines')
			.where('disabled', '==', false)
			.orderBy(order, dir as 'asc' | 'desc')
			.get();
		const data: Vino[] = [];
		snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Vino));
		Cache.set('wines', { wines: data }, 0);
		return { wines: data };
	}
}) satisfies PageServerLoad;
