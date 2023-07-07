export const getInclude = (list: any[], condition: (a: any) => boolean) => {
	let i = 0;
	while (i < list.length) {
		if (condition(list[i])) return i;
		i++;
	}
	return -1;
};
