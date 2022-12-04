import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "./button";

export default {
	title: "Components/Inputs/Buttons/Button",
	component: Button,
	parameters: {
		docs: {
			description: {
				component: "Button is used to catch user action.",
			},
		},
	},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => {
	const onClick = () => undefined;
	return (
		<div>
			<div className="grid grid-cols-6 items-center justify-items-center">
				<Button onClick={onClick}>Default</Button>
				<Button onClick={onClick} size="small">
					Small
				</Button>
				<Button onClick={onClick} variant="secondary">
					Secondary
				</Button>
				<Button onClick={onClick} variant="warning">
					Warning
				</Button>
				<Button onClick={onClick} disabled={true} variant="secondary">
					Secondary disabled
				</Button>
				<Button onClick={onClick} disabled={true}>
					Disabled
				</Button>
			</div>
			<div className="flex items-center justify-center m-2 p-4">
				<Button {...args}>{args.children}</Button>
			</div>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = { children: "Button" };
Default.storyName = "Button";
