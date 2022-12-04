import { MenuStore } from "./app/menu-store";

export class RootStore {
	public readonly menuStore: MenuStore;

	constructor() {
		this.menuStore = new MenuStore();
	}
}
