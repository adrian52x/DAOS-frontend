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
	members: User[];
}

export interface EnsembleInPost {
	_id: string;
	name: string;
	address: string;
	zipCode: string;
	activeMembers: string;
	owner: string;
	members: User[];
}

export interface Post {
	_id: string;
	title: string;
	description: string;
	author: User;
	instrument: Instrument;
	ensemble: EnsembleInPost;
	createdAt: string;
	pendingRequests: User[];
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

export enum JoinRequestAction {
	ACCEPT = 'accept',
	REJECT = 'reject',
}

export interface UserDataUpdate {
	name?: string;
	dateOfBirth?: string | null;
	phone?: string;
	address?: string;
	zipCode?: string;
	profileText?: string;
	instruments?: Instrument[];
}

export interface EnsembleDataUpdate {
	name?: string;
	address?: string;
	zipCode?: string;
	activeMembers?: string;
	members?: string[];
}
