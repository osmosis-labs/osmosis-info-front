import { Storage } from "../helpers/storage";
import { MenuStore } from "./app/menu-store";
import { DEFAULT_LANGUAGE, LanguageSetting } from "./app/settings-store/language";
import { SettingsStore } from "./app/settings-store/settings-store";
import { UserStore } from "./user-store";

export class RootStore {
	public readonly menuStore: MenuStore;
	public readonly settingsStore: SettingsStore;
	public readonly userStore: UserStore;

	constructor() {
		this.menuStore = new MenuStore();
		this.settingsStore = new SettingsStore(new Storage("settings"), [new LanguageSetting(DEFAULT_LANGUAGE.value)]);
		this.userStore = new UserStore();
	}
}
