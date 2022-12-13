import { autorun, observable, toJS, makeObservable } from "mobx";
import { Storage } from "../../../helpers/storage";

export interface ISetting<TState = any> {
	readonly id: string;
	readonly state: TState;
	setState: (newState: TState) => void;
}

export class SettingsStore {
	@observable
	private _settings: ISetting[];
	private _storage: Storage;

	constructor(storage: Storage, defaultSettings: ISetting[]) {
		this._settings = defaultSettings;
		this._storage = storage;
		makeObservable(this);

		// Get settings from storage
		this._settings.forEach((setting) => {
			const id = setting.id;
			const value = this._storage.getItem<unknown>(id);
			if (!value) return;
			setting.setState(value);
		});

		// Auto update when setting changes
		autorun(() => {
			this._settings.forEach((setting) => {
				const id = setting.id;
				const state = toJS(setting.state);
				this._storage.setItem(id, state);
			});
		});
	}

	get settings(): ISetting[] {
		return this._settings;
	}

	getSettingById = (id: string) => {
		return this._settings.find(({ id: settingId }) => settingId === id);
	};
}
