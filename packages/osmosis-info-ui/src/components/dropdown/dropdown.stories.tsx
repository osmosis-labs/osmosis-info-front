import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dropdown, ItemDropdown } from "./dropdown";
import { EnglishSvg, FrenchSvg } from "../svg";

export default {
	title: "Components/Inputs/Dropdown",
	component: Dropdown,
} as ComponentMeta<typeof Dropdown>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Template: ComponentStory<typeof Dropdown> = (_args) => {
	const [value, setValue] = useState<string>("fr");
	const items = [
		{ value: "fr", display: "Français" } as ItemDropdown<string>,
		{ value: "end", display: "English" } as ItemDropdown<string>,
	];
	const itemsIcons = [
		{ value: "fr", display: "Français", Icon: FrenchSvg } as ItemDropdown<string>,
		{ value: "end", display: "English", Icon: EnglishSvg } as ItemDropdown<string>,
	];

	const onChange = (item: ItemDropdown<string>) => {
		setValue(item.value);
	};
	return (
		<div>
			<div className="grid grid-cols-6 items-center justify-items-center">
				<div className="grid grid-rows-2 items-center justify-items-center">
					<p>Default</p>
					<Dropdown<string> value={value} onChange={onChange} items={items} />
				</div>
				<div className="grid grid-rows-2 items-center justify-items-center">
					<p>Small</p>
					<Dropdown<string> value={value} onChange={onChange} items={items} size="small" />
				</div>
				<div className="grid grid-rows-2 items-center justify-items-center">
					<p>Default Icon</p>
					<Dropdown<string> value={value} onChange={onChange} items={itemsIcons} variant="icon" />
				</div>
				<div className="grid grid-rows-2 items-center justify-items-center">
					<p>Icon small</p>
					<Dropdown<string> value={value} onChange={onChange} items={itemsIcons} variant="icon" size="small" />
				</div>
				<div className="grid grid-rows-2 items-center justify-items-center">
					<p>Default disabled</p>
					<Dropdown<string> value={value} onChange={onChange} items={items} disabled={true} />
				</div>
				<div className="grid grid-rows-2 items-center justify-items-center">
					<p>Default icon disabled</p>
					<Dropdown<string> value={value} onChange={onChange} items={itemsIcons} variant="icon" disabled={true} />
				</div>
			</div>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Dropdown";
