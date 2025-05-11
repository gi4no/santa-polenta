import { db } from '$lib/server/db';
import type { Menu, MenuAssign, MenuFront, Plate } from '$types/menu';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const { type } = params as { type: 'pranzo' | 'cena' };
	const [assignment, menus, plates] = await Promise.all([
		db.collection('menus-assignment').get(),
		db.collection('menus').get(),
		db.collection('plates').get()
	]);
	const assignmentData: MenuAssign[] = [];
	const menusData: Menu[] = [];
	const platesData: Plate[] = [];

	assignment.forEach((doc) => assignmentData.push({ id: doc.id, ...doc.data() } as MenuAssign));
	menus.forEach((doc) => menusData.push({ id: doc.id, ...doc.data() } as Menu));
	plates.forEach((doc) => platesData.push({ id: doc.id, ...doc.data() } as Plate));

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
