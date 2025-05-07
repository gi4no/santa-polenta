import type { Vino } from '$types/cartaVini';

export class Backend {
	static getWine: () => Promise<Vino[]> = async () => {
		const response = await (await fetch('/admin/api/carta-vini')).json();
		return response;
	};
	static addWine: (data: Vino) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/carta-vini', {
			method: 'POST',
			body: JSON.stringify(data)
		});
		return response.status;
	};
	static updateWine: (data: Vino) => Promise<number> = async (data) => {
		const response = await fetch('/admin/api/carta-vini', {
			method: 'PATCH',
			body: JSON.stringify(data)
		});
		return response.status;
	};
}
