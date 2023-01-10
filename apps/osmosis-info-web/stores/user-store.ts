import { observable, action, makeObservable } from "mobx";

export class UserStore {
	@observable
	private _name: string;

	@observable
	private _address: string;

	constructor() {
		this._name = "";
		this._address = "";
		makeObservable(this);
	}

	public get name(): string {
		return this._name;
	}

	@action
	public setName = (name: string): void => {
		this._name = name;
	};

	public get address(): string {
		return this._address;
	}
	@action
	public setAddress = (address: string): void => {
		this._address = address;
	};
}
