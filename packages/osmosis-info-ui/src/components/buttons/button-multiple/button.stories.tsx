import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ButtonMultiple, ItemButtonMultiple } from "./button-multiple";
import { Paper } from "../../paper/paper";

export default {
	title: "Components/Inputs/Buttons/ButtonMultiple",
	component: ButtonMultiple,
	parameters: {},
} as ComponentMeta<typeof ButtonMultiple>;

const items = [
	{ value: 1, label: "Label n° 1" },
	{ value: 2, label: "Label n° 2" },
	{ value: 3, label: "Label n° 3" },
];

const Template: ComponentStory<typeof ButtonMultiple> = (args) => {
	const [currentItem, setCurrentItem] = React.useState<ItemButtonMultiple<any>>(items[1]);

	const onClick = (item: any) => {
		setCurrentItem(item);
	};
	return (
		<Paper>
			<div className="p-8">
				<ButtonMultiple items={items} selected={currentItem} onClick={onClick} />
			</div>
		</Paper>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = "ButtonMultiple";
