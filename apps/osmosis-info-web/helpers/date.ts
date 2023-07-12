export const getWeekNumber = (date: Date) => {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
	const dayNum = d.getUTCDay() || 7;
	d.setUTCDate(d.getUTCDate() + 4 - dayNum);
	const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
	return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
};

export const timeToDateUTC = (time: string | number): Date => {
	if (typeof time === "number") {
		const date = new Date(time);
		const utcDate = new Date(
			Date.UTC(
				date.getUTCFullYear(),
				date.getUTCMonth(),
				date.getUTCDate(),
				date.getUTCHours(),
				date.getUTCMinutes(),
				date.getUTCSeconds(),
				date.getUTCMilliseconds()
			)
		);
		return utcDate;
	}
	const split = time.split("-");
	return new Date(Date.UTC(parseInt(split[0]), parseInt(split[1]) - 1, parseInt(split[2])));
};
