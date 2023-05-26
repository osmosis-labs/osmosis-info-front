import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Skeleton } from "./skeleton";

export default {
	title: "Components/Skeleton",
	component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => {
	return <Skeleton {...args} />;
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {
	height: 30,
	width: 260,
	color: "#e2e2e2",
	className: "",
	rounded: false,
};

Default.storyName = "Skeleton";
