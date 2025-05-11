export type Plate = {
	id: string;
	nome: string;
	allergeni: string;
	prezzo: number;
};

export type Menu = {
	id: string;
	nome: string;
	antipasti: string[];
	primi: string[];
	secondi: string[];
	dolci: string[];
};

export type MenuAssign = {
	id: string;
	pranzo: string;
	cena: string;
};

export type MenuFront = {
	nome: string;
	antipasti: (Plate | undefined)[];
	primi: (Plate | undefined)[];
	secondi: (Plate | undefined)[];
	dolci: (Plate | undefined)[];
};
