import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Dialog } from "./dialog";
import { Paper } from "../paper/paper";
import { Button } from "../buttons/button/button";

export default {
	title: "Components/Surfaces/Dialog",
	component: Dialog,
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = () => {
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
					<Button onClick={onClickOpen}>Open Dialog</Button>
				</div>
				<Dialog onClose={onClose} open={open} closeOnClickAway={true}>
					<div>
						<p>Empty backdrop with only text and button</p>
						<Button className="mx-auto mt-2" size="small" onClick={onClose}>
							Close Dialog
						</Button>
					</div>
				</Dialog>
			</Paper>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = {};

Default.storyName = "Dialog";
