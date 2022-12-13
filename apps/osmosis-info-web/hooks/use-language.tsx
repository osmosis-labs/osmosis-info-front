import dayjs from "dayjs";
import { useEffect } from "react";
import { getLanguage, setLanguage, setTranslations } from "react-multi-lang";
import { useStore } from "../stores";
import { DEFAULT_LANGUAGE } from "../stores/app/settings-store/language";

export const useLanguage = () => {
	const { settingsStore } = useStore();

	const language = settingsStore.getSettingById("language")?.state.value;

	useEffect(() => {
		if (language) {
			const load = async () => {
				// const languageData = await import(`../localizations/${language}.json`);
				// const languageDataDayJS = await import(`../localizations/dayjs-locale-${language}.js`);
				// setTranslations({
				// 	[language]: languageData,
				// });
				setLanguage(language);
				// dayjs.updateLocale(language, languageDataDayJS);
				console.log("use-language.tsx -> 14: language", language, getLanguage());
			};
			load();
		}
	}, [language]);

	console.log(
		"%cuse-language.tsx -> 26 YELLOW:  language ?? DEFAULT_LANGUAGE.value",
		"background: #fff176; color:#212121",
		language ?? DEFAULT_LANGUAGE.value
	);
	return language ?? DEFAULT_LANGUAGE.value;
};
