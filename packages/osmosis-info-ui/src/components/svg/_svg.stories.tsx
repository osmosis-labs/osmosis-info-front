import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SettingsSvg, DashboardSvg, MenuSvg, TokensSvg, LeftSvg, OsmosisSvg, OverviewSvg, PoolSvg } from "./";

export default {
	title: "Assets/Icons",
	subcomponents: {
		DashboardSvg,
		MenuSvg,
		TokensSvg,
		LeftSvg,
		OsmosisSvg,
		OverviewSvg,
		PoolSvg,
		SettingsSvg,
	},
} as ComponentMeta<typeof DashboardSvg>;

const argsFill = {
	fill: "#736CA3",
	height: 60,
	width: 60,
};
const argsTypeFill = {
	fill: {
		control: { type: "color", presetColors: ["#736CA3", "green"] },
	},
};

const argsStroke = {
	stroke: "#736CA3",
	height: 60,
	width: 60,
};
const argsTypeStroke = {
	stroke: {
		control: { type: "color", presetColors: ["#736CA3", "green"] },
	},
};

export const Osmosis: ComponentStory<typeof OsmosisSvg> = (args) => <OsmosisSvg {...args} />;
Osmosis.args = {
	height: 60,
	width: 60,
};

export const Dashboard: ComponentStory<typeof DashboardSvg> = (args) => <DashboardSvg {...args} />;
Dashboard.args = argsFill;
Dashboard.argTypes = argsTypeFill;

export const Left: ComponentStory<typeof LeftSvg> = (args) => <LeftSvg {...args} />;
Left.args = argsStroke;
Left.argTypes = argsTypeStroke;

export const Menu: ComponentStory<typeof MenuSvg> = (args) => <MenuSvg {...args} />;
Menu.args = argsFill;
Menu.argTypes = argsTypeFill;

export const Overview: ComponentStory<typeof OverviewSvg> = (args) => <OverviewSvg {...args} />;
Overview.args = argsFill;
Overview.argTypes = argsTypeFill;

export const Pools: ComponentStory<typeof PoolSvg> = (args) => <PoolSvg {...args} />;
Pools.args = argsFill;
Pools.argTypes = argsTypeFill;

export const Tokens: ComponentStory<typeof TokensSvg> = (args) => <TokensSvg {...args} />;
Tokens.args = argsFill;
Tokens.argTypes = argsTypeFill;

export const Settings: ComponentStory<typeof SettingsSvg> = (args) => <SettingsSvg {...args} />;
Settings.args = argsFill;
Settings.argTypes = argsTypeFill;
