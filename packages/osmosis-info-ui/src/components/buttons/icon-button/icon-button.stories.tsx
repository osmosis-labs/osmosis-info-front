import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { IconButton } from "./icon-button";
import { SettingsSvg } from "../../svg";

export default {
	title: "Components/Inputs/Buttons/IconButton",
	component: IconButton,
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;
Template.args = {};

export const Default = Template.bind({});
Default.args = {
	Icon: SettingsSvg,
};

Default.storyName = "IconButton";
