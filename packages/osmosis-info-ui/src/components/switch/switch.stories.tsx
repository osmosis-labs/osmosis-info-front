import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Switch } from "./switch";

export default {
	title: "Components/Inputs/Switch",
	component: Switch,
} as ComponentMeta<typeof Switch>;

const Template: ComponentStory<typeof Switch> = (args) => {
	const [value, setValue] = useState(true);

	const onChange = (value: boolean) => setValue(value);
	return (
		<div>
			<Switch {...args} value={value} onChange={onChange} />
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};

Default.storyName = "Switch";
