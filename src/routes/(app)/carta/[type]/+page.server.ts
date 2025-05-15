import { db } from '$lib/server/db';
import { Cache } from '$lib/server/cache';
import type { Menu, MenuAssign, MenuFront, Plate } from '$types/menu';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { type } = params as { type: 'pranzo' | 'cena' };

	let assignmentData: MenuAssign[] = [];
	let menusData: Menu[] = [];
	let platesData: Plate[] = [];

	const cacheMenu = Cache.get<{
		menu: { assignmentData: MenuAssign[]; menusData: Menu[]; platesData: Plate[] };
	}>('menu');

	if (cacheMenu?.menu) {
		console.log('menu from cache');
		assignmentData = cacheMenu.menu.assignmentData;
		menusData = cacheMenu.menu.menusData;
		platesData = cacheMenu.menu.platesData;
	} else {
    console.log('menu from db')
		const [assignment, menus, plates] = await Promise.all([
			db.collection('menus-assignment').get(),
			db.collection('menus').get(),
			db.collection('plates').get()
		]);

		assignment.forEach((doc) => assignmentData.push({ id: doc.id, ...doc.data() } as MenuAssign));
		menus.forEach((doc) => menusData.push({ id: doc.id, ...doc.data() } as Menu));
		plates.forEach((doc) => platesData.push({ id: doc.id, ...doc.data() } as Plate));

		Cache.set('menu', { menu: { assignmentData, menusData, platesData } });
	}

	const menu = menusData.find((el) => el.id === assignmentData[0][type]);

	if (menu) {
		const data: MenuFront = {
			nome: menu.nome,
			antipasti: menu.antipasti.map((plate) => platesData.find((el) => el.id === plate)),
			primi: menu.primi.map((plate) => platesData.find((el) => el.id === plate)),
			secondi: menu.secondi.map((plate) => platesData.find((el) => el.id === plate)),
			dolci: menu.dolci.map((plate) => platesData.find((el) => el.id === plate))
		};
		return { menu: data };
	}
	return {};
}) satisfies PageServerLoad;
