import hooksInst from "./hooks"

function createElement(
	type: string,
	props: BaseProps,
	...children: Array<GachiElement | string>
): GachiElement {
	children = children.flat().filter((child) => child !== null)
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

function Fragment(props: ElementProps) {
	return props.children
}

export const useState = hooksInst.useState.bind(hooksInst)
export const useContext = hooksInst.useContext.bind(hooksInst)
export const useNavigate = hooksInst.useNavigate.bind(hooksInst)
export const useEffect = hooksInst.useEffect.bind(hooksInst)

export default {
	createElement,
	createTextElement,
	render: hooksInst.render.bind(hooksInst),
	Fragment,
	createContext: hooksInst.createContext.bind(hooksInst),
}
