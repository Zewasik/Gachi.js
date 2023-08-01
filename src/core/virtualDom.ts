import { createDom, updateRealDom } from "./dom"
import hooksInst from "./hooks"

export function workLoop(element: GachiElement) {
	let domParentFiber: GachiElement | null = element
	while (!domParentFiber.dom) {
		domParentFiber = domParentFiber.parent!
	}

	const temp = domParentFiber

	while (domParentFiber) {
		domParentFiber = setUpFiberTree(domParentFiber)
	}
	if (temp) {
		updateRealDom(temp)
	}
}

function setUpFiberTree(pointElement: GachiElement): GachiElement | null {
	if (pointElement.type instanceof Function) {
		hooksInst.currentComponent = pointElement
		let children = pointElement.type(pointElement.props)
		hooksInst.currentComponent = null

		children = Array.isArray(children) ? children : [children]
		parseChildren(pointElement, children)
	} else {
		if (!pointElement.dom) {
			createDom(pointElement)
		}
		parseChildren(pointElement, pointElement.props.children)
	}

	if (pointElement.child) {
		return pointElement.child
	}

	let nextFiber: GachiElement | undefined = pointElement
	while (nextFiber) {
		if (nextFiber.sibling) {
			return nextFiber.sibling
		}
		nextFiber = nextFiber.parent
	}

	return null
}

function parseChildren(element: GachiElement, children: GachiElement[]) {
	let prevSibling: GachiElement | null = null
	for (const [i, child] of children.entries()) {
		if (i === 0) {
			element.child = child
		} else if (prevSibling) {
			prevSibling.sibling = child
		}
		child.parent = element
		prevSibling = child
	}
}

export function render(element: GachiElement, container: HTMLElement) {
	const root: GachiElement = {
		type: "ROOT",
		props: {
			children: [element],
		},
		dom: container,
	}

	workLoop(root)
}
