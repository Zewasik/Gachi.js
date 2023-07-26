interface BaseProps {
	style?: string
	className?: string
	nodeValue?: string
}

interface GachiElement {
	type: string
	props?: ElementProps
}

interface ElementProps extends BaseProps {
	children?: Array<GachiElement | string>
}

// interface Node extends GachiElement {
// 	children?: Array<GachiElement>
// 	parent?: GachiElement
// }

function createElement(
	type: string,
	props: BaseProps,
	...children: Array<GachiElement | string>
): GachiElement {
	return {
		type,
		props: {
			...props,
			children: children.map((child) =>
				typeof child === "object" ? child : createTextElement(child)
			),
		},
	}
}

function createTextElement(text: string): GachiElement {
	return {
		type: "TEXT_ELEMENT",
		props: {
			nodeValue: text,
			children: [],
		},
	}
}

function renderElement(element: GachiElement, container: HTMLElement | Text) {
	const currentDomElement = createDom(element)
	if (!element.props || !element.props.children) {
		return
	}

	for (const child of element.props.children) {
		if (typeof child === "string") {
			continue
		}

		renderElement(child, currentDomElement)
	}

	container.appendChild(currentDomElement)
}

function render(element: GachiElement, container: HTMLElement | Text) {
	if (container.childNodes.length > 0) {
		container.childNodes.forEach((child) => {
			container.removeChild(child)
		})
	}

	renderElement(element, container)
}

function createDom(element: GachiElement) {
	const dom =
		element.type === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(element.type)

	Object.keys(element.props || {})
		.filter((key) => key !== "children")
		.forEach((key) => {
			if (!element.props) {
				return
			}
			dom[key] = element.props[key]
		})

	return dom
}

export default {
	createElement,
	createTextElement,
	render,
}
