import type { Vino } from '$types/cartaVini';
import type { Menu, MenuAssign, Plate } from '$types/menu';

export class Backend {
	static getWine: () => Promise<Vino[]> = async () => {
		const response = await (await fetch('/admin/api/carta-vini')).json();
		return response;
	};
	static getPlate: () => Promise<Plate[]> = async () => {
		const response = await (await fetch('/admin/api/plates')).json();
		return response;
	};
	static getMenu: () => Promise<Menu[]> = async () => {
		const response = await (await fetch('/admin/api/menus')).json();
		return response;
	};
	static getMenuAssignment: () => Promise<MenuAssign> = async () => {
		const response = await (await fetch('/admin/api/menus-assignment')).json();
		return response;
	};
	static addWine: (data: Vino) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/carta-vini', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
	static updateWine: (data: Vino) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/carta-vini', {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
	static addPlate: (data: Plate) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/plates', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
	static updatePlate: (data: Plate) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/plates', {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
	static addMenu: (data: Menu) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/menus', {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
	static updateMenu: (data: Menu) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/menus', {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
	static updateMenuAssignment: (data: MenuAssign) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/menus-assignment', {
			method: 'PATCH',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json'
			}
		});
		return response.status;
	};
}
