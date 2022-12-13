import { useEffect } from "react";
import { setLanguage } from "react-multi-lang";
import { useStore } from "../stores";
import { DEFAULT_LANGUAGE } from "../stores/app/settings-store/language";

export const useLanguage = () => {
	const { settingsStore } = useStore();

	const language = settingsStore.getSettingById("language")?.state.value;

	useEffect(() => {
		if (language) {
			const load = async () => {
				setLanguage(language);
			};
			load();
		}
	}, [language]);
	return language ?? DEFAULT_LANGUAGE.value;
};
