export class Storage {
	private _prefix: string;

	constructor(prefix: string) {
		this._prefix = prefix;
	}

	getPrefix(key: string): string {
		return `${this._prefix}_${key}`;
	}

	setItem(key: string, value: any): void {
		if (typeof window === "undefined") return;
		else window.localStorage.setItem(this.getPrefix(key), JSON.stringify(value));
	}

	getItem<T>(key: string): T | undefined {
		if (typeof window === "undefined") return undefined;
		const item = window.localStorage.getItem(this.getPrefix(key));
		if (!item || item === "") return undefined;
		return JSON.parse(item) as T;
	}
}
