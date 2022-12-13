export class Storage {
	private _prefix: string;

	constructor(prefix: string) {
		this._prefix = prefix;
	}

	getPrefix(key: string): string {
		return `${this._prefix}_${key}`;
	}

	setItem(key: string, value: string): void {
		if (typeof window === "undefined") return;
		else window.localStorage.setItem(this.getPrefix(key), JSON.stringify(value));
	}

	getItem<T>(key: string): void | T {
		if (typeof window === "undefined") return "" as T;
		const item = window.localStorage.getItem(this.getPrefix(key));
		return item ? (JSON.parse(item) as T) : ("" as T);
	}
}
