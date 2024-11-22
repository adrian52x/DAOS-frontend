// types/Ensemble.ts
export interface Ensemble {
	id: string;
	name: string;
	area: string;
	numOfMusicians: string;
	description: string;
	instrument: string;
	createdAt: string; // Backend usually returns ISO date strings
}
