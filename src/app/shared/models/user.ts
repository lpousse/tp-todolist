import { Address } from "./address";

export class User {
	constructor(
		public id: number,
		public name: String,
		public username: String,
		public email: String,
		public address: Address,
		public phone: String) {}
}
