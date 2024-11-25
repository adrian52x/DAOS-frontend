// types/Ensemble.ts
export interface Ensemble {
	_id: string;
	name: string;
	address: string;
	zipCode: string;
	activeMembers: string;
	owner: string;
	members: string[];
	pendingRequests: string[];
}

export interface EnsembleById {
	_id: string;
	name: string;
	address: string;
	zipCode: string;
	activeMembers: string;
	owner: User;
	members: string[];
	pendingRequests: string[];
}

export interface Post {
	_id: string;
	title: string;
	description: string;
	instrument: Instrument;
	ensemble: Ensemble;
}

export interface Instrument {
	name: string;
	level: number;
	genre: string;
}

export interface User {
	_id: string;
	name: string;
	email: string;
	address: string;
	zipCode: string;
	phone: string;
	instruments: Instrument[];
	profileText: string;
	createDate: string;
}
