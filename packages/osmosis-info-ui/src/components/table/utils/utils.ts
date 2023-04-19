export const findInArray = (array: any[], key: string, field = "key") => {
	return array.find((item: any) => item[field] === key);
};
