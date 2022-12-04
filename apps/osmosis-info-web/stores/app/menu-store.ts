import { observable, action, makeObservable } from "mobx";

export class MenuStore {
	@observable
	private _open: boolean;

	constructor() {
		this._open = true;
		makeObservable(this);
	}

	public get open(): boolean {
		return this._open;
	}

	@action
	public toggle = (): void => {
		this._open = !this._open;
	};
}
