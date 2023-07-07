import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Backdrop } from "./backdrop";
import { Paper } from "../paper/paper";
import { Button } from "../buttons/button/button";
export default {
	title: "Components/Surfaces/Backdrop",
	component: Backdrop,
} as ComponentMeta<typeof Backdrop>;

const Template: ComponentStory<typeof Backdrop> = (args) => {
	const [open, setOpen] = useState<boolean>(false);
	const onClickOpen = () => setOpen(true);
	const onClose = () => setOpen(false);
	return (
		<div>
			<Paper>
				<p className="max-w-xs">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum rem vero necessitatibus voluptatibus vel
					veritatis illo aperiam enim, reiciendis corporis quam id nemo veniam mollitia culpa quas, atque, provident
					illum.
				</p>
				<div className="flex items-center justify-center m-2">
					<Button onClick={onClickOpen}>Show backdrop</Button>
				</div>
				<Backdrop {...args} open={open} className="bg-backdrop flex items-center justify-center">
					<div>
						<p>Empty backdrop with only text and button</p>
						<Button className="mx-auto my-2" onClick={onClose}>
							Hide backdrop
						</Button>
					</div>
				</Backdrop>
			</Paper>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};
Default.storyName = "Backdrop";
