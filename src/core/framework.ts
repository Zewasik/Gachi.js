import { isEvent, isProps } from "../utils/filters"

interface GachiElement {
	type: string | Function
	props?: ElementProps
	hooks?: any[]
}

interface BaseProps {
	style?: string
	className?: string
	nodeValue?: string
}

interface ElementProps extends BaseProps {
	children?: Array<GachiElement | string>
}

let currentHook = 0
let currentComponent: GachiElement | null = null
let currentRoot: { root: HTMLElement | Text; element: GachiElement } | null =
	null

function useState<T>(initialState: T): [T, (newState: T) => void] {
	const hookIndex = currentHook
	if (currentComponent === null) {
		return [initialState, (newState: T) => {}]
	}

	let hooks = currentComponent["hooks"] ? currentComponent.hooks : []

	currentComponent["hooks"] =
		currentComponent["hooks"] === undefined ? [] : currentComponent["hooks"]

	initialState =
		currentComponent && currentComponent.hooks[hookIndex]
			? currentComponent!.hooks[hookIndex]
			: initialState

	console.log(currentComponent, initialState, hookIndex)

	if (hooks[hookIndex] === undefined) {
		hooks.push(initialState)
	}

	const setState = (newState: T) => {
		console.log(newState)
		hooks[hookIndex] = newState
		if (currentRoot !== null) {
			render(currentRoot.element, currentRoot.root)
		}
	}

	currentComponent.hooks = hooks
	currentHook++

	return [currentComponent.hooks[hookIndex], setState]
}

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
		hooks: [],
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

function renderElement(element: GachiElement, container: HTMLElement | Text) {
	if (typeof element.type === "function") {
		currentComponent = element
		currentHook = 0

		element = element.type(element.props)
	}

	const currentDomElement = createDom(element)
	if (currentDomElement === undefined) {
		return
	}
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
	currentRoot = { element, root: container }

	if (container.childNodes.length > 0) {
		container.childNodes.forEach((child) => {
			container.removeChild(child)
		})
	}

	renderElement(element, container)
}

function createDom(element: GachiElement) {
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

	return dom
}

export default {
	createElement,
	createTextElement,
	render,
	useState,
}
