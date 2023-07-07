import { CloseSvg, SearchSVG } from "@latouche/osmosis-info-ui";
import React, { forwardRef, RefObject, ChangeEvent, InputHTMLAttributes, useState } from "react";
import { useTranslation } from "react-multi-lang";

export interface InputSearchProps extends InputHTMLAttributes<HTMLInputElement> {
	onClear: () => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	value: string;
	ref?: RefObject<HTMLInputElement>;
}

export const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(({ onClear, onChange, value }, ref) => {
	const t = useTranslation();

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		onChange(event);
	};

	const onClearInput = () => {
		onClear();
	};

	return (
		<div className="rounded-t-xl bg-osmosverse-800 px-4 h-[45px] w-full flex items-center border-b-[1px] border-osmosverse-700 py-7">
			<SearchSVG className="stroke-osmosverse-300 mr-2 min-w-[24px]" height={22} width={24} />
			<input
				type="text"
				className="!outline-none h-full w-full py-6 min-w-[260px] bg-osmosverse-800"
				onChange={onChangeInput}
				value={value}
				placeholder={t("search.placeholder")}
				ref={ref}
			/>
			<div className="flex justify-end items-center">
				<span className="ml-16 text-osmosverse-500 bg-osmosverse-900 rounded-lg px-2 py-1 text-sm">
					{t("search.shortcutClose")}
				</span>

				<span
					className="bg-osmosverse-700  rounded-full flex items-center justify-center ml-2 h-6 w-6  transition-colors duration-default
                hover:bg-osmosverse-500 cursor-pointer [&>svg]:hover:stroke-white-50 [&>svg]:stroke-osmosverse-400 [&>svg]:transition-colors
                "
					onClick={onClearInput}
				>
					<CloseSvg width={16} height={16} />
				</span>
			</div>
		</div>
	);
});

InputSearch.displayName = "InputSearch";
