export class Todo {
	constructor(
		public id: number,
		public task: String,
		public category: String,
		public done: boolean,
		public userid: number
	) {}
}

export class TodoDto {
	constructor(
		public task: String,
		public category: String,
		public done: boolean,
		public userid: number
	) {}
}
