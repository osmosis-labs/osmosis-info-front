import { action, observable } from "mobx";

export interface RequestArgs {
	delayCache?: number;
}

export abstract class Request<T> {
	// delay between two requests, default is 0
	@observable protected _delayCache: number;

	// indicator if the request is in progress
	@observable protected _isLoading = false;

	// last time the request was executed
	@observable protected _lastCall = 0;

	// the error if the request failed
	@observable protected _error: string | undefined;

	constructor({ delayCache }: RequestArgs) {
		this._delayCache = delayCache || 0;
	}

	abstract format(promiseResult: T): void;

	@action
	protected async sendRequest(request: () => Promise<T>) {
		if (this._isLoading) return;
		if (Date.now() - this._lastCall <= this._delayCache) return;
		this._lastCall = Date.now();
		this._isLoading = true;
		try {
			const result: T = await request();
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

	public get error(): string | undefined {
		return this._error;
	}
}
