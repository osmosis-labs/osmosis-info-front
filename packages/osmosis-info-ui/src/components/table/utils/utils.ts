export function findInArray<T>(array: T[], key: string, field = "key") {
	return array.find((item: any) => item[field] === key);
}
