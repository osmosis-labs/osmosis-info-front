import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Popover, PopoverPosisitonX, PopoverPosisitonY } from "./popover";
import { Button } from "../buttons/button/button";

export default {
	title: "Components/Surfaces/Popover",
	component: Popover,
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = () => {
	const [anchorElPopover, setAnchorElPopover] = useState<null | HTMLElement>(null);

	const onClickOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopover(event.currentTarget);
	};
	const onClose = () => setAnchorElPopover(null);

	const openPopover = Boolean(anchorElPopover);

	return (
		<div>
			<div className="flex items-center justify-items-center my-2">
				<Button className="mx-auto" onClick={onClickOpen}>
					Open Popover
				</Button>
				<Popover onClose={onClose} open={openPopover} anchorElement={anchorElPopover}>
					<p>Pop over</p>
				</Popover>
			</div>
		</div>
	);
};
Template.args = {};

export const Default = Template.bind({});
Default.args = { children: <p>Popover custom</p> };
Default.storyName = "Popover";

const TemplateCustom: ComponentStory<typeof Popover> = (args) => {
	const [anchorElPopoverCustom, setAnchorElPopoverCustom] = useState<null | HTMLElement>(null);
	const [anchorPositionX, setAnchorPositionX] = useState<PopoverPosisitonX>("center");
	const [anchorPositionY, setAnchorPositionY] = useState<PopoverPosisitonY>("center");
	const [popoverPositionX, setPopoverPositionX] = useState<PopoverPosisitonX>("center");
	const [popoverPositionY, setPopoverPositionY] = useState<PopoverPosisitonY>("center");

	const onClickOpenCustom = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElPopoverCustom(event.currentTarget);
	};
	const onCloseCustom = () => setAnchorElPopoverCustom(null);
	const openPopoverCustom = Boolean(anchorElPopoverCustom);

	const onChangeRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		if (name === "anchorPositionLeft") setAnchorPositionX(value as PopoverPosisitonX);
		else if (name === "anchorPositionRight") setAnchorPositionX(value as PopoverPosisitonX);
		else if (name === "anchorPositionCenter") setAnchorPositionX(value as PopoverPosisitonX);
		else if (name === "anchorPositionTop") setAnchorPositionY(value as PopoverPosisitonY);
		else if (name === "anchorPositionBottom") setAnchorPositionY(value as PopoverPosisitonY);
		else if (name === "anchorPositionCenterY") setAnchorPositionY(value as PopoverPosisitonY);
		else if (name === "popoverPositionLeft") setPopoverPositionX(value as PopoverPosisitonX);
		else if (name === "popoverPositionRight") setPopoverPositionX(value as PopoverPosisitonX);
		else if (name === "popoverPositionCenter") setPopoverPositionX(value as PopoverPosisitonX);
		else if (name === "popoverPositionTop") setPopoverPositionY(value as PopoverPosisitonY);
		else if (name === "popoverPositionBottom") setPopoverPositionY(value as PopoverPosisitonY);
		else if (name === "popoverPositionCenterY") setPopoverPositionY(value as PopoverPosisitonY);
	};
	const classNameInput = "grid grid-cols-2 p-1";
	return (
		<div>
			<div className="flex items-center justify-center py-4 m-5 ">
				<Button className="mx-auto" onClick={onClickOpenCustom}>
					Open custom popover
				</Button>
				<Popover
					anchorPosition={{ x: anchorPositionX, y: anchorPositionY }}
					popoverPosition={{ x: popoverPositionX, y: popoverPositionY }}
					onClose={onCloseCustom}
					open={openPopoverCustom}
					anchorElement={anchorElPopoverCustom}
				>
					{args.children}
				</Popover>
			</div>
			<div className="grid grid-cols-4 items-center justify-items-center mt-5 ">
				<div className="flex flex-col">
					<p>Anchor Horizontal Position</p>
					<div className={classNameInput}>
						<input
							type="radio"
							id="anchorPositionLeft"
							name="anchorPositionLeft"
							value={"left"}
							checked={anchorPositionX === "left"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="anchorPositionLeft">Left</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="anchorPositionCenter"
							name="anchorPositionCenter"
							value={"center"}
							checked={anchorPositionX === "center"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="anchorPositionCenter">Center</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="anchorPositionRight"
							name="anchorPositionRight"
							value={"right"}
							checked={anchorPositionX === "right"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="anchorPositionRight">Right</label>
					</div>
				</div>
				<div className="flex flex-col">
					<p>Anchor Vertical Position</p>
					<div className={classNameInput}>
						<input
							type="radio"
							id="anchorPositionTop"
							name="anchorPositionTop"
							value={"top"}
							checked={anchorPositionY === "top"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="anchorPositionTop">Top</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="YY"
							name="anchorPositionCenterY"
							value={"center"}
							checked={anchorPositionY === "center"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="anchorPositionCenterY">Center</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="anchorPositionBottom"
							name="anchorPositionBottom"
							value={"bottom"}
							checked={anchorPositionY === "bottom"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="anchorPositionBottom">Bottom</label>
					</div>
				</div>
				<div className="flex flex-col">
					<p>Popover Horizontal Position</p>
					<div className={classNameInput}>
						<input
							type="radio"
							id="popoverPositionLeft"
							name="popoverPositionLeft"
							value={"left"}
							checked={popoverPositionX === "left"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="popoverPositionLeft">Left</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="popoverPositionCenter"
							name="popoverPositionCenter"
							value={"center"}
							checked={popoverPositionX === "center"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="popoverPositionCenter">Center</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="popoverPositionRight"
							name="popoverPositionRight"
							value={"right"}
							checked={popoverPositionX === "right"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="popoverPositionRight">Right</label>
					</div>
				</div>
				<div className="flex flex-col">
					<p>Popover Vertical Position</p>
					<div className={classNameInput}>
						<input
							type="radio"
							id="popoverPositionTop"
							name="popoverPositionTop"
							value={"top"}
							checked={popoverPositionY === "top"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="popoverPositionTop">Top</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="popoverPositionCenterY"
							name="popoverPositionCenterY"
							value={"center"}
							checked={popoverPositionY === "center"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="popoverPositionCenterY">Center</label>
					</div>
					<div className={classNameInput}>
						<input
							type="radio"
							id="popoverPositionBottom"
							name="popoverPositionBottom"
							value={"bottom"}
							checked={popoverPositionY === "bottom"}
							onChange={onChangeRadio}
						/>
						<label htmlFor="popoverPositionBottom">Bottom</label>
					</div>
				</div>
			</div>
		</div>
	);
};
TemplateCustom.args = {};

export const Custom = TemplateCustom.bind({});
Custom.args = { children: <p>Popover custom</p> };
Custom.storyName = "Popover with custom position";
