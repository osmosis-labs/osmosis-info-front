import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Input } from "./input";
import { Paper } from "../paper/paper";

export default {
	title: "Components/Inputs/Buttons/Input",
	component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => (
	<Paper style={{ padding: "48px" }}>
		<Input {...args} />
	</Paper>
);
Template.args = {};

export const Default = Template.bind({});
Default.args = {
	label: ["Label 1"],
};

Default.storyName = "Input";
