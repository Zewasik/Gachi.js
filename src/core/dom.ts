import { isEvent, isProps } from "../utils/filters"

export function updateRealDom(rootElement: GachiElement) {
	;(rootElement.dom as HTMLElement).innerHTML = ""
	updateNode(rootElement.child)
}

function updateNode(element: GachiElement | undefined) {
	if (!element || !element.parent) return

	let domParentFiber: GachiElement = element.parent
	while (!domParentFiber.dom) {
		domParentFiber = domParentFiber.parent!
	}
	const parentDom = domParentFiber.dom

	if (element.dom) {
		parentDom.appendChild(element.dom)
	}

	updateNode(element.child)
	updateNode(element.sibling)
}

export function createDom(element: GachiElement) {
	if (typeof element.type !== "string") {
		return
	}

	const dom =
		element.type === "TEXT_ELEMENT"
			? document.createTextNode("")
			: document.createElement(element.type)

	updateDomNode(dom, element.props)

	element.dom = dom
}

function updateDomNode(dom: HTMLElement | Text, props: ElementProps) {
	const temp = Object.entries(props || {}).filter(([key]) => isProps(key))

	temp.filter(([key, value]) => isEvent(key, value)).forEach(
		([key, value]) => {
			dom.addEventListener(key.substring(2).toLowerCase(), value)
		}
	)

	temp.forEach(([key, value]) => {
		dom[key] = value
	})
}
