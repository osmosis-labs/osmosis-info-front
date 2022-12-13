import { ISetting } from "./settings-store";
import { observable, makeObservable, action } from "mobx";
import { SVGProps } from "react";
import { EnglishSvg, FrenchSvg } from "@latouche/osmosis-info-ui";

export type Language = { value: string; display: string; Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element };
export const SUPPORTED_LANGUAGES: Language[] = [
	{ value: "en", display: "English", Icon: EnglishSvg },
	{ value: "fr", display: "Français", Icon: FrenchSvg },
];
export type LanguageState = { value: string };

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES[0];

export const getLanguage = (value: string): Language | undefined => {
	return SUPPORTED_LANGUAGES.find((language: Language) => language.value === value);
};

export class LanguageSetting implements ISetting<LanguageState> {
	readonly id = "language";

	@observable
	protected _state: LanguageState;

	constructor(defaultLanguage: string) {
		this._state = { value: defaultLanguage };
		makeObservable(this);
	}

	get state() {
		return this._state;
	}

	@action
	setState(state: LanguageState) {
		this._state = state;
	}
}
