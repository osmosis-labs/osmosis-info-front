import { action, makeObservable, observable, autorun, toJS } from "mobx";
import { Storage } from "../../../helpers/storage";

const KEY_TOKENS = "tokens";
const KEY_POOLS = "pools";

export class FavoriteStore {
	private _storage: Storage;
	private _tokens: string[] = [];
	private _pools: string[] = [];

	constructor(storage: Storage) {
		this._storage = storage;
		makeObservable(this);

		const tokensStored = this._storage.getItem<string[]>(KEY_TOKENS);
		this._tokens = tokensStored ?? [];

		const poolsStored = this._storage.getItem<string[]>(KEY_POOLS);
		this._pools = poolsStored ?? [];
	}

	get tokens(): string[] {
		return this._tokens;
	}

	get pools(): string[] {
		return this._pools;
	}

	@action
	updateStorage(): void {
		const tokens = toJS(this._tokens);
		const pools = toJS(this._pools);
		this._storage.setItem(KEY_TOKENS, tokens);
		this._storage.setItem(KEY_POOLS, pools);
		console.log("%cfavorites-store.ts -> 37 BLUE: update", "background: #2196f3; color:#FFFFFF");
	}

	@action
	addToken = (token: string): void => {
		const index = this._tokens.indexOf(token);
		if (index === -1) {
			this._tokens.push(token);
			this.updateStorage();
		}
	};

	@action
	removeToken = (token: string): void => {
		const index = this._tokens.indexOf(token);
		if (index > -1) {
			this._tokens.splice(index, 1);
		}
	};

	@action
	addPool = (pool: string): void => {
		const index = this._pools.indexOf(pool);
		if (index === -1) {
			this._pools.push(pool);
		}
	};

	@action
	removePool = (pool: string): void => {
		const index = this._pools.indexOf(pool);
		if (index > -1) {
			this._pools.splice(index, 1);
			this.updateStorage();
		}
	};
}
