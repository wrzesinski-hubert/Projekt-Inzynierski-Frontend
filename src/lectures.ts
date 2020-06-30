export interface Lecture {
	name: string;
	groups: Array<Group>;
}

export interface Group {
	id: string;
	day: string;
	time: string;
	lecturer: string;
	room: string;
}

export const lectures: Array<Lecture> = [
	{
		name: "E-gospodarka - narzędzia i bezpieczeństwo",
		groups: [
			{
				id: "1CB",
				day: "Pn",
				time: "10:00",
				lecturer: "dr inż. Michał Ren",
				room: "A2-01",
			},
			{
				id: "1XD",
				day: "Wt",
				time: "12:00",
				lecturer: "dr inż. Michał Ren",
				room: "A3-01",
			},
		],
	},
	{
		name: "Statystyka",
		groups: [
			{
				id: "2CB",
				day: "Pn",
				time: "10:00",
				lecturer: "dr inż. Michał Ren",
				room: "A2-01",
			},
			{
				id: "2XD",
				day: "Wt",
				time: "12:00",
				lecturer: "dr inż. Michał Ren",
				room: "A3-01",
			},
		],
	},
];
