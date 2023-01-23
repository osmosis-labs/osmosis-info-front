import { action, observable } from "mobx";

export interface RequestArgs<D> {
	delayCache?: number;
	defaultData: D;
}

export abstract class Request<D, T> {
	// delay between two requests, default is 0
	@observable protected _delayCache: number;

	// indicator if the request is in progress
	@observable protected _isLoading = false;

	// last time the request was executed
	@observable protected _lastCall = 0;

	// the error if the request failed
	@observable protected _error: string | undefined;

	@observable protected _data: D;

	constructor({ delayCache, defaultData }: RequestArgs<D>) {
		this._delayCache = delayCache || 0;
		this._data = defaultData;
	}

	abstract format(promiseResult: T): void;

	@action
	protected async sendRequest(request: Promise<T>) {
		if (this._isLoading) return;
		if (Date.now() - this._lastCall <= this._delayCache) return;
		this._lastCall = Date.now();
		this._isLoading = true;
		try {
			const result: T = await request; //axios({ ...options });
			this.format(result);
			this._isLoading = false;
		} catch (error) {
			let message = "Unknown Error";
			if (error instanceof Error) message = error.message;
			this._error = message;
		}
	}

	public get isLoading(): boolean {
		return this._isLoading;
	}

	public get data(): D {
		return this._data;
	}
	public get error(): string | undefined {
		return this._error;
	}
}
