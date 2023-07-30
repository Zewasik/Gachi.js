import { createDom } from "./dom"
import Globals from "./global"
import { useState } from "./hooks"

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

function updateRealDom(rootElement: GachiElement) {
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

export function Fragment(props: ElementProps) {
	return props.children
}

function render(element: GachiElement, container: HTMLElement) {
	const root: GachiElement = {
		type: "ROOT",
		props: {
			children: [element],
		},
		dom: container,
	}

	workLoop(root)
}

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
		Globals.currentComponent = pointElement
		Globals.currentHook = 0

		let children = pointElement.type(pointElement.props)
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

export default {
	createElement,
	createTextElement,
	render,
	Fragment,
	useState,
}
