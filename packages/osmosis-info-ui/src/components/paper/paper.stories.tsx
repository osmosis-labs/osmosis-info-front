import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Paper } from "./paper";

export default {
	title: "Components/Surfaces/Paper",
	component: Paper,
} as ComponentMeta<typeof Paper>;

const Template: ComponentStory<typeof Paper> = (args) => {
	return (
		<Paper {...args}>
			<div>
				<p className="max-w-xs text-center">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel
					veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident
					illum.
				</p>
			</div>
		</Paper>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};

Default.storyName = "Paper";
