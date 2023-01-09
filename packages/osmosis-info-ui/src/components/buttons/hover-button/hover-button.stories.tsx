import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { HoverButton } from "./hover-button";

export default {
	title: "Components/Inputs/Buttons/HoverButton",
	component: HoverButton,
	parameters: {},
} as ComponentMeta<typeof HoverButton>;

const Template: ComponentStory<typeof HoverButton> = (args) => {
	return (
		<div>
			<div className="flex items-center justify-center m-2 p-4">
				<HoverButton {...args}>{args.children}</HoverButton>
			</div>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = { children: "Hello", hoverContent: "World" };
Default.storyName = "HoverButton";
