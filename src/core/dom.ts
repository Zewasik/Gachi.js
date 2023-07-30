import { isEvent, isProps } from "../utils/filters"

export function createDom(element: GachiElement) {
	if (typeof element.type !== "string") {
		return
	}

	const dom =
		element.type === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(element.type)

	const temp = Object.entries(element.props || {}).filter(([key]) =>
		isProps(key)
	)

	temp.filter(([key, value]) => isEvent(key, value)).forEach(
		([key, value]) => {
			dom.addEventListener(key.substring(2).toLowerCase(), value)
		}
	)

	temp.forEach(([key, value]) => {
		dom[key] = value
	})

	element.dom = dom
}
