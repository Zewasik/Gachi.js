export function isEvent(key: string, value: any): boolean {
	return key.substring(0, 2) === "on" && value instanceof Object
}

export function isProps(key: string): boolean {
	return key !== "children"
}
